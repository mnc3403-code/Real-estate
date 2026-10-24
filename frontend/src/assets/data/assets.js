import logo from '../icons/logo.svg'
import logo_dark from '../icons/logo_dark.svg'
import cross_icon from '../icons/cross_icon.svg'
import menu_icon from '../icons/menu_icon.svg'
import star_icon from '../icons/star_icon.svg'
import left_arrow from '../icons/left_arrow.svg'
import right_arrow from '../icons/right_arrow.svg'
import header_img from '../images/header_img.png'
import brand_img from '../images/brand_img.png'
import project_img_1 from '../images/project_img_1.jpg'
import project_img_2 from '../images/project_img_2.jpg'
import project_img_3 from '../images/project_img_3.jpg'
import project_img_4 from '../images/project_img_4.jpg'
import project_img_5 from '../images/project_img_5.jpg'
import project_img_6 from '../images/project_img_6.jpg'
import profile_img_1 from '../images/profile_img_1.png'
import profile_img_2 from '../images/profile_img_2.png'
import profile_img_3 from '../images/profile_img_3.png'

export const assets = {
<<<<<<< HEAD
    logo,
    logo_dark,
    cross_icon,
    menu_icon,
    star_icon,
    header_img,
    brand_img,
    project_img_1,
    project_img_2,
    project_img_3,
    project_img_4,
    left_arrow,
    right_arrow,
}

export const projectsData = [
    {
      title: "Skyline Haven",
      price: "$2,50,000",
      location: "California",
      image: project_img_1
    },
    {
      title: "Vista Verde",
      price: "$2,50,000",
      location: "San Francisco",
      image: project_img_2
    },
    {
      title: "Serenity Suites",
      price: "$2,50,000",
      location: "Chicago",
      image: project_img_3
    },
    {
      title: "Central Square",
      price: "$2,50,000",
      location: "Los Angeles",
      image: project_img_4
    },
    {
      title: "Vista Verde",
      price: "$2,50,000",
      location: "San Francisco",
      image: project_img_5
    },
    {
      title: "Serenity Suites",
      price: "$2,50,000",
      location: "Chicago",
      image: project_img_6
    },
    
  ];

  export const testimonialsData = [
    {
        name: "Sami Hasan",
        title: "Marketing Manager",
        image: profile_img_1,
        alt: "Portrait of sami",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "Maria Nazmin",
        title: "UI/UX Designer",
        image: profile_img_2,
        alt: "Portrait of maria",
        rating: 4,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "Aminur Rahman Bhuiya Tahsin ",
        title: "Co-Founder",
        image: profile_img_3,
        alt: "Portrait of tahsin ",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    }
];
=======
  logo,
  logo_dark,
  cross_icon,
  menu_icon,
  star_icon,
  header_img,
  brand_img,
  project_img_1,
  project_img_2,
  project_img_3,
  project_img_4,
  project_img_5,
  project_img_6,
  left_arrow,
  right_arrow,
}

