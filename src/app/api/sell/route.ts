import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate confirmation number
    const confirmationNumber = `SELL-${Date.now().toString(36).toUpperCase()}-${uuidv4().substring(0, 6).toUpperCase()}`;
    
    // Calculate total device count
    const totalDevices = body.devices?.reduce(
      (sum: number, device: { quantity: number }) => sum + (device.quantity || 1),
      0
    ) || 0;

    // In a real implementation, this would:
    // 1. Validate all fields
    // 2. Save to database
    // 3. Send confirmation email to customer
    // 4. Send notification email to sales department
    
    const sellRequest = {
      id: uuidv4(),
      confirmationNumber,
      status: "PENDING_EVALUATION",
      createdAt: new Date().toISOString(),
      
      // Devices
      devices: body.devices,
      totalDevices,
      
      // Contact info
      name: body.name,
      email: body.email,
      phone: body.phone,
      companyName: body.companyName,
      
      // Address
      address: body.address,
      postalCode: body.postalCode,
      city: body.city,
    };

    // Log for demonstration (without sensitive data)
    console.log("Sell request received:", {
      confirmationNumber,
      totalDevices,
      createdAt: sellRequest.createdAt,
    });

    return NextResponse.json({
      success: true,
      message: "Salgsforespørsel mottatt",
      data: {
        confirmationNumber,
        totalDevices,
        status: "Venter på evaluering",
      },
    });
  } catch (error) {
    console.error("Error processing sell request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "En feil oppstod under behandling av forespørselen",
      },
      { status: 500 }
    );
  }
}
