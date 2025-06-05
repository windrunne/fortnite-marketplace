export interface Product {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  vendorName: string;
  features: {
    instant: boolean;
    rare: boolean;
    platforms: string[];
  };
  isCertified: boolean;
  hasVideo: boolean;
  isInstant: boolean;
  rarity: string;
  platforms: string[];
}

export interface FilterState {
  search: string;
  priceRange: {
    min: number;
    max: number;
  };
  deliverySpeed: string;
  certifiedVideo: boolean;
} 