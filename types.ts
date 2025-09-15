export interface Product {
  name: string;
  description: string;
  imageUrls: string[];
  category: 'Bread' | 'Pastry' | 'Cookie';
}

export interface RawMenuItem {
  name: string;
  description: string;
  slug: string;
  imageCount: number;
  category: 'Bread' | 'Pastry' | 'Cookie';
  folder: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}