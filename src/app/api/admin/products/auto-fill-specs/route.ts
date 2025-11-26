import { NextRequest, NextResponse } from "next/server";

// Product specification knowledge base for AI auto-fill
const productDatabase: Record<string, Record<string, unknown>> = {
  // Dell Laptops
  "dell xps 15": {
    processor: "Intel Core i7-12700H",
    processorType: "intel-i7",
    ram: "16GB DDR5",
    ramSize: "16",
    storage: "512GB NVMe SSD",
    storageSize: "512",
    screenSize: "15-16",
    screenResolution: "fhd",
    graphics: "Intel Iris Xe",
    graphicsType: "integrated",
    os: "Windows 11 Home",
    osType: "windows-11",
    weight: "1.86 kg",
    batteryLife: "13 hours",
    releaseYear: 2022,
    ports: "Thunderbolt 4, USB-C, SD card",
    dimensions: "344.4 x 230.1 x 18 mm",
  },
  "dell latitude": {
    processor: "Intel Core i5-1345U",
    processorType: "intel-i5",
    ram: "16GB DDR4",
    ramSize: "16",
    storage: "256GB NVMe SSD",
    storageSize: "256",
    screenSize: "13-14",
    screenResolution: "fhd",
    graphics: "Intel Iris Xe",
    graphicsType: "integrated",
    os: "Windows 11 Pro",
    osType: "windows-11",
    weight: "1.35 kg",
    batteryLife: "10 hours",
    releaseYear: 2023,
    ports: "USB-A, USB-C, HDMI, SD card",
    dimensions: "321.4 x 212.8 x 17.27 mm",
  },
  // HP Laptops
  "hp elitebook": {
    processor: "Intel Core i7-1365U",
    processorType: "intel-i7",
    ram: "32GB DDR5",
    ramSize: "32",
    storage: "512GB NVMe SSD",
    storageSize: "512",
    screenSize: "13-14",
    screenResolution: "fhd",
    graphics: "Intel Iris Xe",
    graphicsType: "integrated",
    os: "Windows 11 Pro",
    osType: "windows-11",
    weight: "1.34 kg",
    batteryLife: "12 hours",
    releaseYear: 2023,
    ports: "Thunderbolt 4, USB-A, HDMI",
    dimensions: "315.6 x 224.3 x 19.2 mm",
  },
  "hp probook": {
    processor: "Intel Core i5-1235U",
    processorType: "intel-i5",
    ram: "16GB DDR4",
    ramSize: "16",
    storage: "256GB NVMe SSD",
    storageSize: "256",
    screenSize: "15-16",
    screenResolution: "fhd",
    graphics: "Intel UHD Graphics",
    graphicsType: "integrated",
    os: "Windows 11 Pro",
    osType: "windows-11",
    weight: "1.74 kg",
    batteryLife: "8 hours",
    releaseYear: 2023,
    ports: "USB-A, USB-C, HDMI, RJ-45",
    dimensions: "359.4 x 233.9 x 19.9 mm",
  },
  // Lenovo ThinkPad
  "lenovo thinkpad": {
    processor: "Intel Core i5-1345U",
    processorType: "intel-i5",
    ram: "16GB DDR4",
    ramSize: "16",
    storage: "256GB NVMe SSD",
    storageSize: "256",
    screenSize: "13-14",
    screenResolution: "fhd",
    graphics: "Intel Iris Xe",
    graphicsType: "integrated",
    os: "Windows 11 Pro",
    osType: "windows-11",
    weight: "1.21 kg",
    batteryLife: "15 hours",
    releaseYear: 2023,
    ports: "Thunderbolt 4, USB-A, HDMI",
    dimensions: "317.7 x 226.9 x 17.9 mm",
  },
  // Apple MacBook
  "macbook pro": {
    processor: "Apple M3 Pro",
    processorType: "apple-m3",
    ram: "18GB Unified Memory",
    ramSize: "16",
    storage: "512GB SSD",
    storageSize: "512",
    screenSize: "13-14",
    screenResolution: "4k",
    graphics: "Apple GPU 12-core",
    graphicsType: "apple-gpu",
    os: "macOS Sonoma",
    osType: "macos",
    weight: "1.55 kg",
    batteryLife: "22 hours",
    releaseYear: 2023,
    ports: "Thunderbolt 4, HDMI, MagSafe, SD card",
    dimensions: "312.6 x 221.2 x 15.5 mm",
  },
  "macbook air": {
    processor: "Apple M2",
    processorType: "apple-m2",
    ram: "8GB Unified Memory",
    ramSize: "8",
    storage: "256GB SSD",
    storageSize: "256",
    screenSize: "13-14",
    screenResolution: "2k",
    graphics: "Apple GPU 8-core",
    graphicsType: "apple-gpu",
    os: "macOS Sonoma",
    osType: "macos",
    weight: "1.24 kg",
    batteryLife: "18 hours",
    releaseYear: 2022,
    ports: "MagSafe, Thunderbolt/USB 4",
    dimensions: "304.1 x 215.0 x 11.3 mm",
  },
  // Apple iPhone
  "iphone 15": {
    processor: "Apple A16 Bionic",
    processorType: "apple-m2",
    storage: "128GB",
    storageSize: "128",
    screenSize: "under-13",
    screenResolution: "fhd",
    graphics: "Apple GPU",
    graphicsType: "apple-gpu",
    os: "iOS 17",
    osType: "macos",
    weight: "171 g",
    batteryLife: "20 hours video",
    releaseYear: 2023,
    ports: "USB-C",
    dimensions: "147.6 x 71.6 x 7.80 mm",
  },
  "iphone 14": {
    processor: "Apple A15 Bionic",
    processorType: "apple-m1",
    storage: "128GB",
    storageSize: "128",
    screenSize: "under-13",
    screenResolution: "fhd",
    graphics: "Apple GPU",
    graphicsType: "apple-gpu",
    os: "iOS 17",
    osType: "macos",
    weight: "172 g",
    batteryLife: "20 hours video",
    releaseYear: 2022,
    ports: "Lightning",
    dimensions: "146.7 x 71.5 x 7.80 mm",
  },
  // Samsung Galaxy
  "samsung galaxy s": {
    processor: "Snapdragon 8 Gen 2",
    storage: "256GB",
    storageSize: "256",
    screenSize: "under-13",
    screenResolution: "2k",
    os: "Android 14",
    weight: "168 g",
    batteryLife: "22 hours",
    releaseYear: 2023,
    ports: "USB-C",
    dimensions: "146.3 x 70.9 x 7.6 mm",
  },
  // Monitors
  "dell ultrasharp": {
    screenSize: "17-plus",
    screenResolution: "4k",
    panel: "IPS",
    refreshRate: "60Hz",
    ports: "USB-C, HDMI, DisplayPort",
    releaseYear: 2023,
  },
  "samsung odyssey": {
    screenSize: "17-plus",
    screenResolution: "2k",
    panel: "VA Curved",
    refreshRate: "240Hz",
    ports: "HDMI, DisplayPort",
    releaseYear: 2022,
  },
};

