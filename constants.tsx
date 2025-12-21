import { ServiceRoute, Project, ServiceArea } from './types';
import { LayoutGrid, Hammer, Home, Umbrella, Sun } from 'lucide-react';

export const BUSINESS_INFO = {
  name: "Loaiza5 Aluminum LLC",
  phone: "(813) 784-6949",
  phoneClean: "18137846949",
  email: "loaiza5aluminum@gmail.com",
  location: "Serving all of Florida",
  experience: "10+ Years",
};

export const SERVICES: ServiceRoute[] = [
  {
    id: 'pool-cages',
    title: "Pool Cages & Rescreens",
    path: "/services/pool-cages-rescreens",
    description: "Complete pool enclosure installations and full rescreening services to keep your pool area bug-free.",
    iconName: 'LayoutGrid',
    details: {
      heroImage: "/image_10.jpg",
      whatWeDo: [
        "New Pool Cage Installation",
        "Full Enclosure Rescreening",
        "Fastener Replacement",
        "Pet Screen Installation"
      ],
      included: [
        "High-quality Phifer screen",
        "Stainless steel tapcons",
        "Door hardware check/replacement",
        "Cleanup and disposal of old materials"
      ],
      process: [
        "On-site measurement and assessment",
        "Material selection (Standard 18/14 or 20/20)",
        "Professional installation by experienced teams",
        "Final walkthrough and cleanup"
      ],
      faqs: [
        { question: "How long does a rescreen take?", answer: "Most average-sized pool cages can be rescreened in 1-2 days." },
        { question: "Do you offer different screen types?", answer: "Yes, we offer standard insect screen, privacy screen, and heavy-duty pet screen." }
      ]
    }
  },
  {
    id: 'repairs',
    title: "Repairs & Tear-Downs",
    path: "/services/repairs-tear-downs",
    description: "Expert repairs for storm damage and safe demolition of old structures.",
    iconName: 'Hammer',
    details: {
      heroImage: "/image_4.jpg",
      whatWeDo: [
        "Structural Aluminum Repairs",
        "Storm Damage Restoration",
        "Safe Tear-Downs & Removal",
        "Cable & Beam Replacement"
      ],
      included: [
        "Safety assessment",
        "Matching existing aluminum colors",
        "Debris haul-away",
        "Site restoration"
      ],
      process: [
        "Damage assessment inspection",
        "Safety securing of the structure",
        "Repair or removal execution",
        "Structural integrity check"
      ],
      faqs: [
        { question: "Can you fix a bent beam without replacing the whole cage?", answer: "In many cases, yes. We assess if the structural integrity is compromised before recommending repair vs replacement." }
      ]
    }
  },
  {
    id: 'glass-rooms',
    title: "Glass & Screen Rooms",
    path: "/services/glass-screen-rooms",
    description: "Convert your outdoor space into a year-round room with glass or high-quality screen.",
    iconName: 'Home',
    details: {
      heroImage: "/image_3.jpg",
      whatWeDo: [
        "Custom Glass Rooms",
        "Elite Screen Rooms",
        "Acrylic Window Enclosures",
        "Insulated Roof Systems"
      ],
      included: [
        "Custom engineering",
        "Insulated composite panels",
        "High-impact windows (if requested)",
        "Gutter integration"
      ],
      process: [
        "Design consultation",
        "Concrete pad preparation (if needed)",
        "Framing and roof installation",
        "Window/Screen installation"
      ],
      faqs: [
        { question: "Do these rooms add value to my home?", answer: "Absolutely. A well-built glass or screen room increases your usable square footage and home value." }
      ]
    }
  },
  {
    id: 'lanais',
    title: "Screen Lanais & Carports",
    path: "/services/screen-lanais-carports",
    description: "Protect your vehicles and patio areas with durable aluminum structures.",
    iconName: 'Umbrella',
    details: {
      heroImage: "/image_1.jpg",
      whatWeDo: [
        "Aluminum Carports",
        "Lanai Enclosures",
        "Front Entry Enclosures",
        "Walkway Covers"
      ],
      included: [
        "Heavy-duty aluminum posts",
        "Composite roof panels",
        "Downspouts and gutters",
        "anchoring to Florida code standards"
      ],
      process: [
        "Site layout planning",
        "Post and beam erection",
        "Roof panel installation",
        "Screening (for Lanais)"
      ],
      faqs: [
        { question: "Are your carports wind rated?", answer: "Yes, we use materials and anchoring techniques designed for Florida weather conditions." }
      ]
    }
  },
  {
    id: 'porches',
    title: "Screen Porches",
    path: "/services/screen-porches",
    description: "Enjoy the Florida breeze without the bugs on your front or back porch.",
    iconName: 'Sun',
    details: {
      heroImage: "/image_7.jpg",
      whatWeDo: [
        "Front Porch Screening",
        "Back Patio Enclosures",
        "Kickplate Installation",
        "Door Installation"
      ],
      included: [
        "Choice of frame color (Bronze/White)",
        "Custom door placement",
        "Bug sweep installation",
        "Caulking and sealing"
      ],
      process: [
        "Measurement of existing openings",
        "Frame fabrication",
        "On-site assembly",
        "Screen rolling"
      ],
      faqs: [
        { question: "Can I choose the door location?", answer: "Yes, we customize the layout to fit your traffic flow." }
      ]
    }
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  { id: 'tampa', name: "Tampa Bay Area", path: "/service-areas/tampa-bay", cities: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview"] },
  { id: 'central', name: "Central Florida", path: "/service-areas/central-florida", cities: ["Orlando", "Kissimmee", "Lakeland", "Winter Haven"] },
  { id: 'south', name: "South Florida", path: "/service-areas/south-florida", cities: ["Miami", "Fort Lauderdale", "West Palm Beach"] },
  { id: 'southwest', name: "Southwest Florida", path: "/service-areas/southwest-florida", cities: ["Fort Myers", "Naples", "Cape Coral", "Sarasota"] },
  { id: 'north', name: "North Florida", path: "/service-areas/north-florida", cities: ["Jacksonville", "Gainesville", "Ocala"] },
];

export const PROJECTS: Project[] = [
  { id: 1, title: "Modern Pool Cage", category: "pool-cages", location: "Tampa, FL", imageUrl: "/image_9.jpg", description: "Mansard roof style cage with picture window view." },
  { id: 2, title: "Full Rescreen", category: "rescreens", location: "Orlando, FL", imageUrl: "/image_10.jpg", description: "Complete restoration using 20/20 mesh for tiny bug protection." },
  { id: 3, title: "White Glass Room", category: "glass-rooms", location: "Sarasota, FL", imageUrl: "/image_2.jpg", description: "Sunroom addition with sliding glass windows." },
  { id: 4, title: "Storm Repair", category: "repairs", location: "Fort Myers, FL", imageUrl: "/image_4.jpg", description: "Structural beam replacement after storm damage." },
  { id: 5, title: "Double Carport", category: "lanais", location: "Lakeland, FL", imageUrl: "/image_6.jpg", description: "Attached aluminum carport protecting two vehicles." },
  { id: 6, title: "Front Porch Enclosure", category: "porches", location: "Jacksonville, FL", imageUrl: "/image_5.jpg", description: "Bronze frame front entry screen." },
];