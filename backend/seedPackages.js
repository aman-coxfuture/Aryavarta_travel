// backend/seedPackages.js
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const mongoose = require("mongoose");
const Package = require("./models/Package");

const standardInclusions = [
  "Accommodation in handpicked 3-star boutique hotels, luxury Swiss tents, and homestays",
  "Daily Breakfast & Dinner at all hotels and campsites",
  "Dedicated private Innova Crysta / Scorpio 4x4 vehicle for all transfers and sightseeing",
  "Inner Line Permits (ILP), Wildlife Sanctuary fees & Ladakh Ecology fees",
  "Airport pick-up and drop-off in Leh in private vehicle",
  "24x7 Portable Medical Oxygen cylinder on-board in vehicle",
  "Experienced local mountain driver cum guide with all driver allowances, fuel, and parking",
  "First aid kit and pulse oximeter monitoring throughout the journey"
];

const standardExclusions = [
  "Airfare to and from Leh (Kushok Bakula Rimpochee Airport)",
  "Lunches, mid-day snacks, and personal beverages",
  "Double-humped camel safari ride charges at Hunder (approx. ₹350 per person)",
  "Monastery entry fees and personal camera charges (approx. ₹30-50 per monastery)",
  "Personal expenses, laundry, tips, and personal travel/medical insurance",
  "Costs arising due to unexpected road blockages, landslides, or flight cancellations"
];