export const projectsData = [
  {
    id: 1,
    title: 'Skyline Haven Penthouse',
    location: 'Gulshan 2, Dhaka',
    city: 'Dhaka',
    category: 'penthouse',
    purpose: 'sale',
    priceBDT: '৳ 5,80,00,000',
    priceUSD: '$525,000',
    priceNum: 58000000,
    priceNumUSD: 525000,
    bedrooms: 4,
    bathrooms: 5,
    area_sqft: 3850,
    parking: 2,
    badge: 'Featured',
    badgeType: 'featured',
    rating: 4.9,
    reviewsCount: 18,
    image: project_img_1,
    gallery: [project_img_1, project_img_2, project_img_3],
    description: 'An architectural masterpiece overlooking the serene Gulshan Lake. Features floor-to-ceiling glass panoramic windows, imported Italian marble flooring, a private sky lounge, and state-of-the-art smart home automation.',
    amenities: ['Skyline Panoramic View', 'Private Elevator', '24/7 Concierge', 'Infinity Pool', 'Smart Home Controls', 'Fitness Center', 'Dual Car Parking'],
    yearBuilt: 2024,
    agent: {
      name: 'Tanvir Hossain',
      phone: '+880 1711-223344',
      email: 'tanvir@realestate.com',
      avatar: profile_img_1
    }
  },
  {
    id: 2,
    title: 'Vista Verde Luxury Garden Villa',
    location: 'Road 11, Banani, Dhaka',
    city: 'Dhaka',
    category: 'villa',
    purpose: 'sale',
    priceBDT: '৳ 7,50,00,000',
    priceUSD: '$680,000',
    priceNum: 75000000,
    priceNumUSD: 680000,
    bedrooms: 5,
    bathrooms: 6,
    area_sqft: 5200,
    parking: 3,
    badge: 'Exclusive',
    badgeType: 'exclusive',
    rating: 5.0,
    reviewsCount: 24,
    image: project_img_2,
    gallery: [project_img_2, project_img_1, project_img_4],
    description: 'Bespoke triplex contemporary garden villa nestled in a quiet diplomatic perimeter. Private landscaped lawn, heated swimming pool, rooftop BBQ terrace, and solar energy backup system.',
    amenities: ['Private Garden & Lawn', 'Swimming Pool', 'Solar Generator Backup', 'Rooftop Pergola', 'Maid Suite & Quarters', 'Home Theater', 'Triple Covered Garage'],
    yearBuilt: 2023,
    agent: {
      name: 'Nusrat Jahan',
      phone: '+880 1722-556677',
      email: 'nusrat@realestate.com',
      avatar: profile_img_2
    }
  },
  {
    id: 3,
    title: 'Serenity Lakeview Suites',
    location: 'Dhanmondi 9/A, Dhaka',
    city: 'Dhaka',
    category: 'apartment',
    purpose: 'sale',
    priceBDT: '৳ 3,40,00,000',
    priceUSD: '$310,000',
    priceNum: 34000000,
    priceNumUSD: 310000,
    bedrooms: 3,
    bathrooms: 3,
    area_sqft: 2450,
    parking: 1,
    badge: 'Hot Deal',
    badgeType: 'hot',
    rating: 4.8,
    reviewsCount: 15,
    image: project_img_3,
    gallery: [project_img_3, project_img_2, project_img_5],
    description: 'Immaculately designed modern apartment facing the green walkways of Dhanmondi Lake. Abundant natural light, south-facing balconies, designer kitchen, and a vibrant neighborhood close to renowned schools.',
    amenities: ['Direct Lake View', 'South Facing Balcony', 'Rooftop Community Hall', '24/7 Security & CCTV', 'Full Power Backup', 'Fitness Gymnasium'],
    yearBuilt: 2024,
    agent: {
      name: 'Farhan Kabir',
      phone: '+880 1733-889900',
      email: 'farhan@realestate.com',
      avatar: profile_img_3
    }
  },
  {
    id: 4,
    title: 'Central Corporate Square Office',
    location: 'Kawran Bazar, Dhaka',
    city: 'Dhaka',
    category: 'commercial',
    purpose: 'rent',
    priceBDT: '৳ 2,80,000 / mo',
    priceUSD: '$2,550 / mo',
    priceNum: 280000,
    priceNumUSD: 2550,
    bedrooms: 0,
    bathrooms: 4,
    area_sqft: 4100,
    parking: 4,
    badge: 'Commercial',
    badgeType: 'commercial',
    rating: 4.7,
    reviewsCount: 9,
    image: project_img_4,
    gallery: [project_img_4, project_img_3, project_img_6],
    description: 'Grade-A commercial corporate floor plate ideal for multinational headquarters, fintech enterprises, or consulting agencies. Central HVAC, fiber-optic backbone, high-speed capsule lifts, and 100% power synchronization.',
    amenities: ['Central Air Conditioning', '4 Dedicated Parking Slots', 'Triple High-Speed Lifts', 'Server Room Provisions', 'Fire Hydrant System', '24/7 Armed Security'],
    yearBuilt: 2023,
    agent: {
      name: 'Tanvir Hossain',
      phone: '+880 1711-223344',
      email: 'tanvir@realestate.com',
      avatar: profile_img_1
    }
  },
  {
    id: 5,
    title: 'The Palm Heights Modern Duplex',
    location: 'Sector 4, Uttara, Dhaka',
    city: 'Dhaka',
    category: 'duplex',
    purpose: 'sale',
    priceBDT: '৳ 3,95,00,000',
    priceUSD: '$360,000',
    priceNum: 39500000,
    priceNumUSD: 360000,
    bedrooms: 4,
    bathrooms: 4,
    area_sqft: 3200,
    parking: 2,
    badge: 'Verified',
    badgeType: 'verified',
    rating: 4.9,
    reviewsCount: 21,
    image: project_img_5,
    gallery: [project_img_5, project_img_1, project_img_2],
    description: 'Chic modern duplex boasting double-height ceilings in the living hall, wooden spiral staircase, contemporary modular kitchen, and private terrace garden. Minutes away from the Airport and Dhaka Elevated Expressway.',
    amenities: ['Double-Height Living Hall', 'Private Terrace Garden', 'Spiral Oak Staircase', 'CCTV Surveillance', 'Children Play Zone', 'Standby Diesel Generator'],
    yearBuilt: 2024,
    agent: {
      name: 'Nusrat Jahan',
      phone: '+880 1722-556677',
      email: 'nusrat@realestate.com',
      avatar: profile_img_2
    }
  },
  {
    id: 6,
    title: 'Azure Bay Coastal Luxury Condo',
    location: 'Patenga Bay View, Chittagong',
    city: 'Chittagong',
    category: 'apartment',
    purpose: 'sale',
    priceBDT: '৳ 2,65,00,000',
    priceUSD: '$240,000',
    priceNum: 26500000,
    priceNumUSD: 240000,
    bedrooms: 3,
    bathrooms: 3,
    area_sqft: 2150,
    parking: 1,
    badge: 'Sea View',
    badgeType: 'featured',
    rating: 4.9,
    reviewsCount: 14,
    image: project_img_6,
    gallery: [project_img_6, project_img_4, project_img_5],
    description: 'Breathtaking sea-view residence overlooking the Bay of Bengal. Wake up to refreshing sea breezes and panoramic sunset vistas. Features ocean-facing balconies, infinity rooftop pool, and club membership.',
    amenities: ['Panoramic Bay View', 'Rooftop Infinity Pool', 'Residents Lounge & Cafe', 'Fitness Center', 'High-Speed Elevators', '24/7 Security'],
    yearBuilt: 2023,
    agent: {
      name: 'Farhan Kabir',
      phone: '+880 1733-889900',
      email: 'farhan@realestate.com',
      avatar: profile_img_3
    }
  },
  {
    id: 7,
    title: 'Emerald Valley Tea Estate Villa',
    location: 'Sreemangal, Sylhet',
    city: 'Sylhet',
    category: 'villa',
    purpose: 'sale',
    priceBDT: '৳ 2,15,00,000',
    priceUSD: '$195,000',
    priceNum: 21500000,
    priceNumUSD: 195000,
    bedrooms: 4,
    bathrooms: 4,
    area_sqft: 3600,
    parking: 2,
    badge: 'Eco Retreat',
    badgeType: 'exclusive',
    rating: 5.0,
    reviewsCount: 11,
    image: brand_img,
    gallery: [brand_img, project_img_1, project_img_3],
    description: 'Peaceful luxury eco-residence situated beside emerald tea gardens. Rustic stone and timber finishes combined with ultra-modern smart comforts, fruit orchard, and fresh natural springs nearby.',
    amenities: ['Tea Garden Panorama', 'Fruit Orchard & Lawn', 'Solar Power Grid', 'Outdoor Fire Pit', 'Rainwater Harvesting', 'Guest House Cottage'],
    yearBuilt: 2022,
    agent: {
      name: 'Nusrat Jahan',
      phone: '+880 1722-556677',
      email: 'nusrat@realestate.com',
      avatar: profile_img_2
    }
  },
  {
    id: 8,
    title: 'Metropolitan Studio Loft',
    location: 'Block C, Bashundhara R/A, Dhaka',
    city: 'Dhaka',
    category: 'studio',
    purpose: 'rent',
    priceBDT: '৳ 42,000 / mo',
    priceUSD: '$380 / mo',
    priceNum: 42000,
    priceNumUSD: 380,
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 850,
    parking: 1,
    badge: 'Popular Rent',
    badgeType: 'hot',
    rating: 4.8,
    reviewsCount: 32,
    image: project_img_1,
    gallery: [project_img_1, project_img_3, project_img_5],
    description: 'Fully furnished minimalist studio loft designed for tech professionals and expats. Includes ergonomic workspace, high-speed fiber internet, induction kitchenette, smart TV, and weekly housekeeping.',
    amenities: ['Fully Furnished', 'High-Speed Fiber Net', 'Gym Access', 'Underground Parking', 'Smart Lock Keyless Entry', 'Housekeeping Service'],
    yearBuilt: 2024,
    agent: {
      name: 'Farhan Kabir',
      phone: '+880 1733-889900',
      email: 'farhan@realestate.com',
      avatar: profile_img_3
    }
  },
  {
    id: 9,
    title: 'Rosewood Family Townhouse',
    location: 'Mirpur DOHS, Dhaka',
    city: 'Dhaka',
    category: 'townhouse',
    purpose: 'sale',
    priceBDT: '৳ 2,45,00,000',
    priceUSD: '$225,000',
    priceNum: 24500000,
    priceNumUSD: 225000,
    bedrooms: 4,
    bathrooms: 4,
    area_sqft: 2750,
    parking: 2,
    badge: 'Family Pick',
    badgeType: 'verified',
    rating: 4.9,
    reviewsCount: 16,
    image: project_img_3,
    gallery: [project_img_3, project_img_2, project_img_6],
    description: 'Secure, gated, community-oriented townhouse in peaceful Mirpur DOHS. Close to parks, walking trails, top schools, and modern medical centers. Perfect family living with quiet private courtyard.',
    amenities: ['Gated DOHS Community', 'Private Courtyard', 'Double Garage', '24/7 Security Gate', 'Jogging Park Nearby', 'Mosque & Community Center'],
    yearBuilt: 2023,
    agent: {
      name: 'Tanvir Hossain',
      phone: '+880 1711-223344',
      email: 'tanvir@realestate.com',
      avatar: profile_img_1
    }
  },
  {
    id: 10,
    title: 'Sunset Coastline Modern Villa',
    location: 'California Coastline, USA',
    city: 'California',
    category: 'villa',
    purpose: 'sale',
    priceBDT: '৳ 14,80,00,000',
    priceUSD: '$1,350,000',
    priceNum: 148000000,
    priceNumUSD: 1350000,
    bedrooms: 5,
    bathrooms: 6,
    area_sqft: 5800,
    parking: 3,
    badge: 'International',
    badgeType: 'exclusive',
    rating: 5.0,
    reviewsCount: 27,
    image: header_img,
    gallery: [header_img, project_img_1, project_img_4],
    description: 'Partner luxury listing: Cliffside architectural marvel overlooking the Pacific Ocean. Cantilevered infinity pool, temperature-controlled wine cellar, and open-plan Scandinavian interior.',
    amenities: ['Pacific Ocean Sunset View', 'Cantilevered Pool', 'Wine Cellar', 'Designer Chef Kitchen', 'EV Fast Charging', 'Smart Climate Systems'],
    yearBuilt: 2024,
    agent: {
      name: 'Tanvir Hossain',
      phone: '+880 1711-223344',
      email: 'tanvir@realestate.com',
      avatar: profile_img_1
    }
  },
  {
    id: 11,
    title: 'Parkview Diplomatic Residence',
    location: 'Baridhara Diplomatic Zone, Dhaka',
    city: 'Dhaka',
    category: 'apartment',
    purpose: 'rent',
    priceBDT: '৳ 1,90,00,000 / mo',
    priceUSD: '$1,720 / mo',
    priceNum: 190000,
    priceNumUSD: 1720,
    bedrooms: 3,
    bathrooms: 4,
    area_sqft: 2900,
    parking: 2,
    badge: 'Diplomatic Zone',
    badgeType: 'verified',
    rating: 4.9,
    reviewsCount: 19,
    image: project_img_5,
    gallery: [project_img_5, project_img_6, project_img_2],
    description: 'Premium embassy-grade apartment in Baridhara. Top-tier security checkpoint, sound-insulated glass, European kitchen appliances, marble bathrooms, and dedicated driver accommodation.',
    amenities: ['Embassy Zone Security', 'Soundproof Windows', 'Driver Living Quarters', 'Dedicated Substation', 'Private Rooftop Gym', 'Marble Finish'],
    yearBuilt: 2024,
    agent: {
      name: 'Nusrat Jahan',
      phone: '+880 1722-556677',
      email: 'nusrat@realestate.com',
      avatar: profile_img_2
    }
  },
  {
    id: 12,
    title: 'Manhattan Sky Loft & Terrace',
    location: 'Midtown Manhattan, New York',
    city: 'New York',
    category: 'penthouse',
    purpose: 'sale',
    priceBDT: '৳ 12,20,00,000',
    priceUSD: '$1,100,000',
    priceNum: 122000000,
    priceNumUSD: 1100000,
    bedrooms: 3,
    bathrooms: 3,
    area_sqft: 2600,
    parking: 1,
    badge: 'International',
    badgeType: 'exclusive',
    rating: 5.0,
    reviewsCount: 20,
    image: project_img_6,
    gallery: [project_img_6, project_img_3, project_img_1],
    description: 'Partner luxury listing: High-floor corner loft with 180-degree Manhattan skyline vistas. Private wraparound terrace, custom walnut cabinetry, Gaggenau appliances, and 24-hour white glove doorman.',
    amenities: ['Skyline Wraparound Terrace', '24-Hour Doorman Service', 'Valet Parking', 'Private Wine Storage', 'Spa & Wellness Suite'],
    yearBuilt: 2023,
    agent: {
      name: 'Farhan Kabir',
      phone: '+880 1733-889900',
      email: 'farhan@realestate.com',
      avatar: profile_img_3
    }
  },
  {
    id: 13,
    title: 'Azure Bayfront Luxury Villa',
    location: 'Inani Beach Road, Cox\'s Bazar',
    city: 'Chittagong',
    category: 'beachfront',
    purpose: 'sale',
    priceBDT: '৳ 4,80,00,000',
    priceUSD: '$435,000',
    priceNum: 48000000,
    priceNumUSD: 435000,
    bedrooms: 4,
    bathrooms: 4,
    area_sqft: 3400,
    parking: 2,
    badge: 'Beachfront',
    badgeType: 'exclusive',
    rating: 5.0,
    reviewsCount: 17,
    image: project_img_2,
    gallery: [project_img_2, project_img_6, project_img_4],
    description: 'Direct beachfront villa with unobstructed views of the golden sands and rolling waves of the Bay of Bengal. Private sundeck, tropical garden, infinity pool, and round-the-clock security.',
    amenities: ['Direct Beach Access', 'Infinity Plunge Pool', 'Panoramic Ocean Terrace', 'Solar Hybrid Power', '24/7 Security Patrol'],
    yearBuilt: 2024,
    agent: {
      name: 'Tanvir Hossain',
      phone: '+880 1711-223344',
      email: 'tanvir@realestate.com',
      avatar: profile_img_1
    }
  },
  {
    id: 14,
    title: 'Sreemangal Organic Eco Farmhouse',
    location: 'Tea Garden Perimeter, Sreemangal',
    city: 'Sylhet',
    category: 'farmhouse',
    purpose: 'sale',
    priceBDT: '৳ 1,75,00,000',
    priceUSD: '$160,000',
    priceNum: 17500000,
    priceNumUSD: 160000,
    bedrooms: 3,
    bathrooms: 3,
    area_sqft: 2800,
    parking: 2,
    badge: 'Eco Farm',
    badgeType: 'verified',
    rating: 4.9,
    reviewsCount: 13,
    image: brand_img,
    gallery: [brand_img, project_img_3, project_img_5],
    description: 'Serene farmhouse surrounded by organic fruit orchards, lemon groves, and natural freshwater streams. Constructed with eco-treated timber and stone, complete with solar power and deep tubewell.',
    amenities: ['Organic Fruit Orchard', 'Natural Freshwater Stream', 'Deep Tubewell & Filtration', 'Solar Hybrid System', 'Caretaker Cottage'],
    yearBuilt: 2023,
    agent: {
      name: 'Nusrat Jahan',
      phone: '+880 1722-556677',
      email: 'nusrat@realestate.com',
      avatar: profile_img_2
    }
  },
  {
    id: 15,
    title: 'Sonargaon Heritage Colonial Mansion',
    location: 'Heritage Highway, Narayanganj',
    city: 'Dhaka',
    category: 'heritage',
    purpose: 'sale',
    priceBDT: '৳ 6,20,00,000',
    priceUSD: '$560,000',
    priceNum: 62000000,
    priceNumUSD: 560000,
    bedrooms: 6,
    bathrooms: 6,
    area_sqft: 6100,
    parking: 4,
    badge: 'Heritage',
    badgeType: 'featured',
    rating: 5.0,
    reviewsCount: 19,
    image: header_img,
    gallery: [header_img, project_img_1, project_img_5],
    description: 'Stately neoclassical colonial-inspired mansion featuring grand pillars, double-curved royal staircase, high ceilings, private lake ghat, and lush manicured lawn garden.',
    amenities: ['Neoclassical Architecture', 'Private Lake Ghat', 'Manicured 1-Bigha Lawn', 'Grand Foyer & Chandelier', 'Quadruple Garage'],
    yearBuilt: 2022,
    agent: {
      name: 'Farhan Kabir',
      phone: '+880 1733-889900',
      email: 'farhan@realestate.com',
      avatar: profile_img_3
    }
  }
]

