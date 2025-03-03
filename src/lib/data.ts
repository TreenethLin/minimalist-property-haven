
// Mock data for development
export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  features: string[];
  images: string[];
  type: 'For Sale' | 'For Rent';
  status: 'Available' | 'Pending' | 'Sold';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
  category: string;
}

export interface Agent {
  name: string;
  title: string;
  image: string;
  bio: string;
  phone: string;
  email: string;
  social: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  credentials: string[];
}

export const agent: Agent = {
  name: "Alex Morgan",
  title: "Senior Real Estate Consultant",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  bio: "With over 15 years of experience in the luxury real estate market, I specialize in finding the perfect properties for discerning clients. My approach combines industry expertise with personalized service.",
  phone: "(555) 123-4567",
  email: "alex@modernestates.com",
  social: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com"
  },
  credentials: [
    "Certified Luxury Home Marketing Specialist",
    "Top 1% of Realtors Nationwide",
    "MBA in Real Estate Finance"
  ]
};

export const properties: Property[] = [
  {
    id: "p1",
    title: "Modern Minimalist Villa",
    address: "123 Architect Avenue, Design District",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2850,
    description: "An architectural masterpiece featuring floor-to-ceiling windows, open concept living spaces, and premium finishes throughout. The property includes a private garden and rooftop terrace with panoramic city views.",
    features: ["Smart Home System", "Floor-to-ceiling Windows", "Chef's Kitchen", "Heated Floors", "Rooftop Terrace"],
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
    type: "For Sale",
    status: "Available"
  },
  {
    id: "p2",
    title: "Industrial Loft Apartment",
    address: "456 Warehouse Lane, Arts District",
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1850,
    description: "Authentic industrial loft featuring exposed brick walls, concrete floors, and original timber beams. This renovated space offers modern conveniences while preserving its historic character.",
    features: ["Exposed Brick", "High Ceilings", "Original Timber Beams", "Custom Lighting", "Kitchen Island"],
    images: ["https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
    type: "For Sale",
    status: "Available"
  },
  {
    id: "p3",
    title: "Scandinavian-Inspired Townhouse",
    address: "789 Nordic Way, North End",
    price: 4500,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2100,
    description: "Light-filled townhouse with clean lines and minimalist design throughout. Features include a custom kitchen, built-in storage solutions, and a private courtyard garden.",
    features: ["Natural Materials", "Custom Cabinetry", "Courtyard Garden", "Wood Flooring", "Energy Efficient"],
    images: ["https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2425&q=80"],
    type: "For Rent",
    status: "Available"
  },
  {
    id: "p4",
    title: "Contemporary Urban Residence",
    address: "101 Metropolitan Drive, Downtown",
    price: 1650000,
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 2400,
    description: "Sleek urban residence located in the heart of downtown, offering the perfect blend of luxury and convenience. Features high-end finishes, premium appliances, and stunning city views.",
    features: ["Concierge Service", "Fitness Center", "Wine Cellar", "Private Balcony", "EV Charging"],
    images: ["https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
    type: "For Sale",
    status: "Pending"
  },
  {
    id: "p5",
    title: "Converted Warehouse Studio",
    address: "202 Factory Road, Industrial Quarter",
    price: 2800,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 1200,
    description: "Stylish studio apartment in a converted warehouse featuring polished concrete floors, steel-framed windows, and custom built-ins. The perfect urban retreat for the design-conscious.",
    features: ["Polished Concrete", "Steel Windows", "Custom Shelving", "Industrial Lighting", "Open Plan"],
    images: ["https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2384&q=80"],
    type: "For Rent",
    status: "Available"
  },
  {
    id: "p6",
    title: "Mid-Century Modern Residence",
    address: "303 Eames Circle, West Hills",
    price: 1890000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2950,
    description: "Authentic mid-century modern home with period details and thoughtful updates. Features include walls of glass, a central atrium, and original terrazzo floors throughout.",
    features: ["Terrazzo Floors", "Central Atrium", "Walls of Glass", "Original Fireplace", "Landscaped Garden"],
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"],
    type: "For Sale",
    status: "Available"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "Alex's attention to detail and understanding of my specific needs made all the difference. Within three weeks, I had found my dream home and closed the deal seamlessly.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
    rating: 5
  },
  {
    id: "t2",
    name: "Michael Chen",
    role: "Property Investor",
    content: "Working with Alex has transformed my investment strategy. Their market insights and negotiation skills have consistently secured properties with excellent ROI potential.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    rating: 5
  },
  {
    id: "t3",
    name: "Emily Torres",
    role: "First-time Buyer",
    content: "As someone new to the real estate market, I was intimidated by the process. Alex guided me through every step with patience and expertise, finding me a perfect starter home within my budget.",
    image: "https://images.unsplash.com/photo-1619855544858-e05e60f7526b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    rating: 5
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Rise of Minimalist Architecture in Urban Homes",
    excerpt: "Exploring how minimalist design principles are reshaping urban residential architecture and creating spaces that prioritize functionality and wellbeing.",
    coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    date: "2023-09-15",
    readTime: "5 min read",
    category: "Architecture"
  },
  {
    id: "b2",
    title: "Investment Potential: Converting Industrial Spaces to Residential",
    excerpt: "A look at the financial opportunities and design considerations when transforming former industrial buildings into distinctive residential properties.",
    coverImage: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    date: "2023-08-28",
    readTime: "7 min read",
    category: "Investment"
  },
  {
    id: "b3",
    title: "Sustainable Materials in Modern Home Construction",
    excerpt: "Examining eco-friendly building materials that don't compromise on aesthetic appeal for the environmentally conscious homeowner.",
    coverImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
    date: "2023-07-12",
    readTime: "6 min read",
    category: "Sustainability"
  }
];
