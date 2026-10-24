/**
 * TechParts - Data Layer & Mock Database
 * Contains categories, initial catalog, mock user profiles, reviews, and initial state.
 */

const TECHPARTS_DATA = {
  categories: [
    {
      id: "cpus",
      name: "CPUs",
      fullName: "Processors (CPUs)",
      icon: "fa-microchip",
      description: "High-performance Intel and AMD processors for gaming and workstations.",
      itemCount: 24,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gpus",
      name: "GPUs",
      fullName: "Graphics Cards (GPUs)",
      icon: "fa-vr-cardboard",
      description: "Ultra-fast ray tracing graphics cards from NVIDIA GeForce and AMD Radeon.",
      itemCount: 19,
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "motherboards",
      name: "Motherboards",
      fullName: "Motherboards",
      icon: "fa-chess-board",
      description: "Feature-packed ATX, Micro-ATX, and ITX motherboards for AM5 and LGA1700.",
      itemCount: 16,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "ram",
      name: "RAM",
      fullName: "Memory (RAM)",
      icon: "fa-memory",
      description: "Low-latency DDR5 and DDR4 desktop memory kits with RGB and stealth heatspreaders.",
      itemCount: 22,
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "ssds",
      name: "SSDs",
      fullName: "Storage (SSDs)",
      icon: "fa-hard-drive",
      description: "Blistering Gen4 and Gen5 NVMe M.2 solid state drives up to 12,400 MB/s.",
      itemCount: 28,
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "power-supplies",
      name: "Power Supplies",
      fullName: "Power Supplies (PSUs)",
      icon: "fa-plug",
      description: "80 Plus Gold and Platinum certified modular power supplies with ATX 3.0 ready cables.",
      itemCount: 15,
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "cases",
      name: "PC Cases",
      fullName: "PC Cases & Chassis",
      icon: "fa-box-archive",
      description: "High-airflow mesh towers and panoramic dual-chamber tempered glass chassis.",
      itemCount: 18,
      image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "cooling",
      name: "Cooling",
      fullName: "Cooling & Fans",
      icon: "fa-fan",
      description: "Precision dual-tower air coolers and 360mm AIO all-in-one liquid cooling loops.",
      itemCount: 21,
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80"
    }
  ],

  brands: ["AMD", "Intel", "NVIDIA", "Corsair", "Samsung", "ASUS", "NZXT", "DeepCool", "MSI", "Crucial", "Lian Li"],

  products: [
    {
      id: "prod-1",
      name: "AMD Ryzen 7 7800X3D",
      category: "cpus",
      brand: "AMD",
      price: 399.99,
      originalPrice: 449.99,
      rating: 4.9,
      reviewCount: 342,
      stock: 18,
      isFeatured: true,
      isDeal: true,
      badge: "Best Gaming CPU",
      images: [
        "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
      ],
      description: "The AMD Ryzen 7 7800X3D is widely regarded as the ultimate desktop gaming processor. Powered by cutting-edge AMD 3D V-Cache technology, it delivers phenomenal gaming frame rates, exceptional power efficiency, and seamless multitasking on the modern AM5 socket platform.",
      specs: {
        "Socket": "AMD Socket AM5",
        "Cores / Threads": "8 Cores / 16 Threads",
        "Base Clock": "4.2 GHz",
        "Max Boost Clock": "Up to 5.0 GHz",
        "L3 Cache": "96 MB 3D V-Cache (104MB total)",
        "TDP": "120 Watts",
        "PCIe Version": "PCIe 5.0 Support",
        "Integrated Graphics": "AMD Radeon Graphics (2 Cores)",
        "Memory Support": "DDR5 up to 5200MT/s (JEDEC) / 6000MT/s+ (EXPO)"
      }
    },
    {
      id: "prod-2",
      name: "Intel Core i7-14700K",
      category: "cpus",
      brand: "Intel",
      price: 389.99,
      originalPrice: 419.99,
      rating: 4.8,
      reviewCount: 215,
      stock: 14,
      isFeatured: true,
      isDeal: false,
      badge: "High Performance",
      images: [
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Intel 14th Gen Core i7-14700K desktop processor features a hybrid architecture with 20 cores (8 Performance + 12 Efficient cores) designed to crush AAA gaming titles, video rendering, streaming, and intensive software engineering workflows simultaneously.",
      specs: {
        "Socket": "LGA 1700",
        "Cores / Threads": "20 Cores (8P + 12E) / 28 Threads",
        "Max Turbo Frequency": "Up to 5.6 GHz",
        "P-Core Base Frequency": "3.4 GHz",
        "Intel Smart Cache": "33 MB L3 + 28 MB L2",
        "Base Power / Max Turbo": "125W Base / 253W Turbo",
        "PCIe Lanes": "PCIe 5.0 and 4.0 lanes",
        "Integrated Graphics": "Intel UHD Graphics 770",
        "Memory Support": "DDR5-5600 / DDR4-3200"
      }
    },
    {
      id: "prod-3",
      name: "NVIDIA GeForce RTX 4070 Super 12GB",
      category: "gpus",
      brand: "NVIDIA",
      price: 599.99,
      originalPrice: 649.99,
      rating: 4.9,
      reviewCount: 489,
      stock: 9,
      isFeatured: true,
      isDeal: true,
      badge: "Top Seller",
      images: [
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Supercharged gaming and creative performance powered by NVIDIA Ada Lovelace architecture. Experience lifelike ray tracing with full DLSS 3 frame generation, AI tensor accelerators, and unmatched 1440p / 4K gaming stability.",
      specs: {
        "Video Memory": "12 GB GDDR6X",
        "Memory Interface": "192-bit",
        "Boost Clock": "2475 MHz",
        "CUDA Cores": "7,168 Cores",
        "TDP / Power Connector": "220W (1x 16-pin 12VHPWR)",
        "Ray Tracing": "3rd Gen RT Cores",
        "AI Engine": "4th Gen Tensor Cores with DLSS 3.5",
        "Display Outputs": "3x DisplayPort 1.4a, 1x HDMI 2.1a"
      }
    },
    {
      id: "prod-4",
      name: "AMD Radeon RX 7800 XT 16GB",
      category: "gpus",
      brand: "AMD",
      price: 489.99,
      originalPrice: 529.99,
      rating: 4.7,
      reviewCount: 184,
      stock: 12,
      isFeatured: true,
      isDeal: false,
      badge: "Great Value 1440p",
      images: [
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Engineered on AMD RDNA 3 architecture, the Radeon RX 7800 XT provides immense 16GB GDDR6 memory buffer to breeze through maximum settings at 1440p and 4K without worrying about VRAM limitations. Features AMD HYPR-RX and FSR 3 fluid motion frames.",
      specs: {
        "Video Memory": "16 GB GDDR6",
        "Memory Interface": "256-bit",
        "Boost Clock": "Up to 2430 MHz",
        "Stream Processors": "3,840 Units",
        "AMD Infinity Cache": "64 MB 2nd Gen",
        "Board Power": "263 Watts (2x 8-pin)",
        "Display Outputs": "3x DisplayPort 2.1, 1x HDMI 2.1",
        "Recommended PSU": "700W minimum"
      }
    },
    {
      id: "prod-5",
      name: "Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz",
      category: "ram",
      brand: "Corsair",
      price: 114.99,
      originalPrice: 134.99,
      rating: 4.8,
      reviewCount: 560,
      stock: 35,
      isFeatured: true,
      isDeal: true,
      badge: "Speed Tuned",
      images: [
        "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Corsair Vengeance DDR5 delivers the higher frequencies and greater capacities of DDR5 technology in a high-quality, compact aluminum heatspreader module that fits your system cleanly. Optimized for modern Intel and AMD AM5 platforms.",
      specs: {
        "Kit Capacity": "32 GB (2 x 16GB)",
        "Speed": "DDR5 6000 MT/s (PC5-48000)",
        "Tested Latency": "CL30 (30-36-36-76)",
        "Tested Voltage": "1.40V",
        "Overclocking Profile": "Intel XMP 3.0 & AMD EXPO Supported",
        "Heat Spreader": "Anodized Aluminum Stealth Black",
        "Form Factor": "288-pin DIMM",
        "Warranty": "Limited Lifetime Warranty"
      }
    },
    {
      id: "prod-6",
      name: "Samsung 990 Pro 1TB NVMe PCIe 4.0 SSD",
      category: "ssds",
      brand: "Samsung",
      price: 109.99,
      originalPrice: 129.99,
      rating: 4.9,
      reviewCount: 820,
      stock: 42,
      isFeatured: true,
      isDeal: false,
      badge: "Ultra Fast",
      images: [
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Reach near max performance of PCIe 4.0. The Samsung 990 Pro provides blisteringly fast sequential read speeds up to 7,450 MB/s and random read speeds up to 1,200K IOPS. Designed for hardcore gamers, 4K/8K video editors, and heavy 3D rendering workflows.",
      specs: {
        "Capacity": "1,000 GB (1TB)",
        "Form Factor": "M.2 2280",
        "Interface": "PCIe Gen 4.0 x4, NVMe 2.0",
        "Sequential Read": "Up to 7,450 MB/s",
        "Sequential Write": "Up to 6,900 MB/s",
        "Endurance (TBW)": "600 TBW",
        "DRAM Cache Memory": "1GB Low Power DDR4 SDRAM",
        "Controller": "Samsung In-House Pascal Controller"
      }
    },
    {
      id: "prod-7",
      name: "ASUS ROG Strix B650-A Gaming WiFi Motherboard",
      category: "motherboards",
      brand: "ASUS",
      price: 219.99,
      originalPrice: 249.99,
      rating: 4.8,
      reviewCount: 143,
      stock: 15,
      isFeatured: true,
      isDeal: false,
      badge: "Editor's Choice",
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
      ],
      description: "The ASUS ROG Strix B650-A Gaming WiFi motherboard is equipped with robust power delivery, high-grade heatsinks, PCIe 5.0 M.2 slot support, ultra-fast WiFi 6E, and signature ROG aesthetics with clean silver and white accents.",
      specs: {
        "Socket": "AMD Socket AM5 for Ryzen 7000/8000/9000",
        "Form Factor": "ATX (12 inch x 9.6 inch)",
        "Power Stages": "12 + 2 Teamed Power Stages (60A)",
        "Memory Slots": "4x DDR5 DIMMs, up to 192GB (7600+ OC)",
        "Storage Expansion": "3x M.2 slots (1x PCIe 5.0 x4, 2x PCIe 4.0 x4)",
        "Networking": "Intel 2.5Gb Ethernet & WiFi 6E Bluetooth 5.2",
        "Audio": "ROG SupremeFX ALC4080 with Savitech Amp",
        "Rear I/O": "USB 3.2 Gen 2x2 Type-C, DisplayPort, HDMI"
      }
    },
    {
      id: "prod-8",
      name: "Corsair RM750e 750W 80+ Gold Fully Modular PSU",
      category: "power-supplies",
      brand: "Corsair",
      price: 99.99,
      originalPrice: 119.99,
      rating: 4.8,
      reviewCount: 312,
      stock: 22,
      isFeatured: true,
      isDeal: true,
      badge: "Silent & Efficient",
      images: [
        "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Corsair RM750e Fully Modular Low-Noise Power Supplies provide quiet, reliable power with 80 PLUS Gold efficiency to your PC. ATX 3.0 and PCIe 5.0 compliant with native 12VHPWR cable for modern high-performance GPUs.",
      specs: {
        "Total Output": "750 Watts Continuous",
        "Efficiency Rating": "80 PLUS Gold & Cybenetics Platinum",
        "Cabling": "100% Fully Modular Flat Black Cables",
        "ATX Standard": "ATX 3.0 & PCIe 5.0 Compliant",
        "Fan Type": "120mm Rifle Bearing with Zero RPM Mode",
        "Capacitors": "105°C-rated industrial-grade capacitors",
        "Dimensions": "150mm x 86mm x 140mm (Compact 140mm)",
        "Protection": "OVP, UVP, SCP, OTP, OPP"
      }
    },
    {
      id: "prod-9",
      name: "NZXT H5 Flow Compact ATX Mid-Tower PC Case",
      category: "cases",
      brand: "NZXT",
      price: 89.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviewCount: 275,
      stock: 19,
      isFeatured: true,
      isDeal: false,
      badge: "High Airflow",
      images: [
        "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80"
      ],
      description: "The NZXT H5 Flow features a perforated front panel to generate an extra dimension of airflow for maximum cooling potential. Includes a dedicated bottom fan angled to cool graphics cards directly, intuitive cable management channels, and a tool-less tempered glass side panel.",
      specs: {
        "Chassis Type": "Compact ATX Mid-Tower",
        "Motherboard Support": "Mini-ITX, Micro-ATX, ATX",
        "Side Panel": "Tempered Glass with thumb screw release",
        "Radiator Support": "Front: Up to 280mm / Top: Up to 240mm",
        "Max GPU Length": "365 mm clearance",
        "Max CPU Cooler Height": "165 mm",
        "Pre-installed Fans": "2x 120mm F-Series Quiet Fans (including floor GPU fan)",
        "Front Ports": "1x USB 3.2 Gen 2 Type-C, 1x USB 3.2 Gen 1 Type-A, 1x Audio Jack"
      }
    },
    {
      id: "prod-10",
      name: "DeepCool AK620 High-Performance CPU Cooler",
      category: "cooling",
      brand: "DeepCool",
      price: 54.99,
      originalPrice: 64.99,
      rating: 4.8,
      reviewCount: 410,
      stock: 28,
      isFeatured: true,
      isDeal: true,
      badge: "Top Air Cooler",
      images: [
        "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=800&q=80"
      ],
      description: "The DeepCool AK620 High-Performance CPU Cooler achieves maximum cooling performance and quiet efficiency with a dual-tower layout, six copper heatpipes, and two 120mm FDB fluid-dynamic-bearing fans capable of dissipating up to 260W of heat.",
      specs: {
        "Cooler Type": "Dual-Tower Air Cooler",
        "Heatpipes": "6x Ø6 mm sintered pure copper heatpipes",
        "Fans": "2x 120mm Fluid Dynamic Bearing (FDB) PWM Fans",
        "Fan Speed Range": "500 - 1850 RPM ±10%",
        "Max Airflow / Noise": "68.99 CFM / ≤28 dB(A)",
        "Cooling Capacity": "Up to 260W TDP",
        "Socket Compatibility": "Intel LGA 1700/1200/1151 & AMD AM5/AM4",
        "Dimensions": "129 x 138 x 160 mm"
      }
    },
    {
      id: "prod-11",
      name: "MSI MAG CoreLiquid 360R V2 Liquid CPU Cooler",
      category: "cooling",
      brand: "MSI",
      price: 129.99,
      originalPrice: 149.99,
      rating: 4.6,
      reviewCount: 190,
      stock: 11,
      isFeatured: false,
      isDeal: true,
      badge: "360mm AIO",
      images: [
        "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
      ],
      description: "The MAG CoreLiquid 360R V2 all-in-one liquid cooler boasts an integrated ceramic pump inside the radiator to dampen noise, high-density aluminum fin array, and 3 ARGB fans customizable via MSI Mystic Light sync.",
      specs: {
        "Radiator Size": "360mm (394 x 120 x 27 mm)",
        "Pump Motor": "Durable Three-phase ceramic bearing pump (4200 RPM)",
        "Fans": "3x 120mm Two-Ball Bearing ARGB Fans",
        "RGB Sync": "Addressable Gen 2 ARGB Header Compatible",
        "Tubing": "Evaporation-proof triple-layer netted plastic tubing"
      }
    },
    {
      id: "prod-12",
      name: "Crucial T700 2TB Gen5 NVMe M.2 SSD",
      category: "ssds",
      brand: "Crucial",
      price: 279.99,
      originalPrice: 319.99,
      rating: 4.9,
      reviewCount: 95,
      stock: 8,
      isFeatured: false,
      isDeal: false,
      badge: "Gen5 Flagship",
      images: [
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Experience the pinnacle of next-generation solid-state drive performance. With read speeds up to 12,400 MB/s, the Crucial T700 PCIe 5.0 NVMe SSD accelerates gaming asset loading, 3D photorealistic rendering, and workstation datasets.",
      specs: {
        "Capacity": "2,000 GB (2TB)",
        "Interface": "PCIe Gen 5.0 x4 NVMe 2.0",
        "Sequential Read": "Up to 12,400 MB/s",
        "Sequential Write": "Up to 11,800 MB/s",
        "Endurance": "1200 TBW",
        "Heatsink": "Premium Aluminum with nickel-plated copper bottom"
      }
    },
    {
      id: "prod-13",
      name: "Lian Li O11 Vision Dual-Chamber PC Case",
      category: "cases",
      brand: "Lian Li",
      price: 139.99,
      originalPrice: 159.99,
      rating: 4.9,
      reviewCount: 380,
      stock: 14,
      isFeatured: false,
      isDeal: false,
      badge: "Showcase King",
      images: [
        "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Designed in collaboration with PC Master Race (PCMR), the Lian Li O11 Vision provides an uninterrupted panoramic view of your PC build with three sides of borderless tempered glass panels and a dual-chamber cable management interior.",
      specs: {
        "Panels": "3x Tempered Glass (Front, Top, Left side)",
        "Motherboard Support": "E-ATX (under 280mm), ATX, Micro-ATX, Mini-ITX",
        "Radiator Support": "Side: 360mm / Bottom: 360mm / Rear: Up to 240mm",
        "Max GPU Length": "455 mm (Fits any RTX 4090)",
        "Drive Capacity": "2x 3.5\" HDD or 3x 2.5\" SSD"
      }
    },
    {
      id: "prod-14",
      name: "ASUS TUF Gaming GeForce RTX 4080 Super 16GB",
      category: "gpus",
      brand: "ASUS",
      price: 1049.99,
      originalPrice: 1099.99,
      rating: 4.9,
      reviewCount: 115,
      stock: 6,
      isFeatured: false,
      isDeal: false,
      badge: "4K Beast",
      images: [
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Military-grade durability meets extreme gaming performance. The ASUS TUF Gaming RTX 4080 Super features dual ball bearing fans, high-durability capacitors, a vented metal exoskeleton, and factory GPU overclocking.",
      specs: {
        "Video Memory": "16 GB GDDR6X (23 Gbps)",
        "Memory Bus": "256-bit",
        "CUDA Cores": "10,240 Cores",
        "Clock Speed": "2580 MHz (OC Mode)",
        "Power Requirements": "750W minimum PSU (1x 16-pin 12VHPWR)"
      }
    }
  ],

  sampleReviews: [
    {
      productId: "prod-1",
      author: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "3 days ago",
      verified: true,
      title: "Insane gaming performance on AM5!",
      comment: "Upgraded from a 5800X to this 7800X3D paired with an RTX 4080. My 1% lows in Cyberpunk 2077 and Warzone jumped by nearly 40 FPS. Runs remarkably cool with a basic dual-tower air cooler. Best value gaming CPU hands down."
    },
    {
      productId: "prod-1",
      author: "David Chen",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "1 week ago",
      verified: true,
      title: "Efficient, cool and blisteringly fast",
      comment: "Draws less than 75 watts while maxing out frame rates in competitive titles. Extremely pleased with TechParts fast 2-day delivery and secure packaging."
    },
    {
      productId: "prod-3",
      author: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      title: "The sweet spot for 1440p high-refresh gaming",
      comment: "Replaced an older GTX 1080. The leap in ray tracing and DLSS 3 is mind-blowing. Whisper quiet fans even under 100% stress tests."
    },
    {
      productId: "prod-6",
      author: "Ethan Wright",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "October 18, 2026",
      verified: true,
      title: "Load times are basically non-existent now",
      comment: "Windows 11 boots in under 4 seconds. DirectStorage in supported games loads 40GB textures almost instantly. Make sure your motherboard has an M.2 heatsink."
    }
  ],

  defaultUser: {
    name: "Alex Turner",
    email: "alex.turner@techparts.dev",
    phone: "+1 (555) 234-8901",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    memberSince: "March 2024",
    addresses: [
      {
        id: "addr-1",
        label: "Home (Primary)",
        name: "Alex Turner",
        street: "742 Evergreen Terrace",
        city: "Seattle",
        state: "Washington",
        zip: "98101",
        phone: "+1 (555) 234-8901",
        isDefault: true
      },
      {
        id: "addr-2",
        label: "Studio / Office",
        name: "Alex Turner",
        street: "1200 Innovation Way, Suite 400",
        city: "Bellevue",
        state: "Washington",
        zip: "98004",
        phone: "+1 (555) 890-1234",
        isDefault: false
      }
    ]
  },

  defaultOrders: [
    {
      id: "TP-84920",
      date: "2026-10-20",
      status: "Delivered",
      total: 509.98,
      paymentMethod: "Credit Card (Visa ending in 4242)",
      deliveryAddress: "742 Evergreen Terrace, Seattle, WA 98101",
      trackingNumber: "FEDEX-948271049281",
      items: [
        { id: "prod-1", name: "AMD Ryzen 7 7800X3D", price: 399.99, quantity: 1, image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80" },
        { id: "prod-6", name: "Samsung 990 Pro 1TB NVMe PCIe 4.0 SSD", price: 109.99, quantity: 1, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "TP-82104",
      date: "2026-10-12",
      status: "Delivered",
      total: 114.99,
      paymentMethod: "UPI (alex@okhdfcbank)",
      deliveryAddress: "742 Evergreen Terrace, Seattle, WA 98101",
      trackingNumber: "UPS-1Z9999999999999999",
      items: [
        { id: "prod-5", name: "Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz", price: 114.99, quantity: 1, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80" }
      ]
    }
  ],

  defaultWishlist: ["prod-3", "prod-7", "prod-10"],

  adminStats: {
    totalRevenue: 48920.50,
    totalOrders: 142,
    totalProducts: 14,
    totalCustomers: 89
  }
};

// Storage keys
const STORAGE_KEYS = {
  PRODUCTS: "techparts_products_v1",
  CART: "techparts_cart_v1",
  WISHLIST: "techparts_wishlist_v1",
  USER: "techparts_user_v1",
  ORDERS: "techparts_orders_v1",
  AUTH: "techparts_auth_v1",
  PROMO: "techparts_promo_v1",
  REVIEWS: "techparts_reviews_v1"
};

// Fallback high quality SVG icons for computer parts
function getFallbackSvg(category) {
  const svgs = {
    cpus: `<svg viewBox="0 0 100 100" class="tech-fallback-svg" fill="none" stroke="currentColor" stroke-width="2"><rect x="25" y="25" width="50" height="50" rx="8" fill="#1e293b" stroke="#3b82f6"/><rect x="35" y="35" width="30" height="30" rx="4" fill="#0f172a" stroke="#60a5fa"/><circle cx="50" cy="50" r="6" fill="#3b82f6"/><line x1="30" y1="15" x2="30" y2="25" stroke="#94a3b8" stroke-width="3"/><line x1="40" y1="15" x2="40" y2="25" stroke="#94a3b8" stroke-width="3"/><line x1="50" y1="15" x2="50" y2="25" stroke="#94a3b8" stroke-width="3"/><line x1="60" y1="15" x2="60" y2="25" stroke="#94a3b8" stroke-width="3"/><line x1="70" y1="15" x2="70" y2="25" stroke="#94a3b8" stroke-width="3"/><line x1="30" y1="75" x2="30" y2="85" stroke="#94a3b8" stroke-width="3"/><line x1="40" y1="75" x2="40" y2="85" stroke="#94a3b8" stroke-width="3"/><line x1="50" y1="75" x2="50" y2="85" stroke="#94a3b8" stroke-width="3"/><line x1="60" y1="75" x2="60" y2="85" stroke="#94a3b8" stroke-width="3"/><line x1="70" y1="75" x2="70" y2="85" stroke="#94a3b8" stroke-width="3"/><line x1="15" y1="30" x2="25" y2="30" stroke="#94a3b8" stroke-width="3"/><line x1="15" y1="40" x2="25" y2="40" stroke="#94a3b8" stroke-width="3"/><line x1="15" y1="50" x2="25" y2="50" stroke="#94a3b8" stroke-width="3"/><line x1="15" y1="60" x2="25" y2="60" stroke="#94a3b8" stroke-width="3"/><line x1="15" y1="70" x2="25" y2="70" stroke="#94a3b8" stroke-width="3"/><line x1="75" y1="30" x2="85" y2="30" stroke="#94a3b8" stroke-width="3"/><line x1="75" y1="40" x2="85" y2="40" stroke="#94a3b8" stroke-width="3"/><line x1="75" y1="50" x2="85" y2="50" stroke="#94a3b8" stroke-width="3"/><line x1="75" y1="60" x2="85" y2="60" stroke="#94a3b8" stroke-width="3"/><line x1="75" y1="70" x2="85" y2="70" stroke="#94a3b8" stroke-width="3"/></svg>`,
    gpus: `<svg viewBox="0 0 100 100" class="tech-fallback-svg" fill="none" stroke="currentColor" stroke-width="2"><rect x="15" y="28" width="70" height="44" rx="6" fill="#1e293b" stroke="#3b82f6"/><circle cx="36" cy="50" r="14" fill="#0f172a" stroke="#60a5fa"/><circle cx="36" cy="50" r="4" fill="#3b82f6"/><circle cx="64" cy="50" r="14" fill="#0f172a" stroke="#60a5fa"/><circle cx="64" cy="50" r="4" fill="#3b82f6"/><line x1="8" y1="35" x2="15" y2="35" stroke="#94a3b8" stroke-width="4"/><line x1="8" y1="65" x2="15" y2="65" stroke="#94a3b8" stroke-width="4"/><rect x="25" y="72" width="50" height="6" fill="#eab308"/></svg>`,
    motherboards: `<svg viewBox="0 0 100 100" class="tech-fallback-svg" fill="none" stroke="currentColor" stroke-width="2"><rect x="18" y="18" width="64" height="64" rx="4" fill="#0f172a" stroke="#3b82f6"/><rect x="28" y="28" width="22" height="22" rx="2" fill="#1e293b" stroke="#60a5fa"/><line x1="58" y1="26" x2="58" y2="50" stroke="#94a3b8" stroke-width="3"/><line x1="64" y1="26" x2="64" y2="50" stroke="#94a3b8" stroke-width="3"/><line x1="70" y1="26" x2="70" y2="50" stroke="#94a3b8" stroke-width="3"/><rect x="28" y="60" width="46" height="6" fill="#3b82f6" rx="1"/><rect x="28" y="70" width="30" height="4" fill="#64748b" rx="1"/></svg>`,
    ram: `<svg viewBox="0 0 100 100" class="tech-fallback-svg" fill="none" stroke="currentColor" stroke-width="2"><rect x="15" y="32" width="70" height="34" rx="3" fill="#0f172a" stroke="#3b82f6"/><rect x="22" y="38" width="10" height="18" fill="#1e293b" stroke="#60a5fa"/><rect x="36" y="38" width="10" height="18" fill="#1e293b" stroke="#60a5fa"/><rect x="50" y="38" width="10" height="18" fill="#1e293b" stroke="#60a5fa"/><rect x="64" y="38" width="10" height="18" fill="#1e293b" stroke="#60a5fa"/><line x1="15" y1="66" x2="85" y2="66" stroke="#eab308" stroke-width="3"/></svg>`,
    ssds: `<svg viewBox="0 0 100 100" class="tech-fallback-svg" fill="none" stroke="currentColor" stroke-width="2"><rect x="18" y="36" width="64" height="26" rx="4" fill="#0f172a" stroke="#3b82f6"/><rect x="32" y="42" width="16" height="14" fill="#1e293b" stroke="#60a5fa"/><rect x="52" y="42" width="20" height="14" fill="#1e293b" stroke="#60a5fa"/><path d="M18 42 L12 42 L12 56 L18 56" stroke="#eab308" stroke-width="3"/></svg>`,
    cases: `<svg viewBox="0 0 100 100" class="tech-fallback-svg" fill="none" stroke="currentColor" stroke-width="2"><rect x="26" y="16" width="48" height="68" rx="5" fill="#0f172a" stroke="#3b82f6"/><rect x="34" y="24" width="32" height="46" rx="2" fill="#1e293b" stroke="#60a5fa" stroke-dasharray="3 3"/><circle cx="50" cy="76" r="3" fill="#3b82f6"/><line x1="32" y1="20" x2="40" y2="20" stroke="#94a3b8" stroke-width="2"/></svg>`,
    cooling: `<svg viewBox="0 0 100 100" class="tech-fallback-svg" fill="none" stroke="currentColor" stroke-width="2"><circle cx="50" cy="50" r="34" fill="#0f172a" stroke="#3b82f6"/><circle cx="50" cy="50" r="10" fill="#1e293b" stroke="#60a5fa"/><path d="M50 40 C44 26 56 26 50 16" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/><path d="M60 50 C74 44 74 56 84 50" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/><path d="M50 60 C56 74 44 74 50 84" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/><path d="M40 50 C26 56 26 44 16 50" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/></svg>`,
    "power-supplies": `<svg viewBox="0 0 100 100" class="tech-fallback-svg" fill="none" stroke="currentColor" stroke-width="2"><rect x="20" y="24" width="60" height="52" rx="4" fill="#0f172a" stroke="#3b82f6"/><circle cx="44" cy="50" r="16" fill="#1e293b" stroke="#60a5fa"/><circle cx="44" cy="50" r="4" fill="#3b82f6"/><rect x="68" y="32" width="6" height="12" fill="#64748b"/><rect x="68" y="48" width="6" height="12" fill="#64748b"/><path d="M24 30 L28 30" stroke="#ef4444" stroke-width="2"/></svg>`
  };

  return svgs[category] || svgs.cpus;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TECHPARTS_DATA, STORAGE_KEYS, getFallbackSvg };
}

