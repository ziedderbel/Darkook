import imgRusticPatioFurnitureHouseDeckWithVegetation2 from "@/imports/LandingPage/fabb010c874f57c47211afac0d2c3c2209cc0840.png";
import imgBeachfrontBungalow from "@/imports/LandingPage/2e243250df73f8665c2076148b1ef31fae40d3e8.png";
import imgTunisiaTravelTips from "@/imports/LandingPage/ec2789d611400a25173d812dfdc5d6656f384f5b.png";
import imgHospitalityStory from "@/imports/LandingPage/b238a19d42fe20f37a4d2898024be6e4fb9c965d.png";
import imgDjerbaExplore from "@/imports/LandingPage/68c031d4d79add7e14a6b6bcf66753f4420c861f.png";
import imgGastronomyFood from "@/imports/LandingPage/c0ef98efbe3a53b1c514867312bfe556daeee299.png";
import imgHostGrowthTips from "@/imports/LandingPage/19e6220155bea3ebe8fdd486592d567d1d63cf20.png";
import imgFeaturedCover from "@/imports/LandingPage/f5c8061b896e0ad8b3ac0aa45cedc31ec176b6cd.png";

export interface ArticleParagraph {
  heading?: string;
  body: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryBg: string;
  badge: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  photo: any;
  heroBg?: any;
  paragraphs: ArticleParagraph[];
}

