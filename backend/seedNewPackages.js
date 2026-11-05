// backend/seedNewPackages.js
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const mongoose = require("mongoose");
const Package = require("./models/Package");

// Standard Inclusions for High-Altitude Guided Tours
const standardTourInclusions = [
  "Accommodation in handpicked 3-Star boutique hotels and luxury heated Swiss cottages / camps",
  "Daily Breakfast & Dinner at all hotels and campsites",
  "Dedicated private Innova Crysta / Scorpio 4x4 vehicle for all transfers and sightseeing",
  "Inner Line Permits (ILP), Wildlife Sanctuary fees & Ladakh Ecology passes pre-arranged",
  "Airport pick-up and drop-off in Leh in private vehicle",
  "24x7 Portable Medical Oxygen cylinder on-board in vehicle with pulse oximeter monitoring",
  "Experienced local Ladakhi mountain driver cum guide with all driver allowances, fuel, and toll taxes",
  "Complimentary traditional Ladakhi Khatak welcome and 24x7 local destination helpline"
];

const standardTourExclusions = [
  "Airfare to and from Leh (Kushok Bakula Rimpochee Airport)",
  "Lunches, mid-day snacks, and personal beverages",
  "Monastery entry fees and camera tickets (approx. ₹30-50 per monastery)",
  "Personal expenses, laundry, tips, and personal travel/medical insurance",
  "Costs arising due to unforeseen flight delays, landslides, or road blockages"
];

// Inclusions tailored for Trekking Expeditions
const trekInclusions = [
  "Pre-trek and post-trek hotel / guesthouse stays in Leh with breakfast",
  "Homestays with local Ladakhi families and high-altitude alpine dome tents during the trek",
  "All nutritious vegetarian meals on trek (Breakfast, Packed Lunch, Hot Evening Tea/Snacks, Dinner)",
  "IMF certified local Ladakhi mountain trekking guide & experienced high-altitude cook",
  "Ponies / mules with horseman to carry common camping gear, rations, and main luggage (up to 12 kg per trekker)",
  "All wildlife sanctuary fees, forest permits, and environmental camping fees",
  "Trekking safety kit including high-altitude medical kit, pulse oximeter, and emergency oxygen cylinder",
  "Private surface transfers from Leh to the roadhead and back from trek ending point"
];

const trekExclusions = [
  "Airfare to/from Leh",
  "Personal trekking gear (trekking poles, personal daypack, thermal innerwear, trekking boots)",
  "Personal horse / porter for carrying extra luggage beyond allowance",
  "Meals during free days in Leh (except breakfast)",
  "Tips to trekking guides, cook, and horsemen",
  "Emergency helicopter evacuation or search & rescue expenses"
];