export const categoriesData = [
  { id: 'all', name: 'All Properties', count: '120+', icon: '🏢' },
  { id: 'apartment', name: 'Modern Apartments', count: '54+', icon: '🏙️' },
  { id: 'villa', name: 'Luxury Villas', count: '28+', icon: '🏡' },
  { id: 'penthouse', name: 'Penthouses', count: '16+', icon: '✨' },
  { id: 'duplex', name: 'Duplex Homes', count: '19+', icon: '🏘️' },
  { id: 'commercial', name: 'Commercial & Offices', count: '22+', icon: '🏬' },
  { id: 'studio', name: 'Studio Lofts', count: '14+', icon: '🛋️' },
  { id: 'townhouse', name: 'Townhouses', count: '18+', icon: '🏠' },
  { id: 'beachfront', name: 'Beach & Lakefront', count: '12+', icon: '🌊' },
  { id: 'farmhouse', name: 'Eco Farmhouses', count: '9+', icon: '🌿' },
  { id: 'heritage', name: 'Heritage Estates', count: '7+', icon: '🏰' },
]

export const neighborhoodsData = [
  {
    name: 'Gulshan & Banani',
    city: 'Dhaka',
    count: '45 Properties',
    avgPrice: '৳ 4.8 Cr avg',
    tag: 'Elite & Diplomatic',
    image: project_img_1
  },
  {
    name: 'Dhanmondi Lakeview',
    city: 'Dhaka',
    count: '32 Properties',
    avgPrice: '৳ 3.1 Cr avg',
    tag: 'Lakeside & Culture',
    image: project_img_3
  },
  {
    name: 'Uttara & Expressways',
    city: 'Dhaka',
    count: '28 Properties',
    avgPrice: '৳ 2.6 Cr avg',
    tag: 'Planned Living',
    image: project_img_5
  },
  {
    name: 'Patenga & Port Zone',
    city: 'Chittagong',
    count: '18 Properties',
    avgPrice: '৳ 2.2 Cr avg',
    tag: 'Sea View Living',
    image: project_img_6
  },
  {
    name: 'Tea Gardens & Valley',
    city: 'Sylhet',
    count: '15 Properties',
    avgPrice: '৳ 1.9 Cr avg',
    tag: 'Scenic & Peaceful',
    image: project_img_2
  },
  {
    name: 'Coastal & Global Hubs',
    city: 'USA / Overseas',
    count: '12 Properties',
    avgPrice: '$1.1M avg',
    tag: 'Global Luxury',
    image: header_img
  }
]

