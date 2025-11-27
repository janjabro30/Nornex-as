/**
 * NORNEX AS - Products Data (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  condition: 'new' | 'refurbished' | 'used';
  stock: number;
  images: string[];
  specifications: Record<string, string>;
  features: string[];
}

export const productsData: ProductData[] = [
  {
    id: '1',
    slug: 'hp-elitebook-840-g8',
    name: 'HP EliteBook 840 G8',
    description: 'Profesjonell bærbar datamaskin med Intel Core i7, 16GB RAM og 512GB SSD. Perfekt for kontor og hjemmekontor.',
    price: 12990,
    originalPrice: 15990,
    category: 'Bærbar PC',
    brand: 'HP',
    condition: 'refurbished',
    stock: 8,
    images: ['/images/products/hp-elitebook-840.jpg'],
    specifications: {
      'Prosessor': 'Intel Core i7-1165G7',
      'RAM': '16 GB DDR4',
      'Lagring': '512 GB NVMe SSD',
      'Skjerm': '14" Full HD IPS',
      'Grafikk': 'Intel Iris Xe',
      'Operativsystem': 'Windows 11 Pro',
      'Batteri': 'Opptil 13 timer',
      'Vekt': '1.34 kg',
    },
    features: ['Fingeravtrykksleser', 'Bakgrunnsbelyst tastatur', 'Thunderbolt 4', 'WiFi 6'],
  },
  {
    id: '2',
    slug: 'lenovo-thinkpad-x1-carbon',
    name: 'Lenovo ThinkPad X1 Carbon Gen 9',
    description: 'Ultralett forretnings-laptop med premium byggekvalitet og klassisk ThinkPad-design.',
    price: 18990,
    category: 'Bærbar PC',
    brand: 'Lenovo',
    condition: 'new',
    stock: 5,
    images: ['/images/products/thinkpad-x1-carbon.jpg'],
    specifications: {
      'Prosessor': 'Intel Core i7-1185G7',
      'RAM': '16 GB LPDDR4x',
      'Lagring': '512 GB SSD',
      'Skjerm': '14" WUXGA IPS',
      'Grafikk': 'Intel Iris Xe',
      'Operativsystem': 'Windows 11 Pro',
      'Batteri': 'Opptil 16 timer',
      'Vekt': '1.13 kg',
    },
    features: ['LTE-modem', 'IR-kamera', 'TrackPoint', 'MIL-STD-810H'],
  },
  {
    id: '3',
    slug: 'dell-optiplex-7090',
    name: 'Dell OptiPlex 7090 SFF',
    description: 'Kompakt stasjonær PC for bedrifter med kraftig ytelse i liten formfaktor.',
    price: 8990,
    originalPrice: 10990,
    category: 'Stasjonær PC',
    brand: 'Dell',
    condition: 'refurbished',
    stock: 12,
    images: ['/images/products/dell-optiplex-7090.jpg'],
    specifications: {
      'Prosessor': 'Intel Core i5-11500',
      'RAM': '16 GB DDR4',
      'Lagring': '256 GB SSD',
      'Grafikk': 'Intel UHD 750',
      'Operativsystem': 'Windows 11 Pro',
      'Porter': 'USB-C, DisplayPort, HDMI',
      'Formfaktor': 'Small Form Factor',
    },
    features: ['Enkel service', 'ENERGY STAR', 'TPM 2.0', 'vPro'],
  },
  {
    id: '4',
    slug: 'apple-macbook-pro-14',
    name: 'Apple MacBook Pro 14"',
    description: 'Kraftig Mac for profesjonelle med M3 Pro-chip og fantastisk XDR-skjerm.',
    price: 27990,
    category: 'Bærbar PC',
    brand: 'Apple',
    condition: 'new',
    stock: 3,
    images: ['/images/products/macbook-pro-14.jpg'],
    specifications: {
      'Prosessor': 'Apple M3 Pro 11-core',
      'RAM': '18 GB unified memory',
      'Lagring': '512 GB SSD',
      'Skjerm': '14.2" Liquid Retina XDR',
      'Grafikk': '14-core GPU',
      'Operativsystem': 'macOS Sonoma',
      'Batteri': 'Opptil 17 timer',
      'Vekt': '1.61 kg',
    },
    features: ['MagSafe 3', 'HDMI', 'SDXC-kortleser', 'ProMotion 120Hz'],
  },
  {
    id: '5',
    slug: 'dell-ultrasharp-u2723qe',
    name: 'Dell UltraSharp U2723QE',
    description: '27" 4K USB-C skjerm med IPS Black-teknologi og utmerket fargenøyaktighet.',
    price: 6990,
    category: 'Skjerm',
    brand: 'Dell',
    condition: 'new',
    stock: 15,
    images: ['/images/products/dell-u2723qe.jpg'],
    specifications: {
      'Størrelse': '27 tommer',
      'Oppløsning': '3840 x 2160 (4K)',
      'Panel': 'IPS Black',
      'Oppdateringsfrekvens': '60 Hz',
      'Tilkobling': 'USB-C 90W, HDMI, DP',
      'Justering': 'Høyde, tilt, pivot, swivel',
      'VESA': '100 x 100 mm',
    },
    features: ['USB-C hub', 'KVM-switch', 'HDR 400', '100% sRGB'],
  },
  {
    id: '6',
    slug: 'logitech-mx-master-3s',
    name: 'Logitech MX Master 3S',
    description: 'Premium trådløs mus med MagSpeed-rullehjul og ergonomisk design.',
    price: 1090,
    category: 'Tilbehør',
    brand: 'Logitech',
    condition: 'new',
    stock: 25,
    images: ['/images/products/mx-master-3s.jpg'],
    specifications: {
      'Sensor': '8000 DPI',
      'Tilkobling': 'Bluetooth, 2.4GHz USB',
      'Batteri': 'Opptil 70 dager',
      'Lading': 'USB-C hurtiglading',
      'Knapper': '7 programmerbare',
      'Kompatibilitet': 'Windows, Mac, Linux',
    },
    features: ['Quiet Click', 'Flow cross-computer', 'App-spesifikke profiler', 'Gesturer'],
  },
  {
    id: '7',
    slug: 'hp-laserjet-pro-mfp-m428fdw',
    name: 'HP LaserJet Pro MFP M428fdw',
    description: 'Alt-i-ett laserskriver for små bedrifter med scanning, kopiering og faks.',
    price: 4990,
    originalPrice: 5990,
    category: 'Skriver',
    brand: 'HP',
    condition: 'new',
    stock: 7,
    images: ['/images/products/hp-laserjet-m428.jpg'],
    specifications: {
      'Type': 'Svart-hvitt laser',
      'Utskriftshastighet': '38 spm',
      'Oppløsning': '1200 x 1200 dpi',
      'Papirkapasitet': '350 ark',
      'Dupleks': 'Automatisk',
      'Tilkobling': 'WiFi, Ethernet, USB',
      'Funksjoner': 'Print, Scan, Copy, Fax',
    },
    features: ['HP Smart app', 'Sikker utskrift', 'Auto dokumentmater', 'Apple AirPrint'],
  },
  {
    id: '8',
    slug: 'synology-ds920-plus',
    name: 'Synology DS920+',
    description: '4-bay NAS for bedrifter og avanserte hjemmebrukere med kraftig ytelse.',
    price: 6490,
    category: 'Lagring',
    brand: 'Synology',
    condition: 'new',
    stock: 4,
    images: ['/images/products/synology-ds920.jpg'],
    specifications: {
      'Diskbrønner': '4 (utvidbar til 9)',
      'Prosessor': 'Intel Celeron J4125',
      'RAM': '4 GB DDR4 (maks 8)',
      'Nettverk': '2x Gigabit LAN',
      'USB': '2x USB 3.0',
      'M.2 SSD': '2x NVMe cache',
      'RAID': '0, 1, 5, 6, 10, JBOD, SHR',
    },
    features: ['DSM operativsystem', 'Btrfs-støtte', 'Virtualisering', 'Surveillance Station'],
  },
  {
    id: '9',
    slug: 'ubiquiti-unifi-dream-machine-pro',
    name: 'Ubiquiti UniFi Dream Machine Pro',
    description: 'Alt-i-ett nettverksløsning med ruter, switch og NVR for profesjonelt bruk.',
    price: 5990,
    category: 'Nettverk',
    brand: 'Ubiquiti',
    condition: 'new',
    stock: 6,
    images: ['/images/products/udm-pro.jpg'],
    specifications: {
      'WAN-porter': '1x SFP+, 1x Gigabit RJ45',
      'LAN-porter': '8x Gigabit',
      'Prosessor': 'Quad-core ARM',
      'RAM': '4 GB DDR4',
      'Lagring': 'HDD-plass for NVR',
      'IDS/IPS': 'Inntil 3.5 Gbps',
      'VPN': 'Site-to-site, remote',
    },
    features: ['UniFi Controller', 'Protect NVR', 'Deep packet inspection', 'Threat management'],
  },
  {
    id: '10',
    slug: 'microsoft-surface-pro-9',
    name: 'Microsoft Surface Pro 9',
    description: '2-i-1 nettbrett og laptop med avtagbart tastatur og Surface Pen-støtte.',
    price: 14990,
    category: 'Nettbrett',
    brand: 'Microsoft',
    condition: 'new',
    stock: 8,
    images: ['/images/products/surface-pro-9.jpg'],
    specifications: {
      'Prosessor': 'Intel Core i5-1235U',
      'RAM': '8 GB LPDDR5',
      'Lagring': '256 GB SSD',
      'Skjerm': '13" PixelSense Flow 120Hz',
      'Grafikk': 'Intel Iris Xe',
      'Operativsystem': 'Windows 11 Home',
      'Batteri': 'Opptil 15.5 timer',
      'Vekt': '879 g (uten tastatur)',
    },
    features: ['Surface Pen-støtte', 'Windows Hello', 'Thunderbolt 4', 'Dolby Atmos'],
  },
  {
    id: '11',
    slug: 'jabra-evolve2-85',
    name: 'Jabra Evolve2 85',
    description: 'Profesjonelt trådløst headset med aktiv støydemping for kontoret og hjemmekontor.',
    price: 3990,
    originalPrice: 4490,
    category: 'Tilbehør',
    brand: 'Jabra',
    condition: 'new',
    stock: 20,
    images: ['/images/products/jabra-evolve2-85.jpg'],
    specifications: {
      'Type': 'Over-ear',
      'ANC': 'Hybrid aktiv støydemping',
      'Mikrofoner': '10 (8 ANC + 2 tale)',
      'Batteri': 'Opptil 37 timer',
      'Tilkobling': 'Bluetooth + USB-dongle',
      'Lading': 'USB-C',
      'Kompatibilitet': 'Teams, Zoom, alle UC-plattformer',
    },
    features: ['Busylight', 'On-ear detection', 'Sidetone', 'MultiPoint'],
  },
  {
    id: '12',
    slug: 'samsung-galaxy-book3-pro',
    name: 'Samsung Galaxy Book3 Pro',
    description: 'Ultratynn og lett laptop med AMOLED-skjerm og lang batteritid.',
    price: 15990,
    category: 'Bærbar PC',
    brand: 'Samsung',
    condition: 'new',
    stock: 5,
    images: ['/images/products/galaxy-book3-pro.jpg'],
    specifications: {
      'Prosessor': 'Intel Core i7-1360P',
      'RAM': '16 GB LPDDR5',
      'Lagring': '512 GB NVMe SSD',
      'Skjerm': '14" Dynamic AMOLED 2X',
      'Grafikk': 'Intel Iris Xe',
      'Operativsystem': 'Windows 11 Home',
      'Batteri': 'Opptil 21 timer',
      'Vekt': '1.17 kg',
    },
    features: ['S Pen-støtte', 'FHD-webkamera', 'Link to Windows', 'Studio-kvalitet mikrofoner'],
  },
];

export const productCategories = [
  'Bærbar PC',
  'Stasjonær PC',
  'Skjerm',
  'Tilbehør',
  'Skriver',
  'Lagring',
  'Nettverk',
  'Nettbrett',
];

export const productBrands = [
  'HP',
  'Lenovo',
  'Dell',
  'Apple',
  'Logitech',
  'Synology',
  'Ubiquiti',
  'Microsoft',
  'Jabra',
  'Samsung',
];

export const getProductBySlug = (slug: string): ProductData | undefined => {
  return productsData.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: string): ProductData[] => {
  return productsData.filter(p => p.category === category);
};

export const getProductsByBrand = (brand: string): ProductData[] => {
  return productsData.filter(p => p.brand === brand);
};