const newPackagesToSeed = [
  // 1. Honeymoon Special
  {
    title: "Romantic Leh Ladakh Honeymoon Tour",
    slug: "honeymoon-special-tour",
    shortDescription: "An enchanting 8-day romantic escape crafted for couples. Celebrate your love amidst the silver dunes of Hunder, apricot blossoms of Turtuk, and starlit shores of Pangong Lake.",
    fullDescription: `Celebrate the beginning of your forever in the magical trans-Himalayan realm of Ladakh. The Romantic Leh Ladakh Honeymoon Tour is an exquisitely tailored 8-day journey combining intimate luxury, serene nature, and unforgettable moments for couples.

Traverse the legendary Khardung La Pass into the dramatic Nubra Valley, hand-in-hand. Ride double-humped Bactrian camels through the rolling sand dunes of Hunder at golden hour, wander along historic apricot orchards in the Balti border haven of Turtuk, and unwind in the peaceful oasis of Sumur near the Siachen gateway. Spend a dreamlike night at Pangong Tso in a private lakeside cottage, warming up by a personal bonfire under one of the world's clearest starry skies.

### Romantic Highlights & Inclusions:
- Complimentary room flower decoration & welcome cake in Leh
- Candle-lit romantic dinner for two in Leh and Nubra Valley
- Sunset double-humped Bactrian camel safari in Hunder sand dunes
- Exclusive couple photoshoot stops at Pangong Lake & Khardung La Pass
- Traditional Ladakhi herbal tea & souvenir gift hamper for newlyweds

### Tiered Pricing Structure (Per Person):
- **2 Adults (Private Honeymoon Couple - Innova Crysta):** ₹42,500 per person
- **4 Adults (Couples Travelling Together - Innova Crysta):** ₹33,800 per person
- **6 Adults (Family & Friends Group):** ₹27,500 per person
- **Upgrade to 4-Star Luxury Suite & Heated Swiss Glamping:** +₹6,500 per person`,
    durationDays: 8,
    durationNights: 7,
    pricePerAdult: 42500,
    route: ["Leh", "Nubra Valley", "Turtuk", "Sumur", "Pangong Lake", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Romantic Welcome & Acclimatization in Leh",
        description: "Arrive at Leh Airport (11,500 ft) where your private chauffeur welcomes you with traditional Ladakhi Khataks. Check in to your boutique honeymoon suite. Dedicate this day to calm rest, gentle hydration, and adjusting to the high altitude. In the evening, enjoy a candle-lit dinner with panoramic mountain views.",
        stay: "Boutique Heritage Hotel in Leh",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Leh Local Highlights & Sunset at Shanti Stupa",
        description: "A leisurely morning exploring the spiritual essence of Leh. Visit the iconic Hall of Fame, marvel at the gravity-defying Magnetic Hill, and witness the turquoise confluence of Indus and Zanskar rivers at Sangam. Conclude with a romantic golden sunset at Shanti Stupa overlooking the Stok Kangri range.",
        stay: "Boutique Heritage Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La (Camel Safari in Hunder)",
        description: "Embark on an exhilarating drive over Khardung La Pass (17,582 ft)—one of the world's highest motorable passes. Descend into the picturesque Nubra Valley, visit the towering 106-ft Maitreya Buddha at Diskit Gompa, and enjoy a romantic double-humped Bactrian camel ride across Hunder's silver sand dunes.",
        stay: "Luxury Swiss Camp / Cottage in Hunder",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Turtuk Excursion - The Balti Apricot Village",
        description: "Take a scenic drive to Turtuk, an idyllic village opened to travelers in 2010. Walk hand-in-hand through lush apricot and walnut orchards along crystalline brooks. Visit the 16th-century Balti Heritage Museum and savor fresh local apricots while soaking in views of K2's peripheral peaks.",
        stay: "Luxury Swiss Camp / Cottage in Hunder",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Sumur Valley & Gateway to Siachen Base",
        description: "Drive to the serene and quieter part of Nubra Valley—Sumur. Visit the tranquil 180-year-old Samstanling Monastery with its vibrant silk thangkas. Journey towards the scenic Siachen river belt and Panamik's rejuvenating natural hot sulfur springs. Enjoy a peaceful evening under the stars in Sumur.",
        stay: "Deluxe Resort / Camp in Sumur",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Sumur to Pangong Lake via Shyok River Canyon",
        description: "Drive along the rugged canyon road following the wild Shyok River directly to the world-famous Pangong Tso (14,270 ft). Witness the lake change from turquoise to deep cobalt blue as the afternoon sun shifts. Spend a cozy evening with a personal lakeside bonfire and starlight photography.",
        stay: "Lakeside Cottage / Deluxe Camp at Pangong",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 7,
        title: "Sunrise at Pangong Lake & Return to Leh via Chang La",
        description: "Wake early to witness a breathtaking sunrise over the glass-like waters of Pangong. After a hearty breakfast, drive back to Leh crossing the mighty Chang La Pass (17,688 ft). Stop at the historic Thiksey Monastery en route. Evening at leisure for souvenir shopping in Leh Main Bazaar.",
        stay: "Boutique Heritage Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Farewell Leh & Airport Departure",
        description: "Savor a leisurely breakfast together before your private transfer to Kushok Bakula Rimpochee Airport. Depart with unforgettable romantic memories and a heart full of Himalayan magic.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: [
      ...standardTourInclusions,
      "Honeymoon special cake & room floral welcome setup on arrival night",
      "One romantic candle-lit dinner with complimentary bottle of sparkling non-alcoholic juice",
      "Double-humped camel safari ride passes for two in Hunder dunes",
      "Evening bonfire setup at Pangong Lake cottage (subject to weather)"
    ],
    exclusions: standardTourExclusions,
    bestSeason: ["May", "June", "July", "August", "September", "October"],
    altitudeInfo: "17,582 ft (Khardung La)",
    permitRequired: true,
    coverImage: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  },

  // 2. Special Family Tour
  {
    title: "Special Family Tour Package",
    slug: "special-family-tour",
    shortDescription: "A comprehensive 8-day high-altitude family tour featuring Nubra, Turtuk, Pangong Lake, and the Dark Sky Sanctuary of Hanle with utmost safety and comfort for all generations.",
    fullDescription: `Crafted specifically with children, parents, and grandparents in mind, the Special Family Tour Package delivers an awe-inspiring exploration of Ladakh without feeling rushed. This itinerary combines iconic destinations—Nubra Valley, Turtuk, and Pangong Lake—with the pristine frontier of Hanle, India's premier Dark Sky Reserve.

Safety is paramount: every vehicle is outfitted with a continuous medical oxygen cylinder and pediatric/adult first-aid supplies. Our experienced local drivers operate at comfortable speeds, with frequent rest stops and comfortable handpicked hotels with guaranteed 24-hour hot water and family dining options.

### Family Highlights:
- Safe, moderate pace with mandatory acclimatization days
- Camel ride on Hunder's silver dunes & cultural interaction in Turtuk
- High-altitude stargazing through professional telescopes at Hanle Dark Sky Reserve
- Wildlife spotting: Himalayan Marmots, Tibetan Wild Ass (Kiang), and migratory birds
- Confluence of Indus & Zanskar rivers with optional gentle family river rafting

### Tiered Pricing Structure (Per Person):
- **2 Adults (Private Innova Crysta):** ₹42,000 per person
- **4 Adults (Family of 4 - Innova Crysta):** ₹32,500 per person
- **6 Adults (Large Family - Innova Crysta / 2 Cabs):** ₹26,500 per person
- **8-12 Adults (Force Tempo Traveller 12-Seater):** ₹22,900 per person
- **Child With Bed (5-11 Years):** ₹16,500 per child
- **Child Without Bed (Under 5 Years):** Complimentary`,
    durationDays: 8,
    durationNights: 7,
    pricePerAdult: 42000,
    route: ["Leh", "Nubra", "Turtuk", "Pangong", "Hanle", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh & Full Day Rest",
        description: "Arrive at Leh Airport where our team greets your family. Transfer to your warm, comfortable hotel. A gentle, quiet day with complete rest, pulse-oximeter monitoring, and light hydrating soups to ensure every family member acclimatizes smoothly.",
        stay: "Family Hotel in Leh",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Leh Local Discovery & Cultural Landmarks",
        description: "A relaxed day of sightseeing around Leh. Visit the Hall of Fame museum, experience Magnetic Hill, witness the scenic Indus-Zanskar Sangam, and take a peaceful family walk around Shanti Stupa with panoramic town views.",
        stay: "Family Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La Pass",
        description: "Drive across Khardung La Pass (17,582 ft) with plenty of photo opportunities. Descend into Nubra Valley to explore Diskit Monastery. In the late afternoon, enjoy a family camel safari on double-humped Bactrian camels in the Hunder sand dunes.",
        stay: "Deluxe Family Cottages in Hunder",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Turtuk Village Excursion",
        description: "Scenic day excursion to Turtuk, the northernmost Balti border village. Walk through green stone-walled village alleys, visit ancient wooden royal homes, taste organic apricots, and learn about the unique Balti culture.",
        stay: "Deluxe Family Cottages in Hunder",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Nubra to Pangong Lake via Shyok Route",
        description: "Drive along the wild and scenic Shyok river gorge towards the breathtaking Pangong Lake (14,270 ft). Watch the lake transition through various shades of blue. Enjoy a family lakeside walk and bonfire in the evening.",
        stay: "Heated Deluxe Camp / Cottages at Pangong",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Pangong to Hanle via Chushul & Tsaga La",
        description: "Drive along the remote and raw landscapes of the Changthang plateau towards Hanle. Spot wild kiang (Tibetan wild ass) and golden eagles. Arrive at Hanle, home to the Indian Astronomical Observatory. Enjoy an extraordinary night of stargazing inside India's first Dark Sky Reserve.",
        stay: "Cozy Homestay / Guesthouse in Hanle",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 7,
        title: "Hanle to Leh via Chumathang Hot Springs",
        description: "Journey back to Leh following the upper Indus Valley. Stop at the natural mineral hot springs of Chumathang. Arrive in Leh by late afternoon for last-minute souvenir shopping in the bazaar.",
        stay: "Family Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 8,
        title: "Departure from Leh",
        description: "Enjoy a hearty breakfast with the family before your private drop-off at Leh Airport for your return flight home.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: [
      ...standardTourInclusions,
      "Family camel safari vouchers at Hunder sand dunes",
      "Stargazing guidance & telescope briefing in Hanle Dark Sky Reserve",
      "Child-friendly meal options and 24x7 doctor-on-call coordination in Leh"
    ],
    exclusions: standardTourExclusions,
    bestSeason: ["May", "June", "July", "August", "September", "October"],
    altitudeInfo: "17,582 ft (Khardung La) / 14,800 ft (Hanle)",
    permitRequired: true,
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  },

  // 3. Marka Valley Trek
  {
    title: "Marka Valley Trek",
    slug: "marka-valley-trek",
    shortDescription: "The premier 5-day Himalayan trek through Hemis National Park, crossing willow valleys, ancient monasteries, high shepherd pastures of Nimaling, and the Kongmaru La Pass (17,250 ft).",
    fullDescription: `The Markha Valley Trek is widely heralded as one of the finest classic treks in the trans-Himalayas. Winding through the protected wilderness of Hemis National Park, this trail offers an unbeatable blend of high-altitude mountain scenery, ancient Buddhist villages, and close encounters with Tibetan nomadic culture.

Beginning along the rushing Zanskar River at Chilling, you'll hike past crumbling cliffside gompas, cross glacial streams, and walk under the shadow of the soaring 6,400-meter peak of Mt. Kang Yatse. Ascend onto the lush high-altitude plateau of Nimaling (4,720m) where yaks and mountain sheep graze, before conquering the formidable Kongmaru La Pass (5,260m / 17,250 ft) with sweeping panoramic views of the Karakoram and Zanskar ranges.

### Trek Highlights:
- Trek inside Hemis National Park—habitat of the elusive Snow Leopard and Blue Sheep
- Crossing Kongmaru La Pass at 17,250 ft with majestic Karakoram panoramas
- Iconic views of Mt. Kang Yatse (6,400m) towering over Nimaling meadows
- Authentic homestays in traditional Ladakhi stone-and-mud villages (Skiu & Markha)
- Full support team: certified mountain guide, cook, pack mules, and emergency oxygen

### Tiered Pricing Structure (Per Person):
- **2 Trekkers (Private Guide, Cook & Mules):** ₹25,000 per person
- **4 Trekkers (Small Group):** ₹19,500 per person
- **6-8 Trekkers (Standard Group):** ₹16,000 per person
- **10+ Trekkers (Club / Corporate Group):** ₹13,500 per person`,
    durationDays: 5,
    durationNights: 4,
    pricePerAdult: 25000,
    route: ["Leh", "Chilling", "Skiu", "Markha", "Nimaling", "Kongmaru La", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Drive Leh to Chilling (Roadhead) & Trek to Skiu (3,400m / 4 hrs)",
        description: "Drive along the dramatic Indus and Zanskar river confluence to Chilling village. Cross the bridge over the roaring Zanskar River and begin your trek into the Markha Valley. Follow a gentle trail through verdant willow and poplar trees to Skiu village. Settle into a traditional stone homestay and visit Skiu's 11th-century monastery.",
        stay: "Traditional Homestay in Skiu",
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Trek Skiu to Markha Village (3,700m / 6-7 hrs)",
        description: "A scenic hike following the Markha River through narrow river canyons and wide riverbeds. Cross wooden footbridges and pass ancient mani walls, chortens, and ruined fortresses. Reach Markha—the largest village in the valley—with sprawling barley terraces, a 14th-century monastery, and warm Ladakhi hospitality.",
        stay: "Traditional Homestay in Markha",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Trek Markha to Nimaling Alpine Pasture (4,720m / 5-6 hrs)",
        description: "Trek through Hankar village, the last permanent settlement in the valley. As you gain altitude, the dramatic glaciated face of Mt. Kang Yatse (6,400m) dominates the southern horizon. Emerge onto the broad, rolling alpine meadows of Nimaling, where local Changpa nomads graze their herds. Camp in high-altitude dome tents under brilliant starlight.",
        stay: "High-Altitude Alpine Camp at Nimaling",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Cross Kongmaru La Pass (5,260m) to Shang Sumdo & Drive to Leh (7 hrs)",
        description: "Rise at dawn for the challenging switchback ascent to Kongmaru La Pass (17,250 ft), festooned with colorful prayer flags. Savor 360-degree views of the Ladakh range, Karakoram, and Tibetan plateau. Descend through the narrow geological gorge of Shang canyon to Shang Sumdo, where our vehicle awaits to drive you back to Leh for a celebratory hot shower and dinner.",
        stay: "Hotel in Leh",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Rest Day & Departure from Leh",
        description: "Enjoy a relaxed breakfast and well-earned rest after your successful Himalayan trek. Transfer to Leh Airport for your onward journey with unforgettable mountain memories.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: trekInclusions,
    exclusions: trekExclusions,
    bestSeason: ["June", "July", "August", "September"],
    altitudeInfo: "17,250 ft (Kongmaru La Pass)",
    permitRequired: true,
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  },

  // 4. Sham Valley Trek
  {
    title: "Sham Valley Trek (Baby Trek)",
    slug: "sham-valley-trek",
    shortDescription: "Ladakh's easiest and most charming village trek, ideal for beginners, families, and culture enthusiasts. Walk between historic apricot hamlets, ancient monasteries, and welcoming homestays.",
    fullDescription: `Known affectionately across the Himalayas as the 'Baby Trek' of Ladakh, the Sham Valley Trek is the perfect introduction to Himalayan trekking. Unlike grueling high-pass expeditions, Sham Valley maintains comfortable elevations (never exceeding 3,750m / 12,300 ft), making altitude sickness rare and the walking days moderate (3 to 5 hours per day).

The trail winds through the lower valley west of Leh—a rich agricultural corridor celebrated for sun-drenched apricot orchards, crystalline mountain streams, and ancient monasteries like Likir and Temisgam. Stays in authentic village homestays allow you to share freshly baked Ladakhi bread (Khambir), organic apricot jam, and herbal mint tea with warm local families while contributing directly to sustainable village livelihoods.

### Trek Highlights:
- Low altitude trail (max 12,300 ft) ensuring very comfortable trekking without severe hypoxia
- Gentle daily distances (3-5 hours daily) suitable for first-timers and active families
- Overnight in traditional, solar-powered Ladakhi village homestays
- Historic 1,000-year-old monasteries and chortens at Likir and Temisgam
- Walks through fragrant apricot blossoms and apple orchards with brook-side resting spots

### Tiered Pricing Structure (Per Person):
- **2 Trekkers (Private Guide & Support Vehicle):** ₹15,000 per person
- **4 Trekkers (Small Group):** ₹11,500 per person
- **6-8 Trekkers (Standard Group):** ₹8,900 per person
- **10+ Trekkers (Group Discount):** ₹7,500 per person`,
    durationDays: 4,
    durationNights: 3,
    pricePerAdult: 15000,
    route: ["Leh", "Likir", "Yangthang", "Hemis Shukpachan", "Temisgam", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh & Acclimatization Rest",
        description: "Arrive at Leh Airport (11,500 ft). Welcome transfer to your hotel. Complete rest throughout the day to acclimatize to the thin Himalayan air. Evening walk around the local market if feeling energetic.",
        stay: "Hotel in Leh",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Leh Local Sightseeing (Hall of Fame, Magnetic Hill, Sangam)",
        description: "Gentle day trip exploring Leh's western sights: the Hall of Fame museum, Magnetic Hill, Indus-Zanskar confluence at Sangam, and Gurudwara Pathar Sahib. Return to Leh for final trek gear checks.",
        stay: "Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Drive to Likir Monastery & Trek to Yangthang (3,600m / 4-5 hrs)",
        description: "Drive 1.5 hours to Likir Monastery, home to a majestic 75-ft gilded statue of Maitreya Buddha. Begin hiking along an open arid valley, crossing Phobe La (3,580m) and Chagatse La (3,630m). Descend gently into the peaceful green oasis of Yangthang village. Settle into a village homestay.",
        stay: "Village Homestay in Yangthang",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Trek Yangthang to Hemis Shukpachan (3,600m / 3-4 hrs)",
        description: "A delightful walk crossing the scenic Tsermangchen La pass (3,750m / 12,300 ft). Drop down into Hemis Shukpachan, celebrated as one of Ladakh's prettiest villages, known for its sacred cedar and juniper groves, sparkling streams, and whitewashed mud-brick homes.",
        stay: "Village Homestay in Hemis Shukpachan",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Trek Hemis Shukpachan to Temisgam & Drive to Leh (3 hrs trek + 2 hrs drive)",
        description: "Hike past Mebtak La pass (3,750m) through vibrant pink and yellow cliffs into the historic hamlet of Temisgam, once the ancient capital of lower Ladakh. Explore the historic Temisgam Palace fort. Meet your private vehicle and drive back to Leh via Basgo Fort ruins.",
        stay: "Hotel in Leh",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Departure from Leh",
        description: "Transfer to Leh Airport after a rewarding and culturally rich trekking journey in the heart of rural Ladakh.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: [
      "Leh hotel stays before and after trek with breakfast and dinner",
      "Authentic village homestay accommodations in Yangthang and Hemis Shukpachan",
      "All wholesome meals on the trek (Breakfast, Packed Lunch, Hot Tea, Village Dinner)",
      "Dedicated local Ladakhi trekking guide throughout",
      "Private vehicle transfers from Leh to Likir roadhead and Temisgam back to Leh",
      "Luggage transfer vehicle between homestays so you walk light with just a daypack",
      "First aid medical kit with pulse oximeter"
    ],
    exclusions: standardTourExclusions,
    bestSeason: ["April", "May", "June", "July", "August", "September", "October", "November"],
    altitudeInfo: "12,300 ft (Tsermangchen La)",
    permitRequired: false,
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  },

  // 5. Unique Eco Village Tour
  {
    title: "Unique Eco Village & Cultural Tour",
    slug: "eco-village-cultural-tour",
    shortDescription: "An immersive 6-day low-altitude cultural immersion into traditional Ladakhi life, featuring UNESCO heritage murals at Alchi, clay pottery in Likir, and solar eco-stays.",
    fullDescription: `The Unique Eco Village & Cultural Tour offers an authentic, slow-paced journey into the sustainable soul of rural Ladakh. Ideal for conscious travelers, culture enthusiasts, and families, this itinerary focuses on the lower Indus and Sham valleys where altitudes are lower (10,000 to 11,500 ft) and agricultural communities thrive.

Instead of racing from one high pass to another, you'll delve into centuries of Tibetan Buddhist art, stay in solar-powered eco-resorts and village farmsteads, and participate in heritage workshops. Learn traditional clay pottery from local artisans in Likir, watch bread baking in village earthen tandoors, and marvel at the 11th-century Kashmiri-Buddhist wall frescoes at UNESCO-celebrated Alchi Choskor.

### Cultural Highlights:
- Low-altitude itinerary (10,000 to 11,500 ft) ensuring maximum comfort and effortless acclimatization
- Guided walk through UNESCO-acclaimed 11th-century Alchi Monastery wall murals
- Interactive pottery and clay sculpting session with village artisans in Likir
- Traditional Ladakhi cooking workshop: make butter tea (Gur-Gur Chai) and fresh Thukpa
- Stay in eco-resorts nestled beside the Indus River and rural solar homestays

### Tiered Pricing Structure (Per Person):
- **2 Adults (Private Innova Crysta):** ₹22,000 per person
- **4 Adults (Small Group / Family):** ₹16,500 per person
- **6 Adults (Family & Friends Group):** ₹13,000 per person
- **8+ Adults (Tempo Traveller):** ₹10,900 per person`,
    durationDays: 6,
    durationNights: 5,
    pricePerAdult: 22000,
    route: ["Leh", "Basgo", "Alchi", "Uleytokpo", "Likir", "Yangthang", "Hemis Shukpachan", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh & Peaceful Acclimatization",
        description: "Arrive at Leh Airport (11,500 ft) and transfer to your eco-hotel. Spend the day resting, drinking hot ginger-lemon-honey water, and gently acclimatizing with scenic views of the Leh valley.",
        stay: "Eco-Boutique Hotel in Leh",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Leh Old Town Heritage Walk & Organic Cafes",
        description: "Embark on an insightful morning heritage walk through the centuries-old mud-brick alleyways of Leh Old Town. Visit the Central Asian Museum, explore community-run craft cooperatives, and enjoy an organic farm lunch in a local café.",
        stay: "Eco-Boutique Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Drive to Basgo Fortress Ruins & Alchi Choskor (Stay in Uleytokpo)",
        description: "Travel west along the Indus River to Basgo Castle, ancient seat of Ladakhi kings with dramatic red mud-brick towers. Continue to Alchi Choskor, home to 1,000-year-old Kashmiri-Buddhist frescoes. Settle into a tranquil eco-resort nestled by the river in Uleytokpo.",
        stay: "Riverfront Eco-Resort in Uleytokpo",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Likir Pottery Village & Yangthang Eco Community",
        description: "Visit Likir Monastery and participate in a hands-on clay pottery session with village artisans. Drive up to the picturesque village of Yangthang. Take a walk through organic barley fields and enjoy a home-cooked Ladakhi dinner with your host family.",
        stay: "Eco-Homestay in Yangthang",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Hemis Shukpachan Cultural Activities & Return to Leh",
        description: "Drive to the charming village of Hemis Shukpachan. Learn the art of making traditional Ladakhi butter tea and freshly baked local bread. Walk through the sacred juniper forest before enjoying a scenic afternoon drive back to Leh.",
        stay: "Eco-Boutique Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Departure from Leh",
        description: "After a wholesome breakfast featuring local apricot preserves, transfer to Leh Airport for your return flight with heartwarming memories of Himalayan village life.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: [
      ...standardTourInclusions,
      "Hands-on village clay pottery and wood-carving session with local artisans in Likir",
      "Traditional Ladakhi cooking workshop with host family",
      "All monastery and village entrance donations included"
    ],
    exclusions: standardTourExclusions,
    bestSeason: ["April", "May", "June", "July", "August", "September", "October"],
    altitudeInfo: "11,500 ft (Leh) / 10,200 ft (Alchi)",
    permitRequired: false,
    coverImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  },

  // 6. Senior Citizen Special
  {
    title: "Senior Citizen Special Tour Package",
    slug: "senior-citizen-special",
    shortDescription: "A gentle, medically supported 6-day pilgrimage and sightseeing tour designed specifically for elders. Features slow pacing, premium heated rooms, and 24x7 medical oxygen backup.",
    fullDescription: `The Senior Citizen Special Tour Package has been thoughtfully created to fulfill the lifelong dream of visiting Ladakh for our cherished elders, with zero physical strain or altitude anxiety. Every aspect of this tour is tuned for comfort, safety, and spiritual fulfillment.

We mandate extended acclimatization periods, select hotels with ground-floor rooms and elevator access, ensure 24-hour room heating, and provide continuous on-board medical oxygen cylinders with twice-daily pulse-oximeter monitoring by trained drivers. Monasteries and viewpoints have been handpicked for easy vehicle approach and minimal stairs, allowing elders to witness the grandeur of Thiksey, Shey, Nubra Valley, and Pangong Lake in complete peace of mind.

### Senior Safety & Comfort Guarantees:
- Continuous 24x7 medical oxygen cylinder inside the private Innova Crysta
- Twice-daily blood oxygen (SpO2) and pulse monitoring
- Specially selected hotels with elevator access or ground floor deluxe rooms with central heating
- Relaxed morning start times (no early crack-of-dawn departures)
- Wheelchair assistance coordination at key monuments where terrain permits
- Tie-up with SNM Hospital Leh with 24x7 doctor-on-call support

### Tiered Pricing Structure (Per Person):
- **2 Elders (Dedicated Private Innova Crysta):** ₹35,000 per person
- **4 Elders (Comfortable Innova Crysta):** ₹27,500 per person
- **6 Elders (Large Family / Group with Helper):** ₹22,500 per person
- **Caretaker / Attendant Discount:** 15% discount on sharing room`,
    durationDays: 6,
    durationNights: 5,
    pricePerAdult: 35000,
    route: ["Leh", "Nubra", "Pangong", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Gentle Arrival in Leh & Complete Rest",
        description: "Arrive at Leh Airport (11,500 ft). Warm Khatak welcome and transfer to your pre-heated hotel room. Enjoy a complete day of peaceful rest in bed with hot herbal ginger tea. An on-site SpO2 and blood pressure check ensures comfortable altitude adjustment.",
        stay: "Senior-Friendly Deluxe Hotel in Leh",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Leh Local Sights (Palace, Stupa & Sangam Viewpoint)",
        description: "A slow and comfortable late-morning start. Visit the Hall of Fame war museum (ground-level galleries), marvel at Magnetic Hill, and take in the Indus-Zanskar confluence at Sangam directly from vehicle vantage points without strenuous walking. Evening sunset view at Shanti Stupa.",
        stay: "Senior-Friendly Deluxe Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Spiritual Monastery Tour (Shey, Thiksey & Hemis)",
        description: "A soul-stirring spiritual day. Visit Shey Palace and Thiksey Monastery—the mini Potala of Ladakh—where you can sit peacefully and listen to the rhythmic morning chanting of Buddhist monks. Conclude with a visit to Hemis Gompa, the spiritual heart of the Drukpa lineage.",
        stay: "Senior-Friendly Deluxe Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Leh to Nubra Valley via Khardung La Pass",
        description: "A smooth and leisurely drive over Khardung La Pass (17,582 ft) with in-vehicle oxygen support. Descend to the fertile oasis of Nubra Valley. Enjoy a short, flat stroll along the silver dunes of Hunder and photograph the gentle double-humped Bactrian camels.",
        stay: "Luxury Heated Cottage in Nubra",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Nubra to Pangong Lake & Return to Leh",
        description: "Drive along the flat, scenic Shyok River road to the sacred blue waters of Pangong Lake (14,270 ft). Spend a serene two hours soaking in the tranquil colors of the lake while sipping hot tea in a lakeside lounge, before returning comfortably to Leh across Chang La Pass.",
        stay: "Senior-Friendly Deluxe Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Departure from Leh with Blessing Souvenirs",
        description: "Enjoy a relaxed breakfast. Our driver assists with luggage and provides airport drop-off with memorable blessings and souvenirs from Ladakh.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: [
      ...standardTourInclusions,
      "Dedicated high-capacity medical oxygen cylinder with nasal cannulas reserved in vehicle",
      "Daily SpO2 level and vitals monitoring",
      "Ground floor or elevator-accessible premium heated rooms at all properties",
      "Porter assistance with baggage at all hotels and airports"
    ],
    exclusions: standardTourExclusions,
    bestSeason: ["May", "June", "July", "August", "September"],
    altitudeInfo: "17,582 ft (Khardung La - traversed with continuous in-cab oxygen support)",
    permitRequired: true,
    coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  },

  // 7. Women Special
  {
    title: "Women Special Ladakh Tour",
    slug: "women-special-tour",
    shortDescription: "A safe, fun, and empowering 6-day female group tour through Leh, Nubra Valley, and Pangong Lake, featuring traditional dress shoots, camel rides, and lakeside bonfires.",
    fullDescription: `The Women Special Ladakh Tour is an empowering, safe, and exhilarating 6-day getaway designed specifically for solo female travelers, groups of friends, sisters, and mothers-and-daughters. Experience the majestic trans-Himalayas surrounded by the camaraderie, laughter, and support of like-minded women explorers.

Traverse Khardung La to the silver sands of Nubra Valley, enjoy a sunset Bactrian camel safari, and dress up in authentic Ladakhi royal Gonchas for a fun cultural photoshoot. Gather around a crackling lakeside bonfire under the Milky Way at Pangong Tso, and support grassroots local women entrepreneurs by visiting Ladakhi women’s weaving and pashmina spinning cooperatives in Leh.

### Women-Centric Highlights:
- 100% verified, police-cleared, professional local drivers with verified safety track records
- Traditional Ladakhi costume (Goncha & Perak) photoshoot at Hunder sand dunes
- Exclusive visit to the Ladakhi Women’s Alliance & indigenous handicrafts cooperative
- Evening lakeside bonfire with music, laughter, and stargazing at Pangong Tso
- Curated boutique hotels with high security, privacy, and scenic rooftop cafes

### Tiered Pricing Structure (Per Person):
- **2 Women (Private Innova Crysta):** ₹32,999 per person
- **4 Women (Girls' Trip - Innova Crysta):** ₹25,500 per person
- **6 Women (Shared Innova Crysta):** ₹21,000 per person
- **Solo Traveler in Twin-Sharing (Group Departure):** ₹23,500 per person
- **Solo Traveler in Single Room:** ₹34,000 per person`,
    durationDays: 6,
    durationNights: 5,
    pricePerAdult: 32999,
    route: ["Leh", "Nubra", "Pangong", "Leh"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh & Acclimatization",
        description: "Arrive at Leh Airport (11,500 ft). Welcome transfer to your boutique hotel. Rest, hydrate, and relax with rooftop views of the snow-capped Stok range. Evening welcome meetup with fellow travelers over hot Himalayan herbal tea.",
        stay: "Boutique Hotel in Leh",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Leh Local & Women's Cooperative Exploration",
        description: "Visit the inspiring Ladakhi Women's Alliance craft cooperative to witness traditional wool spinning and pashmina weaving. Experience Magnetic Hill, Indus-Zanskar Sangam, and head to Shanti Stupa for an unforgettable sunset group photo session.",
        stay: "Boutique Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La (Camel Ride & Costume Shoot)",
        description: "Embark on an exhilarating road trip crossing the world's legendary Khardung La Pass (17,582 ft). Descend into Nubra Valley, visit the grand Diskit Monastery, and enjoy double-humped camel rides on the silver sand dunes of Hunder followed by a fun traditional dress photoshoot.",
        stay: "Deluxe Swiss Camp in Hunder",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Nubra to Pangong Lake via Shyok (Lakeside Bonfire)",
        description: "Drive along the scenic canyon of the Shyok River to the surreal shores of Pangong Tso (14,270 ft). Check into your cozy lakeside cottages. In the evening, gather around a warm private bonfire by the lake for music, storytelling, and celestial stargazing.",
        stay: "Lakeside Cottage at Pangong",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Pangong Sunrise to Leh via Chang La Pass",
        description: "Wake early to witness the sun rise over the turquoise expanse of Pangong. Journey back to Leh across Chang La Pass (17,688 ft). Stop at Thiksey Monastery and enjoy an afternoon browsing Leh's vibrant Tibetan and Ladakhi bazaars for souvenirs and dry fruits.",
        stay: "Boutique Hotel in Leh",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Departure from Leh",
        description: "Enjoy a final breakfast with your travel sisters before your transfer to Leh Airport. Fly home with empowered spirits and lifelong friendships.",
        stay: "Departure (No stay)",
        meals: ["Breakfast"]
      }
    ],
    inclusions: [
      ...standardTourInclusions,
      "Traditional Ladakhi costume dress rental for Hunder sand dune photoshoot",
      "Double-humped camel safari ride in Hunder dunes",
      "Special lakeside evening bonfire gathering at Pangong Lake",
      "Guided visit to the Ladakhi Women's Cooperative"
    ],
    exclusions: standardTourExclusions,
    bestSeason: ["May", "June", "July", "August", "September", "October"],
    altitudeInfo: "17,582 ft (Khardung La)",
    permitRequired: true,
    coverImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true
  }
];