export const teamMembersData = [
  {
    name: 'Tariqul Islam',
    role: 'Founder & Managing Director',
    bio: 'Over 18 years in prime real estate development and investment banking. Led the successful delivery of 60+ residential and commercial projects across Bangladesh.',
    image: profile_img_1,
    experience: '18+ Years',
    social: { linkedin: '#', email: 'tariqul@realestate.com' }
  },
  {
    name: 'Maria Nazmin',
    role: 'Chief Architect & Head of Design',
    bio: 'Award-winning master of sustainable architecture. Specializes in biophilic building designs, natural ventilation systems, and luxury interior planning.',
    image: profile_img_2,
    experience: '12+ Years',
    social: { linkedin: '#', email: 'maria@realestate.com' }
  },
  {
    name: 'Aminur Rahman Bhuiya',
    role: 'Head of Property Advisory & Valuation',
    bio: 'Certified chartered surveyor and real estate consultant. Trusted advisor to top corporate conglomerates, diplomats, and high-net-worth property investors.',
    image: profile_img_3,
    experience: '15+ Years',
    social: { linkedin: '#', email: 'aminur@realestate.com' }
  },
  {
    name: 'Barrister Farhana Khan',
    role: 'Chief Legal Officer & Due Diligence',
    bio: 'Supreme Court advocate specializing in real estate title searches, land vetting, RAJUK approvals, and safe purchase contracts for our clients.',
    image: profile_img_2,
    experience: '14+ Years',
    social: { linkedin: '#', email: 'farhana@realestate.com' }
  }
]

