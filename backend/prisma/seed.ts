import { PrismaClient, UserRole, FuelType, Transmission, StockStatus, DiscountType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Aurelia Motors database seeding...');

  // 1. Seed Admin User
  const adminPassword = await bcrypt.hash('Admin@12345', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@carshowroom.local' },
    update: {},
    create: {
      email: 'admin@carshowroom.local',
      password: adminPassword,
      firstName: 'Aurelia',
      lastName: 'Administrator',
      phone: '+94 11 258 9000',
      role: UserRole.SUPER_ADMIN,
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Seed Brands
  const brandsData = [
    { name: 'BMW', slug: 'bmw', country: 'Germany', description: 'The ultimate driving machine, combining dynamics and luxury.' },
    { name: 'Porsche', slug: 'porsche', country: 'Germany', description: 'Precision engineered sports cars and electrified performance from Stuttgart.' },
    { name: 'Mercedes-Benz', slug: 'mercedes-benz', country: 'Germany', description: 'The pinnacle of automotive luxury, prestige, and AMG high performance.' },
    { name: 'Audi', slug: 'audi', country: 'Germany', description: 'Vorsprung durch Technik — progressive performance, innovation, and RS engineering.' },
    { name: 'Tesla', slug: 'tesla', country: 'United States', description: 'Accelerating the world transition to sustainable electric performance.' },
    { name: 'Land Rover', slug: 'land-rover', country: 'United Kingdom', description: 'Peerless capability and refined British luxury styling.' },
  ];

  const brandMap = new Map<string, string>();
  for (const b of brandsData) {
    const brand = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: {
        name: b.name,
        country: b.country,
        description: b.description,
      },
      create: b,
    });
    brandMap.set(b.slug, brand.id);
  }
  console.log(`✅ Seeded ${brandsData.length} brands`);

  // 3. Seed Categories
  const categoriesData = [
    { name: 'SUV', slug: 'suv', description: 'Capability, refined luxury and commanding presence', imageUrl: '/images/categories/suv.jpg' },
    { name: 'SEDAN', slug: 'sedan', description: 'Timeless elegance, executive comfort, and poised dynamics', imageUrl: '/images/categories/sedan.jpg' },
    { name: 'SPORTS', slug: 'sports', description: 'Track-bred performance and distilled driving adrenaline', imageUrl: '/images/categories/sports.jpg' },
    { name: 'ELECTRIC', slug: 'electric', description: 'Next-generation electric architecture and instantaneous torque', imageUrl: '/images/categories/electric.jpg' },
  ];

  const categoryMap = new Map<string, string>();
  for (const c of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        description: c.description,
        imageUrl: c.imageUrl,
      },
      create: c,
    });
    categoryMap.set(c.slug, category.id);
  }
  console.log(`✅ Seeded ${categoriesData.length} categories`);

  // 4. Seed Branches
  const branchesData = [
    {
      name: 'Colombo Flagship Salon',
      address: '42 Alfred House Gardens, Kollupitiya',
      city: 'Colombo 03',
      phone: '+94 11 258 9000',
      email: 'colombo@aureliamotors.com',
      openingHours: 'Mon - Sat: 9:00 AM - 7:00 PM | Sun: 10:00 AM - 5:00 PM',
      latitude: 6.8988,
      longitude: 79.8567,
      active: true,
    },
    {
      name: 'Jaffna Heritage Gallery',
      address: '188 Kandy Road',
      city: 'Jaffna',
      phone: '+94 21 222 4500',
      email: 'jaffna@aureliamotors.com',
      openingHours: 'Mon - Sat: 9:00 AM - 6:30 PM',
      latitude: 9.6615,
      longitude: 80.0255,
      active: true,
    },
    {
      name: 'Batticaloa Coastal Studio',
      address: '75 Bar Road, Central Promenade',
      city: 'Batticaloa',
      phone: '+94 65 222 8800',
      email: 'batticaloa@aureliamotors.com',
      openingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
      latitude: 7.7102,
      longitude: 81.6924,
      active: true,
    },
  ];

  const branchIds: string[] = [];
  for (const br of branchesData) {
    const existing = await prisma.branch.findFirst({ where: { name: br.name } });
    if (existing) {
      await prisma.branch.update({
        where: { id: existing.id },
        data: br,
      });
      branchIds.push(existing.id);
    } else {
      const created = await prisma.branch.create({ data: br });
      branchIds.push(created.id);
    }
  }
  console.log(`✅ Seeded ${branchesData.length} showroom salons`);

  // 5. Seed 10 Curated Showroom Vehicles
  const validSlugs = [
    'bmw-m4-competition-coupe-2024',
    'bmw-x5-xdrive40i-2024',
    'porsche-911-carrera-s-2024',
    'porsche-taycan-turbo-s-2024',
    'mercedes-benz-s580-4matic-2024',
    'mercedes-amg-gle53-coupe-2024',
    'audi-rs-etron-gt-2024',
    'audi-rs6-avant-performance-2024',
    'range-rover-sv-lwb-2024',
    'tesla-model-s-plaid-2024',
  ];

  // Remove old vehicles not in the curated 10 set
  await prisma.vehicle.deleteMany({
    where: {
      slug: { notIn: validSlugs },
    },
  });
  const vehicles = [
    {
      slug: 'bmw-m4-competition-coupe-2024',
      name: 'BMW M4 Competition Coupe',
      model: 'M4 Competition',
      variant: 'M xDrive',
      year: 2024,
      price: 128500,
      discountPrice: 122000,
      brandId: brandMap.get('bmw')!,
      categoryId: categoryMap.get('sports')!,
      fuelType: FuelType.PETROL,
      transmission: Transmission.DCT,
      engine: '3.0L BMW M TwinPower Turbo inline 6-cylinder',
      engineCapacity: '3.0L',
      horsepower: 503,
      torque: 650,
      mileage: 1500,
      color: 'Isle of Man Green Metallic',
      doors: 2,
      seats: 4,
      featured: true,
      stockStatus: StockStatus.AVAILABLE,
      description: 'A pure adrenaline machine. The BMW M4 Competition Coupe pairs high-revving M TwinPower Turbo engineering with M xDrive all-wheel traction, carbon fiber roof, and M carbon bucket seats.',
      images: [
        { url: '/images/vehicles/bmw-m4-competition.jpg', isPrimary: true, order: 0, altText: 'BMW M4 Competition Coupe in Isle of Man Green Metallic' },
      ],
      specifications: [
        { category: 'Engine & Performance', name: '0-100 km/h', value: '3.4 seconds' },
        { category: 'Engine & Performance', name: 'Top Speed', value: '290 km/h (M Driver Package)' },
        { category: 'Transmission', name: 'Gearbox', value: '8-Speed M Steptronic with Drivelogic' },
        { category: 'Drivetrain', name: 'Type', value: 'M xDrive AWD with 2WD mode' },
        { category: 'Interior', name: 'Seats', value: 'M Carbon Bucket Seats in Silverstone Merino' },
      ],
    },
    {
      slug: 'bmw-x5-xdrive40i-2024',
      name: 'BMW X5 xDrive40i M Sport',
      model: 'X5 xDrive40i',
      variant: 'M Sport Pro',
      year: 2024,
      price: 135000,
      discountPrice: 129000,
      brandId: brandMap.get('bmw')!,
      categoryId: categoryMap.get('suv')!,
      fuelType: FuelType.HYBRID,
      transmission: Transmission.AUTOMATIC,
      engine: '3.0L BMW TwinPower Turbo inline 6-cylinder MHEV',
      engineCapacity: '3.0L',
      horsepower: 375,
      torque: 520,
      mileage: 3800,
      color: 'Dravit Grey Metallic',
      doors: 5,
      seats: 5,
      featured: true,
      stockStatus: StockStatus.AVAILABLE,
      description: 'Executive commanding presence with supreme agility. Finished in Dravit Grey with Merino Black leather upholstery, Adaptive 2-Axle Air Suspension, and Sky Lounge Panoramic glass roof.',
      images: [
        { url: '/images/vehicles/bmw-x5.jpg', isPrimary: true, order: 0, altText: 'BMW X5 xDrive40i M Sport in Dravit Grey Metallic' },
        { url: '/images/vehicles/bmw-x5-1.jpg', isPrimary: false, order: 1, altText: 'BMW X5 xDrive40i Front Angle' },
      ],
      specifications: [
        { category: 'Engine & Performance', name: '0-100 km/h', value: '5.4 seconds' },
        { category: 'Engine & Performance', name: 'Top Speed', value: '250 km/h' },
        { category: 'Transmission', name: 'Gearbox', value: '8-Speed Steptronic Sport' },
        { category: 'Interior', name: 'Sound System', value: 'Harman Kardon Surround' },
        { category: 'Comfort', name: 'Suspension', value: 'Adaptive 2-Axle Air Suspension' },
      ],
    },
    {
      slug: 'porsche-911-carrera-s-2024',
      name: 'Porsche 911 Carrera S',
      model: '911 Carrera S',
      variant: 'Sport Chrono Package',
      year: 2024,
      price: 185000,
      discountPrice: null,
      brandId: brandMap.get('porsche')!,
      categoryId: categoryMap.get('sports')!,
      fuelType: FuelType.PETROL,
      transmission: Transmission.DCT,
      engine: '3.0L Twin-Turbo Flat-6 Boxer',
      engineCapacity: '3.0L',
      horsepower: 443,
      torque: 530,
      mileage: 1800,
      color: 'GT Silver Metallic',
      doors: 2,
      seats: 4,
      featured: true,
      stockStatus: StockStatus.AVAILABLE,
      description: 'The archetype of the sports car. Featuring Sport Chrono Package with mode switch, PASM Sport Suspension lowered by 10mm, and Sports Exhaust System with black tailpipes.',
      images: [
        { url: '/images/vehicles/porsche-911.jpg', isPrimary: true, order: 0, altText: 'Porsche 911 Carrera S in GT Silver Metallic' },
      ],
      specifications: [
        { category: 'Engine & Performance', name: '0-100 km/h', value: '3.5 seconds' },
        { category: 'Engine & Performance', name: 'Top Speed', value: '308 km/h' },
        { category: 'Brakes', name: 'System', value: 'Porsche Ceramic Composite Brakes (PCCB)' },
        { category: 'Handling', name: 'Suspension', value: 'PASM Sport Suspension (-10mm)' },
      ],
    },
    {
      slug: 'porsche-taycan-turbo-s-2024',
      name: 'Porsche Taycan Turbo S',
      model: 'Taycan Turbo S',
      variant: 'Performance Plus Battery',
      year: 2024,
      price: 215000,
      discountPrice: 205000,
      brandId: brandMap.get('porsche')!,
      categoryId: categoryMap.get('electric')!,
      fuelType: FuelType.ELECTRIC,
      transmission: Transmission.AUTOMATIC,
      engine: 'Permanent Magnet Synchronous Dual Motors (800V)',
      engineCapacity: '93.4 kWh Battery',
      horsepower: 750,
      torque: 1050,
      mileage: 1200,
      color: 'Frozen Blue Metallic',
      doors: 4,
      seats: 5,
      featured: true,
      stockStatus: StockStatus.AVAILABLE,
      description: 'Electrifying Porsche soul. Up to 750 hp overboost power with Launch Control, active aerodynamics, Porsche Torque Vectoring Plus, and ultra-fast 800V charging capability.',
      images: [
        { url: '/images/vehicles/porsche-taycan.jpg', isPrimary: true, order: 0, altText: 'Porsche Taycan Turbo S in Frozen Blue Metallic' },
      ],
      specifications: [
        { category: 'Electric Drive', name: '0-100 km/h', value: '2.8 seconds' },
        { category: 'Electric Drive', name: 'Range (WLTP)', value: '468 km' },
        { category: 'Charging', name: 'Max DC Charge', value: '270 kW (800V System)' },
        { category: 'Chassis', name: 'Handling', value: 'Porsche Dynamic Chassis Control Sport (PDCC)' },
      ],
    },
    {
      slug: 'mercedes-benz-s580-4matic-2024',
      name: 'Mercedes-Benz S 580 4MATIC Sedan',
      model: 'S 580 4MATIC',
      variant: 'Long Wheelbase Executive',
      year: 2024,
      price: 168000,
      discountPrice: null,
      brandId: brandMap.get('mercedes-benz')!,
      categoryId: categoryMap.get('sedan')!,
      fuelType: FuelType.HYBRID,
      transmission: Transmission.AUTOMATIC,
      engine: '4.0L V8 Biturbo with EQ Boost MHEV',
      engineCapacity: '4.0L',
      horsepower: 496,
      torque: 700,
      mileage: 2900,
      color: 'Obsidian Black Metallic',
      doors: 4,
      seats: 5,
      featured: true,
      stockStatus: StockStatus.AVAILABLE,
      description: 'The undisputed benchmark of luxury sedans. First-class rear salon cabin, Burmester High-End 4D Surround Sound, Augmented Reality Head-Up Display, and E-ACTIVE BODY CONTROL suspension.',
      images: [
        { url: '/images/vehicles/mercedes-s-class.jpg', isPrimary: true, order: 0, altText: 'Mercedes-Benz S 580 4MATIC Executive Sedan' },
      ],
      specifications: [
        { category: 'Engine & Performance', name: '0-100 km/h', value: '4.4 seconds' },
        { category: 'Engine & Performance', name: 'Top Speed', value: '250 km/h' },
        { category: 'Audio', name: 'Sound System', value: 'Burmester High-End 4D (31 Speakers)' },
        { category: 'Interior', name: 'Comfort', value: 'Executive Rear Massage Seats with Calf Rest' },
      ],
    },
    {
      slug: 'mercedes-amg-gle53-coupe-2024',
      name: 'Mercedes-AMG GLE 53 4MATIC+ Coupe',
      model: 'GLE 53 Coupe',
      variant: 'AMG Night Edition',
      year: 2024,
      price: 155000,
      discountPrice: 148000,
      brandId: brandMap.get('mercedes-benz')!,
      categoryId: categoryMap.get('suv')!,
      fuelType: FuelType.HYBRID,
      transmission: Transmission.AUTOMATIC,
      engine: 'AMG-enhanced 3.0L Inline-6 Turbo with EQ Boost',
      engineCapacity: '3.0L',
      horsepower: 429,
      torque: 520,
      mileage: 4600,
      color: 'Selenite Grey Metallic',
      doors: 5,
      seats: 5,
      featured: false,
      stockStatus: StockStatus.AVAILABLE,
      description: 'Commanding performance meets expressive coupe styling. AMG RIDE CONTROL+ air suspension, AMG Performance Exhaust, and signature Panamericana radiator grille.',
      images: [
        { url: '/images/vehicles/mercedes-gle.jpg', isPrimary: true, order: 0, altText: 'Mercedes-AMG GLE 53 4MATIC+ Coupe' },
      ],
      specifications: [
        { category: 'Performance', name: '0-100 km/h', value: '5.0 seconds' },
        { category: 'Suspension', name: 'System', value: 'AMG RIDE CONTROL+ Adaptive Air Suspension' },
        { category: 'Drivetrain', name: 'AWD', value: 'AMG Performance 4MATIC+ Variable' },
        { category: 'Wheels', name: 'Alloys', value: '22-inch AMG Cross-Spoke Forged' },
      ],
    },
    {
      slug: 'audi-rs-etron-gt-2024',
      name: 'Audi RS e-tron GT',
      model: 'RS e-tron GT',
      variant: 'Carbon Vorsprung Edition',
      year: 2024,
      price: 165000,
      discountPrice: 158000,
      brandId: brandMap.get('audi')!,
      categoryId: categoryMap.get('electric')!,
      fuelType: FuelType.ELECTRIC,
      transmission: Transmission.AUTOMATIC,
      engine: 'Dual Permanent Magnet Synchronous Motors (quattro)',
      engineCapacity: '93.4 kWh Battery',
      horsepower: 637,
      torque: 830,
      mileage: 2100,
      color: 'Daytona Grey Pearl',
      doors: 4,
      seats: 5,
      featured: true,
      stockStatus: StockStatus.AVAILABLE,
      description: 'Gran Turismo reinterpreted for the electrified future. 800-volt high-speed charging architecture, all-wheel steering, tungsten carbide coated brakes, and carbon fiber styling pack.',
      images: [
        { url: '/images/vehicles/audi-etron-gt.jpg', isPrimary: true, order: 0, altText: 'Audi RS e-tron GT in Daytona Grey' },
      ],
      specifications: [
        { category: 'Electric Drive', name: '0-100 km/h', value: '3.3 seconds (Boost Mode)' },
        { category: 'Electric Drive', name: 'Range (WLTP)', value: '472 km' },
        { category: 'Charging', name: 'Max DC Charge', value: '270 kW' },
        { category: 'Handling', name: 'Steering', value: 'All-Wheel Steering & Quattro Vectoring' },
      ],
    },
    {
      slug: 'audi-rs6-avant-performance-2024',
      name: 'Audi RS6 Avant Performance',
      model: 'RS6 Avant',
      variant: 'Performance Dynamic Package Plus',
      year: 2024,
      price: 172000,
      discountPrice: null,
      brandId: brandMap.get('audi')!,
      categoryId: categoryMap.get('sports')!,
      fuelType: FuelType.PETROL,
      transmission: Transmission.AUTOMATIC,
      engine: '4.0L Twin-Turbocharged TFSI V8',
      engineCapacity: '4.0L',
      horsepower: 621,
      torque: 850,
      mileage: 3100,
      color: 'Nardo Grey',
      doors: 5,
      seats: 5,
      featured: false,
      stockStatus: StockStatus.AVAILABLE,
      description: 'The ultimate supercar disguised as a wagon. 621 horsepower, quattro permanent all-wheel drive with sport differential, RS ceramic brakes, and Valcona leather sport seats.',
      images: [
        { url: '/images/vehicles/audi-rs6.jpg', isPrimary: true, order: 0, altText: 'Audi RS6 Avant Performance in Nardo Grey' },
      ],
      specifications: [
        { category: 'Engine & Performance', name: '0-100 km/h', value: '3.4 seconds' },
        { category: 'Engine & Performance', name: 'Top Speed', value: '305 km/h' },
        { category: 'Exhaust', name: 'System', value: 'RS Sport Exhaust in Gloss Black' },
        { category: 'Brakes', name: 'System', value: 'RS Ceramic Brakes with Anthracite Calipers' },
      ],
    },
    {
      slug: 'range-rover-sv-lwb-2024',
      name: 'Range Rover SV Long Wheelbase',
      model: 'Range Rover SV',
      variant: 'P530 V8 Signature Suite',
      year: 2024,
      price: 245000,
      discountPrice: 235000,
      brandId: brandMap.get('land-rover')!,
      categoryId: categoryMap.get('suv')!,
      fuelType: FuelType.PETROL,
      transmission: Transmission.AUTOMATIC,
      engine: '4.4L Twin-Turbocharged V8',
      engineCapacity: '4.4L',
      horsepower: 523,
      torque: 750,
      mileage: 1900,
      color: 'Santorini Black Metallic',
      doors: 5,
      seats: 4,
      featured: true,
      stockStatus: StockStatus.AVAILABLE,
      description: 'Peerless luxury and craftsmanship. Featuring the exclusive 4-seat SV Signature Suite with electrically deployable Club Table, refrigerator, ceramic controls, and 1600W Meridian Signature Sound.',
      images: [
        { url: '/images/vehicles/range-rover-autobiography.jpg', isPrimary: true, order: 0, altText: 'Range Rover SV Long Wheelbase in Santorini Black' },
      ],
      specifications: [
        { category: 'Engine & Performance', name: '0-100 km/h', value: '4.6 seconds' },
        { category: 'Capability', name: 'Wading Depth', value: '900 mm' },
        { category: 'Audio', name: 'Meridian Signature', value: '35 Speakers (1600W)' },
        { category: 'Interior', name: 'Suite', value: 'SV 4-Seat Signature Executive Suite' },
      ],
    },
    {
      slug: 'tesla-model-s-plaid-2024',
      name: 'Tesla Model S Plaid',
      model: 'Model S Plaid',
      variant: 'Tri-Motor AWD Track Package',
      year: 2024,
      price: 132000,
      discountPrice: 125000,
      brandId: brandMap.get('tesla')!,
      categoryId: categoryMap.get('electric')!,
      fuelType: FuelType.ELECTRIC,
      transmission: Transmission.AUTOMATIC,
      engine: 'Tri-Motor All-Wheel Drive with Carbon-Sleeved Rotors',
      engineCapacity: '100 kWh Battery',
      horsepower: 1020,
      torque: 1420,
      mileage: 1200,
      color: 'Solid Black',
      doors: 4,
      seats: 5,
      featured: true,
      stockStatus: StockStatus.AVAILABLE,
      description: 'Beyond ludicrous speed. 1,020 horsepower producing 0-100 km/h in 2.1 seconds. Equipped with Yoke steering, 17-inch cinematic display, Carbon Ceramic brake kit, and Full Self-Driving capability.',
      images: [
        { url: '/images/vehicles/tesla-model-s.jpg', isPrimary: true, order: 0, altText: 'Tesla Model S Plaid Tri-Motor in Solid Black' },
      ],
      specifications: [
        { category: 'Acceleration', name: '0-100 km/h', value: '2.1 seconds' },
        { category: 'Top Speed', name: 'Maximum', value: '322 km/h' },
        { category: 'Electric Range', name: 'EPA Estimated', value: '600 km' },
        { category: 'Autopilot', name: 'Hardware', value: 'Full Self-Driving (FSD) Hardware 4.0' },
      ],
    },
  ];

  for (let i = 0; i < vehicles.length; i++) {
    const v = vehicles[i];
    const { images, specifications, ...vehData } = v;

    const vehicle = await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: {
        ...vehData,
      },
      create: {
        ...vehData,
      },
    });

    // Replace images idempotently
    await prisma.vehicleImage.deleteMany({ where: { vehicleId: vehicle.id } });
    await prisma.vehicleImage.createMany({
      data: images.map((img) => ({
        vehicleId: vehicle.id,
        url: img.url,
        altText: img.altText,
        isPrimary: img.isPrimary,
        order: img.order,
      })),
    });

    // Replace specifications idempotently
    await prisma.vehicleSpecification.deleteMany({ where: { vehicleId: vehicle.id } });
    await prisma.vehicleSpecification.createMany({
      data: specifications.map((spec) => ({
        vehicleId: vehicle.id,
        category: spec.category,
        name: spec.name,
        value: spec.value,
      })),
    });

    // Assign inventory item distributed across salon branches
    const branchIndex = i % branchIds.length;
    const branchId = branchIds[branchIndex] || branchIds[0];

    await prisma.inventoryItem.upsert({
      where: { vin: `VIN-${vehicle.slug.toUpperCase().replace(/-/g, '')}` },
      update: {
        branchId: branchId,
        status: StockStatus.AVAILABLE,
      },
      create: {
        vehicleId: vehicle.id,
        branchId: branchId,
        vin: `VIN-${vehicle.slug.toUpperCase().replace(/-/g, '')}`,
        quantity: 1,
        available: 1,
        status: StockStatus.AVAILABLE,
      },
    });
  }
  console.log(`✅ Seeded ${vehicles.length} curated showroom vehicles with exact photos & specs`);

  // 6. Seed Offers
  const offers = [
    {
      title: 'Spring Allocation Privilege',
      slug: 'spring-allocation-privilege',
      description: 'Enjoy preferential financing rates starting at 4.9% APR alongside complimentary 3-year scheduled servicing on all certified allocations.',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 5,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-06-30'),
      active: true,
      bannerUrl: '/images/hero/hero-main.jpg',
    },
    {
      title: 'Electrified Grand Tour Incentive',
      slug: 'electrified-grand-tour-incentive',
      description: 'Complimentary high-speed home charging salon installation and 20,000 km public charging credit for all electric allocations.',
      discountType: DiscountType.FIXED,
      discountValue: 5000,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31'),
      active: true,
      bannerUrl: '/images/vehicles/audi-etron-gt.jpg',
    },
  ];

  for (const o of offers) {
    await prisma.offer.upsert({
      where: { slug: o.slug },
      update: {
        title: o.title,
        description: o.description,
        discountType: o.discountType,
        discountValue: o.discountValue,
        startDate: o.startDate,
        endDate: o.endDate,
        active: o.active,
        bannerUrl: o.bannerUrl,
      },
      create: o,
    });
  }
  console.log(`✅ Seeded ${offers.length} promotional programs`);

  console.log('🎉 Aurelia Motors database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