async function seedNewPackages() {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aryavarta_travel";

  try {
    console.log("==================================================");
    console.log("🚀 Aryavarta Travel - New Packages Seeder");
    console.log("==================================================");
    console.log("🔌 Connecting to MongoDB at:", mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected successfully: Database "${mongoose.connection.name}"`);

    console.log(`\n🌱 Inserting / Updating ${newPackagesToSeed.length} new packages...\n`);

    for (let i = 0; i < newPackagesToSeed.length; i++) {
      const pkg = newPackagesToSeed[i];
      // Upsert: update if slug exists, otherwise insert new
      const result = await Package.findOneAndUpdate(
        { slug: pkg.slug },
        pkg,
        { upsert: true, returnDocument: 'after', runValidators: true }
      );

      console.log(`[${i + 1}/${newPackagesToSeed.length}] ✅ Seeded: "${result.title}"`);
      console.log(`      • Slug: /packages/${result.slug}`);
      console.log(`      • Duration: ${result.durationDays} Days / ${result.durationNights} Nights`);
      console.log(`      • Base Price (2 Adults): ₹${result.pricePerAdult.toLocaleString('en-IN')}`);
      console.log(`      • Route: ${result.route.join(" → ")}`);
      console.log(`      • Itinerary Days: ${result.itinerary.length}`);
      console.log(`      • Status: ${result.isActive ? "Published Live" : "Draft"}\n`);
    }

    console.log("==================================================");
    console.log(`🎉 All ${newPackagesToSeed.length} new packages successfully seeded into the database!`);
    console.log("==================================================");

    await mongoose.disconnect();
    console.log("👋 MongoDB connection cleanly closed.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error while seeding new packages:", error);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
}

seedNewPackages();

