export interface Product {
  name: string;
  description: string;
  imageUrls: string[];
  category: 'Bánh Kem' | 'Rau Câu' | 'Bánh Ngọt' | 'Bánh Trung Thu';
}

export interface RawMenuItem {
  name: string;
  description: string;
  imageFiles: string[];
  category: 'Bánh Kem' | 'Rau Câu' | 'Bánh Ngọt' | 'Bánh Trung Thu';
  folder: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}