export const ARTICLES_MAP: Record<string, NewsArticle> = {
  "guest-house-rental-tozeur": {
    id: "guest-house-rental-tozeur",
    title: "Guest House Rental in Tozeur",
    subtitle: "Guest House Rental in Tozeur: Houses and Villas for a Unique Stay",
    category: "Vacance",
    categoryBg: "#547FEE",
    badge: "Vacance",
    date: "23 January 2026",
    readTime: "5 min read",
    author: {
      name: "Sonia Ben Amor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Travel Editor & Hospitality Specialist",
    },
    photo: imgFeaturedCover,
    paragraphs: [
      {
        body: [
          "Tozeur is one of the most exotic destinations in Tunisia, known for its lush oases, Sahara desert landscapes, and unique architectural heritage. Choosing a guest house rental in Tozeur allows travelers to enjoy an authentic experience, far from mass tourism.",
          "On Darbook, you will find a curated selection of traditional houses, chalets, and comfortable villas in Tozeur, carefully chosen to suit all budgets and travel styles.",
        ],
      },
      {
        heading: "Why Choose a Guest House in Tozeur with Darbook?",
        body: [
          "Tozeur is one of the most exotic destinations in Tunisia, known for its lush oases, Sahara desert landscapes, and unique architectural heritage. Choosing a guest house rental in Tozeur allows travelers to enjoy an authentic experience, far from mass tourism.",
          "On Darbook, you will find a curated selection of traditional houses, chalets, and comfortable villas in Tozeur, carefully chosen to suit all budgets and travel styles.",
        ],
      },
      {
        heading: "Traditional Guest Houses in Tozeur",
        body: [
          "Traditional guest houses in Tozeur stand out for their ochre brick architecture, inner courtyards, and friendly atmosphere. They are often located near the medina or oases, offering a peaceful setting and an immersive local experience.",
        ],
      },
      {
        heading: "Chalets for Rent in Tozeur",
        body: [
          "Renting a chalet in Tozeur is ideal for travelers seeking calm and nature. These accommodations are usually located on the outskirts of the city or close to the desert, making them perfect for a romantic or relaxing stay.",
        ],
      },
      {
        heading: "Where to Rent a Guest House in Tozeur?",
        body: [
          "Location plays a key role in the overall travel experience. Staying in the city center allows quick access to shops and services. The medina offers deep cultural immersion, while accommodations near the oases provide a natural and peaceful environment. Peripheral areas guarantee calm and privacy.",
        ],
      },
    ],
  },
  "top-guesthouses-tunisia": {
    id: "top-guesthouses-tunisia",
    title: "Top Guesthouses in Tunisia You Need to Visit",
    subtitle: "Discover the most enchanting dars, luxury menzels, and seaside retreats across Tunisia.",
    category: "Stays & Dars",
    categoryBg: "#547FEE",
    badge: "Maison d'hôte",
    date: "05 May 2025",
    readTime: "4 min read",
    author: {
      name: "Sonia Ben Amor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Travel Editor",
    },
    photo: imgBeachfrontBungalow,
    paragraphs: [
      {
        body: [
          "Tunisia is home to an extraordinary collection of boutique guesthouses known locally as 'Dars'. From the ancient UNESCO-listed Medina of Tunis to the serene palm groves of Djerba and the dramatic cliffs of Sidi Bou Said, staying in a Dar offers travelers an intimate window into Tunisian heritage.",
        ],
      },
      {
        heading: "Architectural Authenticity and Modern Comfort",
        body: [
          "Every property featured on Darbook combines historical preservation with premium contemporary comfort. Expect peaceful inner courtyards with fountains, private temperature-controlled pools, hand-carved stucco, and personalized concierge service tailored to your stay.",
        ],
      },
      {
        heading: "Tailor-Made Local Experiences",
        body: [
          "Unlike standard hotels, Tunisian guesthouse hosts craft bespoke experiences: sunrise breakfasts on private panoramic terraces, guided medina walking tours, and private cooking workshops featuring authentic regional recipes.",
        ],
      },
    ],
  },
  "traveling-to-tunisia-tips": {
    id: "traveling-to-tunisia-tips",
    title: "Traveling to Tunisia: Practical Tips, Unique Stays, and Authentic Culture",
    subtitle: "Everything you need to know for a seamless and deeply rewarding journey in Tunisia.",
    category: "Travel Guides",
    categoryBg: "#10B981",
    badge: "Guide Voyage",
    date: "12 August 2025",
    readTime: "6 min read",
    author: {
      name: "Mehdi Trabelsi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Destination Guide",
    },
    photo: imgTunisiaTravelTips,
    paragraphs: [
      {
        body: [
          "Tunisia is a land of contrasts: Mediterranean turquoise waters, Roman archaeological marvels, troglodyte desert houses in Matmata, and vibrant souks brimming with spices and handcrafted goods.",
        ],
      },
      {
        heading: "When Is the Best Time to Visit?",
        body: [
          "Spring (April to June) and Autumn (September to November) offer idyllic weather with mild temperatures perfect for coastal exploration, cultural walking tours, and desert excursions in Tozeur and Douz.",
        ],
      },
      {
        heading: "Getting Around and Local Hospitality",
        body: [
          "Tunisia boasts safe, convenient transportation options including rental cars, high-speed rail, and reliable airport transfers arranged directly through Darbook hosts.",
        ],
      },
    ],
  },
  "why-hospitality-is-not-just-accommodation": {
    id: "why-hospitality-is-not-just-accommodation",
    title: "Why Hospitality Is No Longer Just About Accommodation",
    subtitle: "How modern travelers prioritize authentic connections, cultural immersion, and host storytelling.",
    category: "Host Tips",
    categoryBg: "#8B5CF6",
    badge: "Hospitality",
    date: "02 February 2026",
    readTime: "5 min read",
    author: {
      name: "Yasmine Khelil",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      role: "Host Relations Director",
    },
    photo: imgHospitalityStory,
    paragraphs: [
      {
        body: [
          "Travel in 2026 has shifted from simply booking a room to searching for genuine belonging and meaningful storytelling. In Tunisia, this tradition is rooted in centuries of legendary Mediterranean and Berber hospitality.",
        ],
      },
      {
        heading: "The Power of Thoughtful Details",
        body: [
          "Fresh mint tea served upon arrival, fragrant jasmine blossoms placed in guest suites, and insider tips on secluded coves elevate a simple holiday into a cherished lifelong memory.",
        ],
      },
    ],
  },
  "why-is-tunisia-attracting-foreign-tenants": {
    id: "why-is-tunisia-attracting-foreign-tenants",
    title: "Why Is Tunisia Attracting More and More Foreign Tenants?",
    subtitle: "Digital nomads, remote professionals, and retirees are falling in love with Tunisian lifestyle.",
    category: "Real Estate & Living",
    categoryBg: "#3B68EC",
    badge: "Tendances",
    date: "20 December 2024",
    readTime: "5 min read",
    author: {
      name: "Mehdi Trabelsi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Market Analyst",
    },
    photo: imgHostGrowthTips,
    paragraphs: [
      {
        body: [
          "With over 300 days of sunshine per year, high-speed fiber internet, affordable cost of living, and an exceptionally welcoming community, Tunisia has emerged as a premier destination for medium and long-term stays.",
        ],
      },
      {
        heading: "Seamless Remote Work & Vacation Lifestyle",
        body: [
          "Seaside towns like La Marsa, Sidi Bou Said, and Hammamet offer modern coworking hubs, vibrant cafés, and serene private villas with dedicated work setups.",
        ],
      },
    ],
  },
};

export const RECENT_ARTICLES = [
  {
    id: "why-is-tunisia-attracting-foreign-tenants",
    date: "20/12/2024",
    title: "Why Is Tunisia Attracting More and More Foreign Tenants?",
    photo: imgDjerbaExplore,
  },
  {
    id: "traveling-to-tunisia-tips",
    date: "12/08/2025",
    title: "Traveling to Tunisia: Practical Tips, Unique Stays, and Authentic...",
    photo: imgTunisiaTravelTips,
  },
  {
    id: "why-hospitality-is-not-just-accommodation",
    date: "02/02/2026",
    title: "Why Hospitality Is No Longer Just About Accommodation",
    photo: imgHospitalityStory,
  },
];
