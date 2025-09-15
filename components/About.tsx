import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About: React.FC = () => {
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="/images/about-baker.jpg" 
              alt="Baker kneading dough" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-serif font-bold text-brand-brown mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in a small kitchen with a big dream, The Artisan Bakery began with a simple passion: to bring people together through the joy of baking. We believe in time-honored techniques, quality ingredients, and a touch of creativity in every loaf, pastry, and cake we create.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our bakers arrive before sunrise to ensure every item is as fresh as possible. From our sourdough starter, "Dough-lly Parton," to our hand-laminated croissants, we pour our hearts into our craft. We're more than just a bakery; we're a cornerstone of the community, a place for celebration, and a source of daily comfort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
