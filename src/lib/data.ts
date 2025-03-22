// Mock data for development
export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  size: number;
  sqft: number;
  spaceSize: number;
  capacity: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  features: string[];
  images: string[];
  type: 'Office' | 'Co-Working' | 'Serviced Office';
  status: 'Available' | 'Pending' | 'Leased';
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
  title: "Workspace Solutions Specialist",
  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  bio: "With over 15 years of experience in the commercial real estate market, I specialize in finding the perfect workspace solutions for modern businesses. My approach combines industry expertise with personalized service to match your company with the ideal office environment.",
  phone: "(555) 123-4567",
  email: "alex.mg@workspace.com",
  social: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com"
  },
  credentials: [
    "Certified Commercial Space Specialist",
    "Top Commercial Agent Award",
    "MBA in Business Administration"
  ]
};

export const properties: Property[] = [
  {
    id: "p1",
    title: "Premium Executive Office Suite",
    address: "123 Business Avenue, Financial District",
    price: 2500,
    size: 500,
    sqft: 500,
    spaceSize: 500,
    capacity: 10,
    bathrooms: 2,
    amenities: ["High-speed Internet", "Conference Room", "Reception Services", "Kitchen"],
    description: "A prestigious corner office suite with panoramic city views, featuring modern design and premium finishes. Fully furnished with ergonomic workstations and access to state-of-the-art meeting facilities.",
    features: ["24/7 Access", "Smart Office Technology", "Private Executive Suite", "Dedicated Receptionist", "Covered Parking"],
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"],
    type: "Office",
    status: "Available"
  },
  {
    id: "p2",
    title: "Modern Co-working Space",
    address: "456 Innovation Lane, Tech District",
    price: 350,
    size: 2000,
    sqft: 2000,
    spaceSize: 2000,
    capacity: 50,
    bathrooms: 4,
    amenities: ["Fiber Internet", "Phone Booths", "Free Coffee", "Printing Services"],
    description: "A vibrant co-working space designed for productivity and collaboration. Features hot desks, private booths, and breakout areas for teams of all sizes. Monthly membership includes all utilities and amenities.",
    features: ["Hot Desks", "Private Phone Booths", "Community Events", "Networking Opportunities", "Mail Handling"],
    images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"],
    type: "Co-Working",
    status: "Available"
  },
  {
    id: "p3",
    title: "Creative Studio Office",
    address: "789 Design Way, Arts District",
    price: 1800,
    size: 800,
    sqft: 800,
    spaceSize: 800,
    capacity: 15,
    bathrooms: 2,
    amenities: ["Natural Lighting", "Exposed Brick", "Rooftop Access", "Bike Storage"],
    description: "Open concept studio space perfect for creative agencies and design teams. Features industrial elements with modern comforts including soundproofed meeting spaces and a collaborative layout.",
    features: ["Polished Concrete Floors", "High Ceilings", "Meeting Pods", "Dedicated Kitchen", "Loading Dock"],
    images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"],
    type: "Office",
    status: "Available"
  },
  {
    id: "p4",
    title: "Industrial Loft Office",
    address: "202 Factory Road, Warehouse District",
    price: 2200,
    size: 1200,
    sqft: 1200,
    spaceSize: 1200,
    capacity: 20,
    bathrooms: 2,
    amenities: ["Freight Elevator", "Loading Dock", "High Ceilings", "Outdoor Space"],
    description: "Converted industrial loft with abundant natural light, exposed ductwork, and original brick walls. Flexible open floor plan ideal for creative businesses looking for unique character.",
    features: ["Polished Concrete", "Exposed Ductwork", "Freight Access", "Private Entrance", "Outdoor Terrace"],
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"],
    type: "Office",
    status: "Available"
  },
  {
    id: "p5",
    title: "Corporate Headquarters",
    address: "303 Executive Plaza, Business Park",
    price: 10000,
    size: 5000,
    sqft: 5000,
    spaceSize: 5000,
    capacity: 100,
    bathrooms: 6,
    amenities: ["Dedicated Floor", "Executive Offices", "Conference Center", "Security"],
    description: "Full-floor office space suitable for corporate headquarters. Features a mix of executive offices, open work areas, multiple conference rooms, and staff amenities. Building includes secure access and parking.",
    features: ["Private Floor", "Executive Suites", "Board Room", "Staff Cafeteria", "Secure Access"],
    images: ["https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"],
    type: "Serviced Office",
    status: "Available"
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    role: "CEO, Innovation Tech",
    content: "Alex found us the perfect office space that aligned with our company culture. The co-working option gave us flexibility during our growth phase, and the dedicated support made the transition seamless.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
    rating: 5
  },
  {
    id: "t2",
    name: "Michael Chen",
    role: "Director, Global Finance Group",
    content: "The virtual office solution has transformed how our remote team operates. Having a prestigious address and professional call handling has elevated our brand image while keeping overhead costs minimal.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    rating: 5
  },
  {
    id: "t3",
    name: "Emily Torres",
    role: "Founder, Design Collective",
    content: "As a creative startup, we needed a space that inspired our team while remaining practical. The studio office Alex found perfectly balanced aesthetics with functionality, helping us attract both talent and clients.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFjZXxlbnwwfDF8MHx8fDA%3D",
    rating: 5
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Rise of Flexible Workspaces in Corporate Culture",
    excerpt: "How flexible office solutions are transforming traditional corporate environments and boosting productivity and employee satisfaction.",
    coverImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    date: "2023-09-15",
    readTime: "5 min read",
    category: "Workplace Trends"
  },
  {
    id: "b2",
    title: "Virtual Offices: Professional Presence Without the Overhead",
    excerpt: "A comprehensive guide to virtual office solutions and how they provide small businesses with the benefits of a commercial address at a fraction of the cost.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    date: "2023-08-28",
    readTime: "7 min read",
    category: "Virtual Solutions"
  },
  {
    id: "b3",
    title: "Designing Collaborative Spaces for Maximum Innovation",
    excerpt: "How thoughtful office design can encourage collaboration, creativity, and problem-solving in modern workplaces.",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    date: "2023-07-12",
    readTime: "6 min read",
    category: "Office Design"
  }
];