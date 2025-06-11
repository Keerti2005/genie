
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  ecoScore: number;
  isGreenerChoice: boolean;
  description: string;
  sustainability: string[];
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  brand: string;
  ecoScore: number;
  sortBy: 'name' | 'price-low' | 'price-high' | 'eco-score' | 'rating';
}