export const companyMilestones = [
  {
    year: '2010',
    title: 'Humble Beginnings',
    desc: 'Founded with a small team in Gulshan, dedicated to bringing honest pricing and transparent paperwork to property buyers.'
  },
  {
    year: '2015',
    title: '500+ Homes Milestone',
    desc: 'Surpassed 500 happy homeowners settled and expanded dedicated agency services into Chittagong and Sylhet.'
  },
  {
    year: '2019',
    title: 'Virtual 3D Tours Innovation',
    desc: 'Pioneered full 360-degree virtual property walkthroughs and digital documentation for NRB and overseas clients.'
  },
  {
    year: '2023',
    title: 'National Real Estate Award',
    desc: 'Awarded "Most Trusted Real Estate Agency" for outstanding client satisfaction, zero litigation record, and transparent deals.'
  },
  {
    year: '2025+',
    title: 'Global Partnerships',
    desc: 'Forged premier cross-border partnerships across the US and Middle East while serving over 2,500 happy families.'
  }
]

export const companyValues = [
  {
    icon: '🛡️',
    title: '100% Legal Title Guarantee',
    desc: 'Every single listing undergoes rigorous 25-point legal due diligence by our in-house legal team before going live.'
  },
  {
    icon: '💎',
    title: 'Zero Hidden Markups',
    desc: 'Complete financial transparency. What you see is what you pay, with detailed cost breakdowns for registry and stamp duty.'
  },
  {
    icon: '🕶️',
    title: 'Virtual & Guided 3D Walkthroughs',
    desc: 'Experience full digital tours from the comfort of your home before stepping foot on site, saving valuable time.'
  },
  {
    icon: '🤝',
    title: 'Dedicated Client Concierge',
    desc: 'From initial search to bank loan processing and key handover, your personal advisor stands by your side at every step.'
  }
]

