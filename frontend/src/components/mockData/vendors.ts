export interface Vendor {
  id: string;
  name: string;
  email: string;
  description: string;
  location: string;
  established: number;
  totalProducts: number;
  rating: number;
  image: string;
  bannerImage: string;
  specialties: string[];
  certifications: string[];
  story: string;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  revenue: string;
  products: number;
}

export const vendors: Vendor[] = [
  {
    id: "vendor1",
    name: "Heritage Weavers",
    email: "contact@heritageweavers.com",
    description: "Traditional handloom weavers specializing in organic cotton textiles with over 50 years of experience in sustainable textile production.",
    location: "Rajasthan, India",
    established: 1970,
    totalProducts: 45,
    rating: 4.8,
    image: "/assets/images/general/vn1.jpg",
    bannerImage: "/assets/images/general/vn1.jpg",
    specialties: ["Handloom Weaving", "Organic Cotton", "Natural Dyes", "Traditional Patterns"],
    certifications: ["Fair Trade", "Organic Certified", "Handloom Mark", "GOTS Certified"],
    story: "Heritage Weavers was founded by master weaver Ramesh Kumar in 1970. What started as a small family business has grown into a cooperative of 50+ skilled artisans, all committed to preserving traditional weaving techniques while embracing sustainable practices. Our textiles are made using time-honored methods passed down through generations.",
    status: 'active',
    joinDate: '2023-01-15',
    revenue: '$45,230',
    products: 45
  },
  {
    id: "vendor2", 
    name: "Traditional Crafts Co.",
    email: "info@traditionalcrafts.com",
    description: "Artisan collective creating exquisite embroidered linens and home textiles using ancestral techniques from Gujarat.",
    location: "Gujarat, India",
    established: 1985,
    totalProducts: 32,
    rating: 4.9,
    image: "/assets/images/general/vn2.jpg",
    bannerImage: "/assets/images/general/vn2.jpg",
    specialties: ["Hand Embroidery", "Linen Textiles", "Mirror Work", "Block Printing"],
    certifications: ["Artisan Certified", "Fair Trade", "Cultural Heritage", "Eco-Friendly"],
    story: "Traditional Crafts Co. represents a collective of women artisans from rural Gujarat who have mastered the art of intricate embroidery and mirror work. Founded in 1985, our cooperative empowers local communities while preserving cultural textile traditions that date back centuries.",
    status: 'active',
    joinDate: '2023-02-20',
    revenue: '$32,150',
    products: 32
  },
  {
    id: "vendor3",
    name: "Eco Traditional",
    email: "hello@ecotraditional.com", 
    description: "Sustainable textile innovators combining traditional weaving with eco-friendly bamboo and hemp fibers.",
    location: "Kerala, India",
    established: 2010,
    totalProducts: 28,
    rating: 4.6,
    image: "/assets/images/general/vn3.jpg",
    bannerImage: "/assets/images/general/vn3.jpg",
    specialties: ["Bamboo Textiles", "Hemp Weaving", "Sustainable Materials", "Eco Innovation"],
    certifications: ["Organic Certified", "Sustainable Textile", "Carbon Neutral", "Fair Trade"],
    story: "Eco Traditional was born from a vision to merge ancient weaving wisdom with modern sustainability. Founded in 2010 by environmental scientist Dr. Priya Nair, we work with local communities in Kerala to create beautiful textiles using bamboo, hemp, and other sustainable fibers while maintaining traditional craftsmanship.",
    status: 'pending',
    joinDate: '2023-03-10',
    revenue: '$28,890',
    products: 28
  }
];