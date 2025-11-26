import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate confirmation number
    const confirmationNumber = `TI-${Date.now().toString(36).toUpperCase()}-${uuidv4().substring(0, 6).toUpperCase()}`;
    
    // In a real implementation, this would:
    // 1. Validate all fields
    // 2. Save to database
    // 3. Send confirmation email to customer
    // 4. Send notification email to admin
    
    // For now, we'll simulate the process
    const tradeInRequest = {
      id: uuidv4(),
      confirmationNumber,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      
      // Device info
      deviceType: body.deviceType,
      brand: body.brand,
      model: body.model,
      condition: body.condition,
      age: body.age,
      accessories: body.accessories,
      tradeInValue: body.tradeInValue,
      
      // New device
      selectedDevice: body.selectedDevice,
      finalPrice: body.finalPrice,
      
      // Contact info
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      postalCode: body.postalCode,
      city: body.city,
      paymentMethod: body.paymentMethod,
    };

    // Log for demonstration (without sensitive data)
    console.log("Trade-in request received:", {
      confirmationNumber,
      deviceType: body.deviceType,
      brand: body.brand,
      createdAt: tradeInRequest.createdAt,
    });

    return NextResponse.json({
      success: true,
      message: "Innbytteforespørsel mottatt",
      data: {
        confirmationNumber,
        estimatedValue: body.tradeInValue,
        newDevice: body.selectedDevice?.name,
        finalPrice: body.finalPrice,
      },
    });
  } catch (error) {
    console.error("Error processing trade-in request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "En feil oppstod under behandling av forespørselen",
      },
      { status: 500 }
    );
  }
}
