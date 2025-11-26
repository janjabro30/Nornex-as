import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // In production, this would save to database:
    // await prisma.newsletterSubscriber.create({
    //   data: {
    //     email,
    //     subscribedAt: new Date(),
    //     isActive: true,
    //   },
    // });

    // For now, just log and return success
    console.log("Newsletter subscription:", email);

    return NextResponse.json(
      { 
        success: true, 
        message: "Successfully subscribed to newsletter" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
