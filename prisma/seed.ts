/**
 * Travel Planet — Database Seed Script
 * Aligned with 20_SEED_DATA.md & 07_ADMIN_OS.md
 * 
 * Rules:
 * - Admin: Amal Babu (Super Admin)
 * - All external connectors initialized as NOT_CONFIGURED or DEMO
 * - Seeded demo data cleanly isolated behind DEMO flags
 */

import { PrismaClient, UserRoleType, ProductCategory, ConnectorStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Travel Planet Foundation Data...');

  // 1. Organization & Super Admin (Amal Babu)
  const org = await prisma.organization.upsert({
    where: { id: 'org_tp_hq' },
    update: {},
    create: {
      id: 'org_tp_hq',
      name: 'Travel Planet Global HQ',
      legalName: 'Travel Planet International Pvt Ltd',
      taxId: '32AABCT0000A1Z5',
      type: 'OPERATOR',
      status: 'ACTIVE',
    },
  });

  const superAdmin = await prisma.user.upsert({
    where: { email: 'amal.babu@travelplanet.com' },
    update: {},
    create: {
      email: 'amal.babu@travelplanet.com',
      fullName: 'Amal Babu',
      role: UserRoleType.SUPER_ADMIN,
      organizationId: org.id,
      phone: '+91 98460 00000',
      isActive: true,
    },
  });

  console.log(`Created Super Admin: ${superAdmin.fullName} (${superAdmin.email})`);

  // 2. Demo Destinations
  const destinationsData = [
    {
      countryCode: 'AE',
      countryName: 'United Arab Emirates',
      currency: 'AED',
      slug: 'dubai',
      name: 'Dubai',
      headline: 'Futuristic Luxury & Arabian Charm',
      description: 'Experience ultra-modern architecture, desert safaris, and premier shopping.',
      heroImageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      isDomestic: false,
      isFeatured: true,
      latitude: 25.2048,
      longitude: 55.2708,
    },
    {
      countryCode: 'ID',
      countryName: 'Indonesia',
      currency: 'IDR',
      slug: 'bali',
      name: 'Bali',
      headline: 'Island of the Gods',
      description: 'Tropical beaches, spiritual temples, and vibrant cultural heritage.',
      heroImageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      isDomestic: false,
      isFeatured: true,
      latitude: -8.4095,
      longitude: 115.1889,
    },
    {
      countryCode: 'SG',
      countryName: 'Singapore',
      currency: 'SGD',
      slug: 'singapore',
      name: 'Singapore',
      headline: 'The Garden City of Tomorrow',
      description: 'World-class gastronomy, futuristic gardens, and multicultural vitality.',
      heroImageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
      isDomestic: false,
      isFeatured: true,
      latitude: 1.3521,
      longitude: 103.8198,
    },
    {
      countryCode: 'TH',
      countryName: 'Thailand',
      currency: 'THB',
      slug: 'thailand',
      name: 'Thailand',
      headline: 'Land of Smiles & Azure Waters',
      description: 'From bustling Bangkok streets to Phuket paradise beaches.',
      heroImageUrl: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa',
      isDomestic: false,
      isFeatured: true,
      latitude: 15.8700,
      longitude: 100.9925,
    },
    {
      countryCode: 'IN',
      countryName: 'India',
      currency: 'INR',
      slug: 'kashmir',
      name: 'Kashmir',
      headline: 'Paradise on Earth',
      description: 'Snow-capped Himalayan peaks, tranquil Dal Lake shikaras, and alpine valleys.',
      heroImageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d',
      isDomestic: true,
      isFeatured: true,
      latitude: 34.0837,
      longitude: 74.7973,
    },
    {
      countryCode: 'IN',
      countryName: 'India',
      currency: 'INR',
      slug: 'kerala',
      name: 'Kerala',
      headline: "God's Own Country",
      description: 'Serene backwaters, emerald tea estates in Munnar, and Ayurvedic wellness.',
      heroImageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
      isDomestic: true,
      isFeatured: true,
      latitude: 10.8505,
      longitude: 76.2711,
    },
  ];

  for (const dest of destinationsData) {
    const country = await prisma.country.upsert({
      where: { code: dest.countryCode },
      update: {},
      create: {
        code: dest.countryCode,
        name: dest.countryName,
        currency: dest.currency,
      },
    });

    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: {},
      create: {
        slug: dest.slug,
        name: dest.name,
        headline: dest.headline,
        description: dest.description,
        countryId: country.id,
        heroImageUrl: dest.heroImageUrl,
        isDomestic: dest.isDomestic,
        isFeatured: dest.isFeatured,
        latitude: dest.latitude,
        longitude: dest.longitude,
      },
    });
  }

  console.log(`Seeded ${destinationsData.length} destinations.`);

  // 3. Demo Connectors (Marked NOT_CONFIGURED)
  const connectors = [
    { code: 'AKBAR', name: 'Akbar Travels API', category: 'INVENTORY', capabilities: ['FLIGHT_SEARCH', 'HOTEL_SEARCH', 'B2B_BOOKING'] },
    { code: 'BOOKING', name: 'Booking.com Partner', category: 'INVENTORY', capabilities: ['HOTEL_SEARCH', 'AVAILABILITY', 'RATES'] },
    { code: 'RAZORPAY', name: 'Razorpay Payment Gateway', category: 'PAYMENT', capabilities: ['PAYMENT_COLLECTION', 'REFUND', 'WEBHOOKS'] },
    { code: 'CASHFREE', name: 'Cashfree Payments', category: 'PAYMENT', capabilities: ['PAYMENT_COLLECTION', 'PAYOUTS', 'WEBHOOKS'] },
    { code: 'PAYU', name: 'PayU Gateway', category: 'PAYMENT', capabilities: ['PAYMENT_COLLECTION', 'VERIFICATION'] },
    { code: 'CCAVENUE', name: 'CCAvenue Merchant Gateway', category: 'PAYMENT', capabilities: ['PAYMENT_COLLECTION'] },
    { code: 'GOOGLE_MAPS', name: 'Google Maps Platform', category: 'COMMUNICATION', capabilities: ['GEOCODING', 'PLACES_SEARCH', 'DISTANCE_MATRIX'] },
    { code: 'MSG91', name: 'MSG91 Communications', category: 'COMMUNICATION', capabilities: ['SMS_NOTIFICATIONS', 'WHATSAPP_NOTIFICATIONS'] },
    { code: 'AMADEUS', name: 'Amadeus Travel Platform', category: 'INVENTORY', capabilities: ['GDS_FLIGHTS', 'HOTELS', 'ACTIVITIES'] },
    { code: 'HOTELBEDS', name: 'Hotelbeds Bedbank', category: 'INVENTORY', capabilities: ['HOTEL_AVAILABILITY', 'TRANSFERS'] },
    { code: 'ZOHO_BOOKS', name: 'Zoho Books ERP', category: 'ACCOUNTING', capabilities: ['INVOICING', 'TAX_RECONCILIATION'] },
    { code: 'TALLY', name: 'TallyPrime Connector', category: 'ACCOUNTING', capabilities: ['LEDGER_SYNC', 'GST_REPORTING'] },
  ];

  for (const c of connectors) {
    await prisma.connector.upsert({
      where: { code: c.code },
      update: {},
      create: {
        code: c.code,
        name: c.name,
        category: c.category,
        status: ConnectorStatus.NOT_CONFIGURED,
        capabilities: c.capabilities,
        healthScore: 100.0,
      },
    });
  }

  console.log(`Seeded ${connectors.length} connectors in NOT_CONFIGURED state.`);
  console.log('Foundation seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