// Find best matching product from database
function findMatchingProduct(productName: string, brand: string): Record<string, unknown> | null {
  const searchKey = `${brand.toLowerCase()} ${productName.toLowerCase()}`;
  
  // Try exact match first
  for (const key of Object.keys(productDatabase)) {
    if (searchKey.includes(key)) {
      return productDatabase[key];
    }
  }
  
  // Try partial match
  for (const key of Object.keys(productDatabase)) {
    const keyWords = key.split(" ");
    const matchCount = keyWords.filter(word => searchKey.includes(word)).length;
    if (matchCount >= 2) {
      return productDatabase[key];
    }
  }
  
  return null;
}

// Calculate confidence based on match quality
function calculateConfidence(productName: string, brand: string, specs: Record<string, unknown>): number {
  const searchKey = `${brand.toLowerCase()} ${productName.toLowerCase()}`;
  let confidence = 0.5; // Base confidence
  
  // Check for exact brand match
  if (Object.keys(productDatabase).some(key => key.startsWith(brand.toLowerCase()))) {
    confidence += 0.2;
  }
  
  // Check for model number patterns
  if (/[a-z]+\s*\d{3,}/i.test(productName)) {
    confidence += 0.15;
  }
  
  // Check if we found matching specs
  if (Object.keys(specs).length > 5) {
    confidence += 0.15;
  }
  
  return Math.min(confidence, 0.99);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productName, brand, category } = body;
    
    if (!productName || !brand) {
      return NextResponse.json(
        { error: "Product name and brand are required" },
        { status: 400 }
      );
    }
    
    // Find matching specs
    const matchedSpecs = findMatchingProduct(productName, brand);
    
    if (!matchedSpecs) {
      // Return generic specs based on category
      const genericSpecs: Record<string, Record<string, unknown>> = {
        LAPTOPS: {
          processor: "Intel Core i5",
          processorType: "intel-i5",
          ram: "8GB DDR4",
          ramSize: "8",
          storage: "256GB SSD",
          storageSize: "256",
          screenSize: "15-16",
          screenResolution: "fhd",
          graphics: "Integrated",
          graphicsType: "integrated",
          os: "Windows 11",
          osType: "windows-11",
        },
        PHONES: {
          storage: "128GB",
          storageSize: "128",
          screenSize: "under-13",
          screenResolution: "fhd",
        },
        TABLETS: {
          storage: "64GB",
          storageSize: "64",
          screenSize: "under-13",
          screenResolution: "2k",
        },
        MONITORS: {
          screenSize: "17-plus",
          screenResolution: "fhd",
        },
        DESKTOPS: {
          processor: "Intel Core i5",
          processorType: "intel-i5",
          ram: "16GB DDR4",
          ramSize: "16",
          storage: "512GB SSD",
          storageSize: "512",
          graphics: "Integrated",
          graphicsType: "integrated",
          os: "Windows 11",
          osType: "windows-11",
        },
      };
      
      return NextResponse.json({
        specifications: genericSpecs[category] || {},
        confidence: 0.4,
        message: "Using generic specifications. Please verify manually.",
      });
    }
    
    const confidence = calculateConfidence(productName, brand, matchedSpecs);
    
    return NextResponse.json({
      specifications: matchedSpecs,
      confidence,
      message: confidence >= 0.9 
        ? "High confidence match found"
        : confidence >= 0.7
        ? "Medium confidence - please verify"
        : "Low confidence - manual review recommended",
    });
    
  } catch (error) {
    console.error("Auto-fill error:", error);
    return NextResponse.json(
      { error: "Failed to auto-fill specifications" },
      { status: 500 }
    );
  }
}
