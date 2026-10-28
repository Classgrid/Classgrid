import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { DemoRequest } from "@/lib/models/DemoRequest";
import { cookies } from "next/headers";

// GET lead details for the verification cover page
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Security: Validate the browser session cookie
    const cookieStore = await cookies();
    const session = cookieStore.get("demo_session");

    if (!session || session.value !== id) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    await connectMongo();
    const lead = await DemoRequest.findById(id);

    if (!lead) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error("[request-demo-GET] Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// The demo form now submits to the platform server, so the browser session
// cookie for the success page is set here right after a fresh request is created.
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!/^[a-f\d]{24}$/i.test(id)) {
      return NextResponse.json({ ok: false, message: "Invalid request id." }, { status: 400 });
    }

    await connectMongo();
    const lead = await DemoRequest.findById(id);
    const createdAt = lead?.createdAt ? new Date(lead.createdAt).getTime() : 0;
    const isFresh = createdAt > 0 && Date.now() - createdAt < 15 * 60 * 1000;

    if (!lead || !isFresh || lead.isEmailVerified) {
      return NextResponse.json({ ok: false, message: "Lead not found" }, { status: 404 });
    }

    const cookieStore = await cookies();
    cookieStore.set("demo_session", lead._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[request-demo-POST] Error:", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
