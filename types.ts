export interface Product {
  name: string;
  description: string;
  imageUrls: string[];
  category: 'Bread' | 'Pastry' | 'Cookie';
}

export interface Testimonial {
  quote: string;
  author: string;
}
