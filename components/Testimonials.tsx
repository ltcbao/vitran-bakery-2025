
import React from 'react';
import type { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    quote: "This is hands down the best bakery I've ever been to. The sourdough is life-changing, and the atmosphere is so warm and welcoming. A true neighborhood gem!",
    author: 'Sarah L.',
  },
  {
    quote: "I ordered my wedding cake from The Artisan Bakery, and it was an absolute dream. Not only was it stunning, but it was the most delicious cake I've ever tasted.",
    author: 'Jessica M.',
  },
  {
    quote: "The croissants are pure magic. Flaky, buttery perfection. I make it a point to stop by every weekend for my coffee and croissant fix. Highly recommend!",
    author: 'David R.',
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-brand-cream p-8 rounded-lg shadow-md border border-brand-pink">
    <p className="text-gray-700 italic text-lg mb-6">"{testimonial.quote}"</p>
    <p className="text-brand-brown font-bold font-serif text-right">- {testimonial.author}</p>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-brown">Words from Our Customers</h2>
          <p className="text-lg text-gray-700 mt-2">We love our community, and they love our baking!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
