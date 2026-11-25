import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { DemoRequest } from "@/lib/models/DemoRequest";
import { cookies } from "next/headers";
import { CODE_RESEND_WAIT_SECONDS, CODE_VALID_MS } from "@/lib/code-expiry";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    // Security: Validate browser session cookie
    const cookieStore = await cookies();
    const session = cookieStore.get("demo_session");
    if (!session || session.value !== id) {
      return NextResponse.json({ ok: false, message: "Unauthorized or expired session." }, { status: 401 });
    }

    await connectMongo();

    // The code works for 10 minutes. A new one can be asked for once 60 seconds have passed since the last
    // one was sent (checked in the same database step, so two requests at once cannot both send a code).
    const now = Date.now();
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const lastSentBefore = new Date(now - CODE_RESEND_WAIT_SECONDS * 1000);

    const updatedLead = await DemoRequest.findOneAndUpdate(
      {
        _id: id,
        $or: [
          { otpSentAt: { $exists: false } },
          { otpSentAt: null },
          { otpSentAt: { $lt: lastSentBefore } }
        ]
      },
      {
        $set: {
          institutionName: body.institutionName,
          orgType: body.orgType,
          adminName: body.adminName,
          adminEmail: body.adminEmail,
          adminPhone: body.adminPhone,
          otp: newOtp,
          otpExpiresAt: new Date(now + CODE_VALID_MS),
          otpSentAt: new Date(now),
          otpAttempts: 0
        }
      },
      { returnDocument: "after" } // Return the updated document
    );

    if (!updatedLead) {
      // If it returned null, it means either the lead doesn't exist OR the rate limit blocked it
      const existingLead = await DemoRequest.findById(id);
      if (!existingLead) {
        return NextResponse.json({ message: "Lead not found" }, { status: 404 });
      }
      return NextResponse.json(
        { ok: false, message: `Please wait ${CODE_RESEND_WAIT_SECONDS} seconds before requesting a new code.` },
        { status: 429 }
      );
    }

    const lead = updatedLead;

    // Send new OTP via SES using existing Classgrid SMTP Mailer
    if (process.env.AWS_SES_SMTP_HOST) {
      try {
        const { getSmtpTransporter, getNoReplyAddress, getSupportEmail } = await import("@/lib/smtp-mailer");
        const { getDemoOtpEmailHtml } = await import("@/lib/email-templates");
        const transporter = getSmtpTransporter();

        await transporter.sendMail({
          from: getNoReplyAddress(),
          replyTo: getSupportEmail(),
          to: lead.adminEmail,
          subject: "Your New Classgrid Demo Verification Code",
          html: getDemoOtpEmailHtml(lead.adminName, newOtp),
        });
        console.log(`[resend-otp] Sent OTP ${newOtp} to ${lead.adminEmail}`);
      } catch (err) {
        console.error("[resend-otp] Email error:", err);
      }
    }

    return NextResponse.json({ ok: true, message: "Details updated and OTP resent." });
  } catch (error) {
    console.error("[update-and-resend] Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
