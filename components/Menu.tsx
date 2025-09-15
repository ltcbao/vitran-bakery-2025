import React, { useState, useMemo, useEffect } from 'react';
import type { Product, RawMenuItem } from '../types';
import Spinner from './Spinner';

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
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<'All' | 'Bread' | 'Pastry' | 'Cookie'>('All');
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/menu-data.json');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const rawData: RawMenuItem[] = await response.json();
        
        const processedItems: Product[] = rawData.map(item => ({
          name: item.name,
          description: item.description,
          category: item.category,
          imageUrls: item.imageFiles.map(file => `/images/${item.folder}/${file}`),
        }));

        setMenuItems(processedItems);
      } catch (e) {
        console.error("Failed to fetch menu items:", e);
        setError("Our menu is currently unavailable. Please check back later.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = useMemo(() => {
    if (!menuItems.length) return {};
    return {
      "Breads & Loaves": menuItems.filter(item => item.category === 'Bread'),
      "Pastries & Cakes": menuItems.filter(item => item.category === 'Pastry'),
      "Cookies & Macarons": menuItems.filter(item => item.category === 'Cookie'),
    };
  }, [menuItems]);

  const categoryMap: { [key: string]: 'Bread' | 'Pastry' | 'Cookie' } = {
    "Breads & Loaves": 'Bread',
    "Pastries & Cakes": 'Pastry',
    "Cookies & Macarons": 'Cookie',
  };

  const filterButtons = ['All', ...Object.keys(categories)];

  const handleFilterClick = (category: 'All' | 'Bread' | 'Pastry' | 'Cookie') => {
    if (category === activeCategory) return;

    setIsFiltering(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsFiltering(false);
    }, 500);
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return [];
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  if (initialLoading) {
    return (
      <section id="menu" className="py-20 bg-brand-pink min-h-[70vh] flex items-center justify-center">
        <Spinner />
      </section>
    );
  }

  if (error) {
    return (
      <section id="menu" className="py-20 bg-brand-pink min-h-[70vh] flex items-center justify-center">
        <div className="text-center text-brand-brown">
          <h2 className="text-2xl font-serif mb-4">Something went wrong</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

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
          {isFiltering ? (
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