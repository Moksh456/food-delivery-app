export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  rating: number;
  rating_count: number;
  delivery_time: string;
  delivery_fee: number;
  price_level: number;
  image_url: string;
  cover_url: string;
  location: string;
  promoted: boolean;
  pure_veg: boolean;
  created_at: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_veg: boolean;
  is_bestseller: boolean;
  rating: number;
  created_at: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}
