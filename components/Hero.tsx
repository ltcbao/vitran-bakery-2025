
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      <img src="/images/hero-background.jpg" alt="Artisan bread and pastries" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-20 text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold drop-shadow-lg mb-4">
          Baked with Love, Served with Joy
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md mb-8">
          Experience the warmth and aroma of freshly baked goods, crafted daily from the finest ingredients.
        </p>
        <a href="#menu" className="bg-brand-accent text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg">
          Explore Our Menu
        </a>
      </div>
    </section>
  );
};

export default Hero;