export const awardsData = [
  { title: 'Best Customer Trust Agency', year: '2024', org: 'Bangladesh Real Estate Forum' },
  { title: 'Excellence in Sustainable Architecture', year: '2023', org: 'South Asian Urban Institute' },
  { title: 'Top NRB Property Facilitator', year: '2023', org: 'Global Diaspora Real Estate Summit' },
  { title: 'Certified Green Building Partner', year: '2022', org: 'Green Architecture Council' }
]

export const servicesData = [
  {
    icon: '🏡',
    title: 'Residential Buying & Selling',
    desc: 'Tailored property matching for families, first-time buyers, and luxury seekers with verified legal titles and smooth registration.'
  },
  {
    icon: '🔑',
    title: 'Premium Rental & Leasing',
    desc: 'End-to-end tenant screening, lease agreement drafting, rent collection, and hassle-free property handover.'
  },
  {
    icon: '🏢',
    title: 'Commercial Office & Retail Advisory',
    desc: 'Strategic commercial floor leasing, retail space acquisition, and headquarters selection for corporate growth.'
  },
  {
    icon: '⚖️',
    title: 'Legal Vetting & Title Verification',
    desc: 'Comprehensive land history checks, RAJUK clearance, power of attorney scrutiny, and mutation verification.'
  },
  {
    icon: '💰',
    title: 'Home Loan & Mortgage Assistance',
    desc: 'Partnerships with 14+ leading banks for fast loan pre-approvals, lowest interest rates, and seamless bank paperwork.'
  },
  {
    icon: '📐',
    title: 'Architecture & Interior Styling',
    desc: 'Turnkey interior architecture, 3D renderings, and space optimization to turn any property into your dream sanctuary.'
  }
]

