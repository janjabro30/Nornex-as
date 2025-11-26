import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  budget?: string;
  gdprConsent?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, company, service, message, budget, gdprConsent } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate GDPR consent
    if (!gdprConsent) {
      return NextResponse.json(
        { error: "GDPR consent is required" },
        { status: 400 }
      );
    }

    // In production, this would:
    // 1. Save to database
    // await prisma.contactSubmission.create({
    //   data: {
    //     name,
    //     email,
    //     phone,
    //     company,
    //     service,
    //     message,
    //     gdprConsentAt: new Date(),
    //     submittedAt: new Date(),
    //   },
    // });
    
    // 2. Send email notification
    // await sendEmail({
    //   to: "post@nornex.no",
    //   subject: `New contact form submission from ${name}`,
    //   body: `...`,
    // });

    // For now, just log and return success
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      company,
      service,
      message,
      budget,
      gdprConsent,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for your message. We will contact you within 24 hours." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
