import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate confirmation number
    const confirmationNumber = `REP-${Date.now().toString(36).toUpperCase()}-${uuidv4().substring(0, 6).toUpperCase()}`;
    
    // In a real implementation, this would:
    // 1. Validate all fields
    // 2. Save to database
    // 3. Send confirmation email to customer
    // 4. Send notification email to repair department
    
    const repairRequest = {
      id: uuidv4(),
      confirmationNumber,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      
      // Device info
      deviceType: body.deviceType,
      brand: body.brand,
      model: body.model,
      serialNumber: body.serialNumber,
      quantity: body.quantity || 1,
      
      // Problem info
      problemDescription: body.problemDescription,
      repairType: body.repairType,
      urgency: body.urgency,
      
      // Contact info
      customerType: body.customerType,
      name: body.name,
      email: body.email,
      phone: body.phone,
      companyName: body.companyName,
      orgNumber: body.orgNumber,
      
      // Delivery info
      deliveryMethod: body.deliveryMethod,
      address: body.address,
      postalCode: body.postalCode,
      city: body.city,
    };

    // Log for demonstration (without sensitive data)
    console.log("Repair request received:", {
      confirmationNumber,
      deviceType: body.deviceType,
      brand: body.brand,
      urgency: body.urgency,
      createdAt: repairRequest.createdAt,
    });

    return NextResponse.json({
      success: true,
      message: "Reparasjonsforespørsel mottatt",
      data: {
        confirmationNumber,
        estimatedTime: body.urgency === "express" ? "1-2 virkedager" : "3-5 virkedager",
      },
    });
  } catch (error) {
    console.error("Error processing repair request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "En feil oppstod under behandling av forespørselen",
      },
      { status: 500 }
    );
  }
}