const packagesToSeed = [
  {
    title: "The Classic Ladakh",
    slug: "classic-ladakh",
    shortDescription: "Experience the quintessential highlights of Ladakh in 5 days, from Khardung La and Hunder sand dunes to the mystical shores of Pangong Lake.",
    fullDescription: "The Classic Ladakh 5-day expedition is meticulously crafted for travelers seeking the quintessential Himalayan journey. Cross Khardung La—one of the world's highest motorable passes—into the breathtaking desert oasis of Nubra Valley. Ride double-humped Bactrian camels on Hunder's silver sand dunes, explore the towering Maitreya Buddha at Diskit Monastery, and journey along the Shyok River gorge to witness the surreal color-shifting panorama of Pangong Tso before returning across Chang La to Leh.",
    durationDays: 5,
    durationNights: 4,
    pricePerAdult: 24999,
    route: ["Leh", "Nubra Valley", "Pangong Lake", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Arrive Leh (Rest & Acclimatization)",
        description: "Arrive at Kushok Bakula Rimpochee Airport, Leh. Traditional welcome and transfer to hotel. Full day of mandatory rest and hydration for high-altitude acclimatization (11,500 ft). Evening leisure stroll in Leh Main Bazaar if feeling comfortable.",
        stay: "Hotel in Leh",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Leh Local Sightseeing (Hall of Fame, Magnetic Hill, Sangam, Shanti Stupa)",
        description: "Full day sightseeing around Leh. Pay homage to martyrs at Hall of Fame war museum, experience the gravity-defying Magnetic Hill, witness the confluence of Indus and Zanskar rivers at Sangam, visit Gurudwara Pathar Sahib, and enjoy sunset panoramic views of Leh town from Shanti Stupa.",
        stay: "Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La (Diskit Monastery, Hunder Sand Dunes, Camel Ride)",
        description: "Drive north across the legendary Khardung La Pass (17,582 ft) with sweeping Karakoram views. Descend into Nubra Valley, visit the 14th-century Diskit Monastery with its majestic 106-ft Maitreya Buddha, and enjoy double-humped Bactrian camel safaris amidst the silver sand dunes of Hunder.",
        stay: "Deluxe Camp / Hotel in Hunder",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Nubra to Pangong Lake via Shyok River route",
        description: "Drive along the wild canyon route of Shyok River towards the world-famous Pangong Tso (14,270 ft). Arrive at the mesmerizing blue waters spanning across the Indo-Tibetan border. Experience sunset over the lake and crystal-clear Himalayan stargazing by night.",
        stay: "Lakeside Camp / Cottage at Pangong",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Pangong to Leh via Chang La Pass. Departure",
        description: "Witness a sunrise over Pangong Lake followed by breakfast. Drive back to Leh crossing the formidable Chang La Pass (17,688 ft). Stop at Thiksey Monastery and Shey Palace en route. Transfer to Leh airport for departure flight with unforgettable memories.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: standardInclusions,
    exclusions: standardExclusions,
    bestSeason: ["May", "June", "July", "August", "September", "October"],
    altitudeInfo: "17,582 ft (Khardung La)",
    permitRequired: true,
    coverImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  },
  {
    title: "Grand Ladakh Circuit",
    slug: "grand-ladakh-circuit",
    shortDescription: "The ultimate 9-day high-altitude odyssey across Nubra, Turtuk, Pangong, the Dark Sky Reserve of Hanle, world-record Umling La (19,024 ft), and sapphire Tso Moriri.",
    fullDescription: "The Grand Ladakh Circuit is an epic 9-day Himalayan expedition designed for true explorers. This circuit covers every iconic horizon of Ladakh: traversing Khardung La to the sand dunes of Nubra, journeying to the Balti border village of Turtuk, hugging the Shyok river to Pangong Lake, venturing deep into the pristine Changthang plateau to Hanle—home of the Indian Astronomical Observatory and Dark Sky Sanctuary—conquering Umling La at 19,024 ft (the world's highest motorable road), and unwinding by the sacred high wetland of Tso Moriri before returning through Chumathang hot springs.",
    durationDays: 9,
    durationNights: 8,
    pricePerAdult: 45999,
    route: ["Leh", "Nubra (Turtuk)", "Pangong", "Hanle", "Umling La", "Tso Moriri", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Arrive Leh. Rest.",
        description: "Arrive at Leh Airport (11,500 ft). Traditional Khatak welcome and transfer to hotel. Full day dedicated to restful acclimatization to adapt to the thin Himalayan air. Hydrate well.",
        stay: "Hotel in Leh",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Leh to Nubra via Khardung La",
        description: "Embark on the northern trail across Khardung La Pass (17,582 ft). Marvel at snow-clad Karakoram peaks. Descend into Nubra Valley, visit Diskit Monastery & the grand Maitreya Buddha statue, and experience double-humped camel riding on Hunder sand dunes at dusk.",
        stay: "Deluxe Camp / Hotel in Nubra",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Nubra to Turtuk (Indo-Pak border village) and back",
        description: "Excursion to the border enclave of Turtuk, opened to travelers only in 2010. Explore the ancient Balti heritage, wooden mosques, royal palace of the Yabgo dynasty, and lush apricot orchards nestled right by the Line of Control. Return to Nubra.",
        stay: "Deluxe Camp / Hotel in Nubra",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Nubra to Pangong via Shyok route",
        description: "Drive along the untamed Shyok River gorge through Agham. Ascend toward the world's most dramatic saltwater alpine lake, Pangong Tso (14,270 ft). Stroll along the turquoise shoreline as shadows lengthen across the surrounding Tibetan mountains.",
        stay: "Lakeside Camp / Cottage in Pangong",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Pangong to Hanle via Changthang Valley (Dark Sky Reserve)",
        description: "Off-road drive across the expansive, windswept plains of Changthang via Tsaga La pass, spotting Kiang (Tibetan wild ass) and golden eagles. Reach Hanle village, designated as India's premier Dark Sky Reserve. Experience celestial stargazing and view the Milky Way with pristine zero light pollution.",
        stay: "Guesthouse / Homestay in Hanle",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Hanle to Umling La (World's highest motorable road) and back",
        description: "The pinnacle expedition day! Ascend the engineering marvel of Umling La Pass, standing proudly at 19,024 ft (higher than Everest Base Camp). Receive your summit photo at the world's highest motorable road marker. Return to Hanle for an evening visit to the historic 17th-century Hanle Gompa.",
        stay: "Guesthouse / Homestay in Hanle",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 7,
        title: "Hanle to Tso Moriri (Korzok village)",
        description: "Traverse high alpine plateaus towards the serene sapphire waters of Tso Moriri Lake (15,075 ft). Check in at the remote lakeside settlement of Korzok. Visit the ancient Korzok Monastery and observe Changpa nomadic shepherds herding famous Pashmina goats.",
        stay: "Lakeside Camp / Hotel in Tso Moriri (Korzok)",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Tso Moriri to Leh via Chumathang Hot Springs",
        description: "Enjoy dawn light glistening on Tso Moriri. Journey back towards Leh through the Indus River Valley. Stop at Chumathang's natural sulfur hot springs and explore Hemis or Thiksey monastery before settling into your Leh hotel.",
        stay: "Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 9,
        title: "Departure from Leh",
        description: "After an early breakfast, transfer to Leh Kushok Bakula Rimpochee Airport for onward flight with lifelong memories of the ultimate high-altitude frontier.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: standardInclusions,
    exclusions: standardExclusions,
    bestSeason: ["June", "July", "August", "September", "October"],
    altitudeInfo: "19,024 ft (Umling La)",
    permitRequired: true,
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  },
  {
    title: "Ultimate Comprehensive Tour",
    slug: "ultimate-comprehensive-tour",
    shortDescription: "The complete 10-day immersive Ladakh journey featuring heritage monasteries, Sham Valley, Nubra, Turtuk, Pangong, Dark Sky Hanle, and Tso Moriri.",
    fullDescription: "The Ultimate Comprehensive Tour is an all-encompassing 10-day journey designed for travelers who wish to experience the complete spectrum of Ladakh without feeling rushed. Combining royal cultural heritage, spiritual gompas, high mountain passes, remote border settlements, star-studded dark skies, and both jewel-toned alpine lakes (Pangong Tso and Tso Moriri), this itinerary balances acclimatization with unforgettable Himalayan exploration.",
    durationDays: 10,
    durationNights: 9,
    pricePerAdult: 36000,
    route: ["Leh", "Sham Valley", "Nubra", "Pangong", "Tso Moriri", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Arrive Leh (Acclimatization)",
        description: "Arrive at Leh Airport (11,500 ft). Warm Ladakhi welcome and transfer to hotel. Rest throughout the day with plenty of hydration to acclimatize. Gentle evening walk in Leh Main Bazaar.",
        stay: "Hotel in Leh",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Leh Sham Valley Sightseeing (Hall of Fame, Magnetic Hill, Sangam)",
        description: "Explore the scenic Sham Valley along the Leh-Srinagar highway. Visit the Hall of Fame army museum, witness gravity-defying cars at Magnetic Hill, offer prayers at historic Gurudwara Pathar Sahib, and admire the dramatic Sangam confluence of Indus and Zanskar rivers.",
        stay: "Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Leh Monasteries & Palaces (Thiksey, Hemis, Shanti Stupa)",
        description: "Cultural exploration of Ladakh's most revered monuments. Visit Thiksey Monastery (styled after Lhasa's Potala Palace), the grand wealth of Hemis Monastery (Ladakh's largest gompa), Shey Palace ruins, and view the sunset from Shanti Stupa.",
        stay: "Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Leh to Nubra Valley via Khardung La",
        description: "Drive over the high mountain pass Khardung La (17,582 ft). Arrive in Nubra Valley and check in at Hunder/Diskit. Explore Diskit Monastery and marvel at the 106-ft Maitreya Buddha, followed by sunset double-humped camel rides on the silver sand dunes.",
        stay: "Deluxe Camp / Hotel in Hunder / Diskit",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Nubra Valley to Turtuk Excursion",
        description: "Full-day trip to Turtuk, the last northern outpost of India in the Baltistan region. Stroll through emerald apricot orchards, cross suspension bridges, interact with warm Balti villagers, and discover the royal palace of the local King.",
        stay: "Deluxe Camp / Hotel in Hunder",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Nubra Valley to Pangong Tso via Shyok",
        description: "Travel through the dramatic riverbed gorge of Shyok to the turquoise shores of Pangong Lake (14,270 ft). Witness the breathtaking color shifts of the lake as the sun sets over the Tibetan plateau.",
        stay: "Lakeside Cottage / Camp at Pangong",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 7,
        title: "Pangong Tso to Hanle (Dark Sky Sanctuary)",
        description: "Scenic drive through the vast Changthang plateau via Chushul and Tsaga La pass. Arrive in the remote celestial haven of Hanle. Stargaze under India's certified Dark Sky Sanctuary, viewing stellar nebulae and the Milky Way.",
        stay: "Guesthouse in Hanle",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Hanle to Tso Moriri",
        description: "Depart Hanle and drive across wild nomadic highlands towards Tso Moriri (15,075 ft). Spot Tibetan wild asses (Kiang) and migratory birds. Arrive in Korzok village by the sapphire waters of the lake.",
        stay: "Hotel / Camp in Korzok",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 9,
        title: "Tso Moriri back to Leh via Chumathang",
        description: "Early morning lakeside stroll in Korzok. Drive back to Leh via Mahe Bridge and Chumathang geothermal hot springs. Evening free for souvenir shopping in Leh.",
        stay: "Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 10,
        title: "Departure from Leh",
        description: "Enjoy breakfast at your hotel. Transfer to Leh airport for departure flight with cherished memories of the complete Ladakh circuit.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: standardInclusions,
    exclusions: standardExclusions,
    bestSeason: ["May", "June", "July", "August", "September", "October"],
    altitudeInfo: "17,582 ft (Khardung La & Chang La)",
    permitRequired: true,
    coverImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  }
];

async function seedPackages() {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aryavarta_travel";

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected to: ${mongoose.connection.name || mongoUri}`);

    console.log(`\n🌱 Starting to seed ${packagesToSeed.length} Ladakh travel packages...`);

    for (const pkg of packagesToSeed) {
      // Upsert: update existing or insert if not present
      const result = await Package.findOneAndUpdate(
        { slug: pkg.slug },
        pkg,
        { upsert: true, returnDocument: 'after', runValidators: true }
      );
      console.log(`   ✨ Seeded Package: "${result.title}" (${result.durationDays}D / ${result.durationNights}N) - Slug: /packages/${result.slug}`);
    }

    console.log("\n🎉 All 3 packages successfully seeded into the database!");
    await mongoose.disconnect();
    console.log("👋 MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding packages:", error);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
}

seedPackages();