export const faqsData = [
  {
    q: 'How does your agency verify the legal safety of properties?',
    a: 'Every property listed on our platform passes through our 25-point legal audit conducted by senior Supreme Court advocates. We verify land ownership chains, mutation records, non-encumbrance certificates, RAJUK/CDA architectural approvals, and ensure there is zero pending litigation.'
  },
  {
    q: 'Can NRBs (Non-Resident Bangladeshis) or overseas buyers purchase through you?',
    a: 'Yes, absolutely! Over 35% of our clients reside in North America, Europe, Australia, and the Middle East. We provide 3D virtual walkthroughs, video consultations, secure digital documentation, and handle power-of-attorney registration smoothly.'
  },
  {
    q: 'Do you charge any hidden brokerage fees or extra charges?',
    a: 'None whatsoever. We maintain strict pricing transparency. All service fees, government stamp duties, and registry costs are itemized and explained in detail before you commit to any transaction.'
  },
  {
    q: 'Can you help me secure a home loan with low interest rates?',
    a: 'Yes! We have preferential partnership agreements with top retail banks and financial institutions in Bangladesh. Our dedicated home loan desk assists you with documentation, credit profiling, and expedites approvals within 7-10 business days.'
  },
  {
    q: 'Can I schedule an in-person or virtual property tour?',
    a: 'Yes! You can book an in-person tour or a live guided video walkthrough directly through our website or by contacting our advisor team. One of our specialists will accompany you and answer all your technical questions.'
  }
]

