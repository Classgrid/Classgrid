import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { DemoRequest } from "@/lib/models/DemoRequest";
import { cookies } from "next/headers";

const MAX_CODE_TRIES = 5;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { otp } = await req.json();
    const { id } = await params;

    // Security: Validate browser session cookie
    const cookieStore = await cookies();
    const session = cookieStore.get("demo_session");
    if (!session || session.value !== id) {
      return NextResponse.json({ ok: false, message: "Unauthorized or expired session." }, { status: 401 });
    }

    await connectMongo();
    const lead = await DemoRequest.findById(id);
    if (!lead) {
      return NextResponse.json({ ok: false, message: "Lead not found" }, { status: 404 });
    }

    if (lead.isEmailVerified) {
      return NextResponse.json({ ok: true, message: "Already verified." });
    }

    if (!lead.otp || !lead.otpExpiresAt || new Date() > lead.otpExpiresAt) {
      return NextResponse.json({ ok: false, message: "Verification code expired. Please resend." }, { status: 400 });
    }

    // Five tries per code. Each try is counted in one database step, so tries sent at the same moment are all counted.
    const counted = await DemoRequest.findOneAndUpdate(
      { _id: lead._id, otp: lead.otp, otpAttempts: { $not: { $gte: MAX_CODE_TRIES } } },
      { $inc: { otpAttempts: 1 } },
      { returnDocument: "after" }
    );
    if (!counted) {
      return NextResponse.json(
        { ok: false, message: "Too many wrong tries. Please ask for a new code." },
        { status: 429 }
      );
    }

    if (counted.otp !== otp) {
      return NextResponse.json({ ok: false, message: "Invalid verification code." }, { status: 400 });
    }

    // Mark as verified using updateOne to bypass full document validation
    await DemoRequest.updateOne(
      { _id: lead._id },
      {
        $set: { isEmailVerified: true },
        $unset: { otp: 1, otpExpiresAt: 1, otpAttempts: 1 }
      }
    );

    return NextResponse.json({ ok: true, message: "Email verified successfully!" });
  } catch (error) {
    console.error("[verify-otp] Error:", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
