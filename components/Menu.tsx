import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import Spinner from './Spinner';

// Raw data for menu items. Image URLs are generated from this.
const rawMenuItems = [
  {
    name: 'Artisan Sourdough',
    description: 'A rustic loaf with a chewy crust and a soft, tangy interior. Perfect for any meal.',
    slug: 'sourdough',
    imageCount: 3,
    category: 'Bread',
  },
  {
    name: 'Seeded Whole Wheat',
    description: 'A hearty and wholesome loaf packed with nutritious seeds and grains.',
    slug: 'whole-wheat',
    imageCount: 2,
    category: 'Bread',
  },
  {
    name: 'Butter Croissants',
    description: 'Flaky, buttery, and irresistibly light. A true Parisian classic made fresh daily.',
    slug: 'croissant',
    imageCount: 2,
    category: 'Pastry',
  },
  {
    name: 'Decadent Chocolate Cake',
    description: 'Rich layers of moist chocolate cake and fudge frosting. Pure indulgence.',
    slug: 'chocolate-cake',
    imageCount: 3,
    category: 'Pastry',
  },
    {
    name: 'Cinnamon Rolls',
    description: 'Soft, gooey rolls swirled with cinnamon and topped with a sweet cream cheese glaze.',
    slug: 'cinnamon-roll',
    imageCount: 2,
    category: 'Pastry',
  },
  {
    name: 'Fresh Fruit Tarts',
    description: 'A crisp, buttery crust filled with vanilla pastry cream and topped with seasonal fruits.',
    slug: 'fruit-tart',
    imageCount: 2,
    category: 'Pastry',
  },
  {
    name: 'Assorted Macarons',
    description: 'Delicate and colorful almond meringue cookies with a variety of flavorful fillings.',
    slug: 'macarons',
    imageCount: 3,
    category: 'Cookie',
  },
    {
    name: 'Classic Chocolate Chip',
    description: 'The ultimate comfort cookie. Soft, chewy, and loaded with semi-sweet chocolate chips.',
    slug: 'chocolate-chip',
    imageCount: 1,
    category: 'Cookie',
  },
// FIX: Use 'as const' to infer literal types for categories. Without this,
// TypeScript infers `category` as a generic `string`, which is not assignable
// to the more specific `'Bread' | 'Pastry' | 'Cookie'` type in the `Product` interface.
] as const;

// Generate the final menuItems array with dynamic image URLs
const menuItems: Product[] = rawMenuItems.map(item => {
  const categoryFolder = `${item.category.toLowerCase()}s`;
  const imageUrls = Array.from({ length: item.imageCount }, (_, i) => 
    `/images/${categoryFolder}/${item.slug}-${i + 1}.jpg`
  );

  return {
    name: item.name,
    description: item.description,
    category: item.category,
    imageUrls,
  };
});

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleImages = product.imageUrls.length > 1;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? product.imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === product.imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(slideIndex);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
      <div className="relative w-full h-56">
        {hasMultipleImages && (
          <>
            <button onClick={goToPrevious} className="absolute top-1/2 left-2 z-20 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50" aria-label="Previous image">
              <ArrowLeftIcon />
            </button>
            <button onClick={goToNext} className="absolute top-1/2 right-2 z-20 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50" aria-label="Next image">
              <ArrowRightIcon />
            </button>
          </>
        )}
        
        <div className="w-full h-full overflow-hidden">
          <div className="flex h-full transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {product.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`${product.name} image ${index + 1}`} className="w-full h-full object-cover flex-shrink-0" loading="lazy" decoding="async" />
            ))}
          </div>
        </div>

        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.imageUrls.map((_, slideIndex) => (
              <button 
                key={slideIndex} 
                onClick={(e) => goToSlide(slideIndex, e)} 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-md ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                aria-label={`Go to image ${slideIndex + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-brand-brown mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
      </div>
    </div>
  );
};

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Bread' | 'Pastry' | 'Cookie'>('All');
  const [isLoading, setIsLoading] = useState(false);

  const categories = useMemo(() => ({
    "Breads & Loaves": menuItems.filter(item => item.category === 'Bread'),
    "Pastries & Cakes": menuItems.filter(item => item.category === 'Pastry'),
    "Cookies & Macarons": menuItems.filter(item => item.category === 'Cookie'),
  }), []);

  const categoryMap: { [key: string]: 'Bread' | 'Pastry' | 'Cookie' } = {
    "Breads & Loaves": 'Bread',
    "Pastries & Cakes": 'Pastry',
    "Cookies & Macarons": 'Cookie',
  };

  const filterButtons = ['All', ...Object.keys(categories)];

  const handleFilterClick = (category: 'All' | 'Bread' | 'Pastry' | 'Cookie') => {
    if (category === activeCategory) return;

    setIsLoading(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsLoading(false);
    }, 500);
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return [];
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="menu" className="py-20 bg-brand-pink">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-brown">Our Daily Offerings</h2>
          <p className="text-lg text-gray-700 mt-2">Handcrafted with passion, from our oven to your table.</p>
        </div>
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {filterButtons.map(buttonCategory => (
            <button
              key={buttonCategory}
              onClick={() => handleFilterClick(buttonCategory === 'All' ? 'All' : categoryMap[buttonCategory])}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                (activeCategory === 'All' && buttonCategory === 'All') || activeCategory === categoryMap[buttonCategory]
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'bg-white text-brand-brown hover:bg-brand-cream'
              }`}
            >
              {buttonCategory}
            </button>
          ))}
        </div>

        <div className="min-h-[50vh]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full pt-16">
              <Spinner />
            </div>
          ) : activeCategory === 'All' ? (
            <div className="space-y-16">
              {Object.entries(categories).map(([category, products]) => (
                products.length > 0 && (
                  <div key={category}>
                    <h3 className="text-3xl font-serif font-bold text-brand-brown mb-8 text-center md:text-left border-b-2 border-brand-accent pb-4">{category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {products.map((item) => (
                        <ProductCard key={item.name} product={item} />
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((item) => (
                <ProductCard key={item.name} product={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;