export const testimonialsData = [
  {
    name: 'Sami Hasan',
    title: 'Head of Marketing, Tech Corp',
    location: 'Gulshan, Dhaka',
    image: profile_img_1,
    alt: 'Portrait of Sami Hasan',
    rating: 5,
    text: 'Finding an authentic lake-view penthouse in Gulshan felt impossible until I worked with this team. They walked me through every legal deed, negotiated transparently with the developer, and handled all registration paperwork effortlessly.'
  },
  {
    name: 'Maria Nazmin',
    title: 'Principal UI/UX Designer',
    location: 'Banani, Dhaka',
    image: profile_img_2,
    alt: 'Portrait of Maria Nazmin',
    rating: 5,
    text: 'As an architect, structural integrity and natural lighting matter deeply to me. The team listened to my exact design criteria and showed me homes that genuinely matched my lifestyle. Outstanding professionalism and zero pressure!'
  },
  {
    name: 'Aminur Rahman Tahsin',
    title: 'Co-Founder & Angel Investor',
    location: 'California & Dhaka',
    image: profile_img_3,
    alt: 'Portrait of Aminur Rahman',
    rating: 5,
    text: 'Being an NRB living in Silicon Valley, investing back home required immense trust. Their 3D virtual walkthroughs, live drone footage, and dedicated legal team gave me 100% confidence. Closed our dream property without any hassle!'
  },
  {
    name: 'Dr. Shahriar Alam & Dr. Nafisa',
    title: 'Senior Medical Specialists',
    location: 'Dhanmondi, Dhaka',
    image: profile_img_1,
    alt: 'Portrait of Dr. Shahriar',
    rating: 5,
    text: 'We were looking for a peaceful family home near Dhanmondi Lake for our parents and children. The team was extraordinarily patient, organized 5 viewings, and helped us secure bank financing at the best market rate.'
  }
]
>>>>>>> 9c75aec (Update Real Estate project)
