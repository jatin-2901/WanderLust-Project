const sampleListings = [
  {
    title: "Chic Minimalist Studio Downtown",
    description: "Compact and modern private studio in the city center, walking distance to metro stations and cafes.",
    image: {
      filename: "room-studio",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    },
    price: 1800,
    location: "Bangalore",
    country: "India",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [77.5946, 12.9716] // [Longitude, Latitude]
    },
    category: "room",
    reviews: []
  },
  {
    title: "Glass Igloo Under the Aurora",
    description: "Sleep beneath the dancing Northern Lights in a climate-controlled glass dome with thermal heated floors.",
    image: {
      filename: "arctic-igloo",
      url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80"
    },
    price: 32000,
    location: "Tromsø",
    country: "Norway",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [18.9553, 69.6492]
    },
    category: "arctic",
    reviews: []
  },
  {
    title: "Organic Olive Grove Farmstay",
    description: "Experience rustic countryside living surrounded by rolling hills, olive groves, and fresh farm-to-table breakfast.",
    image: {
      filename: "tuscan-farm",
      url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80"
    },
    price: 7500,
    location: "Tuscany",
    country: "Italy",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [11.2558, 43.7696]
    },
    category: "farms",
    reviews: []
  },
  {
    title: "Sunset Cliffside Villa",
    description: "Direct beach access with panoramic sea views, open-air sunbeds, and crashing waves right outside your terrace.",
    image: {
      filename: "beach-villa",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
    },
    price: 18500,
    location: "Goa",
    country: "India",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [73.7431, 15.5954]
    },
    category: "beach",
    reviews: []
  },
  {
    title: "Secluded Pine Forest A-Frame",
    description: "Cozy timber cabin nestled deep inside pine woods, featuring a wood-burning fireplace and hot tub on the deck.",
    image: {
      filename: "aframe-cabin",
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"
    },
    price: 6200,
    location: "Manali",
    country: "India",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2432]
    },
    category: "cabins",
    reviews: []
  },
  {
    title: "Historic 16th-Century Highland Castle",
    description: "Live like royalty in a restored medieval fortress featuring banquet halls, turrets, and landscaped estate gardens.",
    image: {
      filename: "scottish-castle",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=1200&q=80"
    },
    price: 65000,
    location: "Edinburgh",
    country: "United Kingdom",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [-3.1883, 55.9533]
    },
    category: "castles",
    reviews: []
  },
  {
    title: "Luxury 50ft Catamaran Charter",
    description: "Sail crystal-clear island bays aboard a fully-crewed yacht equipped with paddleboards, dining deck, and en-suite cabins.",
    image: {
      filename: "luxury-yacht",
      url: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80"
    },
    price: 85000,
    location: "Dubrovnik",
    country: "Croatia",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [18.0944, 42.6507]
    },
    category: "yacht",
    reviews: []
  },
  {
    title: "Geodesic Stargazing Desert Dome",
    description: "Off-grid luxury dome with clear panoramic panels, outdoor fire pit, and telescopes for stargazing.",
    image: {
      filename: "desert-dome",
      url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80"
    },
    price: 11500,
    location: "Wadi Rum",
    country: "Jordan",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [35.4344, 29.5736]
    },
    category: "domes",
    reviews: []
  },
  {
    title: "Heritage Haveli Facing the Taj Mahal",
    description: "Rooftop room with an unobstructed direct view of the Taj Mahal dome, furnished in handcrafted Mughal architecture.",
    image: {
      filename: "monument-view",
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80"
    },
    price: 14000,
    location: "Agra",
    country: "India",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [78.0421, 27.1751]
    },
    category: "monuments",
    reviews: []
  },
  {
    title: "Sunlit Loft with Professional Photo Studio",
    description: "Industrial loft with floor-to-ceiling skylights, backdrops, and lighting gear designed for creators and photographers.",
    image: {
      filename: "photo-studio-loft",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    },
    price: 5200,
    location: "Berlin",
    country: "Germany",
    owner: "6abfbccbd31e5f62dde57335",
    geometry: {
      type: "Point",
      coordinates: [13.4050, 52.5200]
    },
    category: "photography",
    reviews: []
  }
];

module.exports = sampleListings;