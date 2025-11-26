import { NextResponse } from 'next/server';

// In-memory storage for demo (in production, use database)
const subscribers: { email: string; name?: string; subscribedAt: string; isActive: boolean }[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, gdprAccepted } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'E-postadresse er påkrevd' },
        { status: 400 }
      );
    }
    
    if (!gdprAccepted) {
      return NextResponse.json(
        { error: 'Du må godta personvernvilkårene' },
        { status: 400 }
      );
    }
    
    // Check if already subscribed
    const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { error: 'Denne e-postadressen er allerede registrert' },
          { status: 400 }
        );
      }
      // Reactivate
      existing.isActive = true;
      return NextResponse.json({
        message: 'Velkommen tilbake! Du er nå abonnert på nyhetsbrevet.',
      });
    }
    
    // Add new subscriber
    subscribers.push({
      email,
      name,
      subscribedAt: new Date().toISOString(),
      isActive: true,
    });
    
    return NextResponse.json({
      message: 'Takk for at du abonnerer! Du vil motta en bekreftelse på e-post.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Noe gikk galt. Vennligst prøv igjen.' },
      { status: 500 }
    );
  }
}
