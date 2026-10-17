import InquiryEmail from "@/components/emails/InquiryEmail";
import { resend } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      ownerEmail,
      ownerName,
      propertyTitle,
      propertyPrice,
      senderEmail,
      senderName,
      message,
      senderPhone,
    } = body;
    console.log("Request body:", body);
    if (
      !ownerEmail ||
      !propertyTitle ||
      !senderEmail ||
      !senderName ||
      !message ||
      !senderPhone
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }
    const fromAddress =
      process.env.EMAIL_FROM_ADDRESS || "onboarding@resend.dev";
    const data = await resend.emails.send({
      from: fromAddress,
      to: [ownerEmail],
      subject: `New Inquiry for ${propertyTitle}`,
      react: InquiryEmail({
        senderEmail,
        senderName,
        senderPhone,
        ownerName,
        message,
        propertyTitle,
        propertyPrice,
      }),
    });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("POST /api/send-email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
