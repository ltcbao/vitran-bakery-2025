export interface Product {
  name: string;
  description: string;
  imageUrls: string[];
  category: 'Bánh Kem' | 'Rau Câu' | 'Bánh Ngọt';
}

export interface RawMenuItem {
  name: string;
  description: string;
  imageFiles: string[];
  category: 'Bánh Kem' | 'Rau Câu' | 'Bánh Ngọt';
  folder: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}