import React, { useState, useMemo } from 'react';
import type { Product, RawMenuItem } from '../types';
import rawMenuData from '../menu-data.json';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

// Process menu data at build time
const menuItems: Product[] = (rawMenuData as RawMenuItem[]).map((item) => {
  // Construct absolute paths for images assuming they are in the public/images folder.
  const imageUrls = item.imageFiles.map(
    (file) => `/images/${item.folder}/${file}`
  );
  return {
    name: item.name,
    description: item.description,
    category: item.category,
    imageUrls: imageUrls,
  };
});

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
            <button onClick={goToPrevious} className="absolute top-1/2 left-2 z-20 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50" aria-label="Ảnh trước">
              <ArrowLeftIcon />
            </button>
            <button onClick={goToNext} className="absolute top-1/2 right-2 z-20 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50" aria-label="Ảnh kế tiếp">
              <ArrowRightIcon />
            </button>
          </>
        )}
        
        <div className="w-full h-full overflow-hidden">
          <div className="flex h-full transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {product.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`${product.name} ảnh ${index + 1}`} className="w-full h-full object-cover flex-shrink-0" loading="lazy" decoding="async" />
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
                aria-label={`Đi đến ảnh ${slideIndex + 1}`}
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
  const [activeCategory, setActiveCategory] = useState<'All' | 'Bánh Kem' | 'Rau Câu' | 'Bánh Ngọt'>('All');
  const [isFiltering, setIsFiltering] = useState(false);

  const categoryOrder: ('Bánh Kem' | 'Rau Câu' | 'Bánh Ngọt')[] = ['Bánh Kem', 'Rau Câu', 'Bánh Ngọt'];
  const filterButtons = ['Tất cả', ...categoryOrder];

  const productsByCategory = useMemo(() => {
    return {
      'Bánh Kem': menuItems.filter(item => item.category === 'Bánh Kem'),
      'Rau Câu': menuItems.filter(item => item.category === 'Rau Câu'),
      'Bánh Ngọt': menuItems.filter(item => item.category === 'Bánh Ngọt'),
    };
  }, []);

  const handleFilterClick = (buttonText: string) => {
    const newCategory = buttonText === 'Tất cả' ? 'All' : (buttonText as 'Bánh Kem' | 'Rau Câu' | 'Bánh Ngọt');
    if (newCategory === activeCategory) return;

    setIsFiltering(true);
    setTimeout(() => {
      setActiveCategory(newCategory);
      setIsFiltering(false);
    }, 300); // Match animation duration
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return [];
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);
  
  const isActiveButton = (buttonText: string) => {
    if (activeCategory === 'All' && buttonText === 'Tất cả') return true;
    return activeCategory === buttonText;
  }

  if (!menuItems.length) {
    return (
      <section id="menu" className="py-20 bg-brand-pink min-h-[70vh] flex items-center justify-center">
        <div className="text-center text-brand-brown">
          <h2 className="text-2xl font-serif mb-4">Thực đơn trống</h2>
          <p>Không tìm thấy sản phẩm nào trong thực đơn.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 bg-brand-pink">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-brown">Thực Đơn Hàng Ngày</h2>
          <p className="text-lg text-gray-700 mt-2">Làm thủ công với tất cả tâm huyết, từ lò nướng đến bàn của bạn.</p>
        </div>
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {filterButtons.map(buttonCategory => (
            <button
              key={buttonCategory}
              onClick={() => handleFilterClick(buttonCategory)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                isActiveButton(buttonCategory)
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'bg-white text-brand-brown hover:bg-brand-cream'
              }`}
            >
              {buttonCategory}
            </button>
          ))}
        </div>

        <div
          className={`min-h-[50vh] transition-opacity duration-300 ease-in-out ${
            isFiltering ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {activeCategory === 'All' ? (
            <div className="space-y-16">
              {categoryOrder.map(category => (
                productsByCategory[category] && productsByCategory[category].length > 0 && (
                  <div key={category}>
                    <h3 className="text-3xl font-serif font-bold text-brand-brown mb-8 text-center md:text-left border-b-2 border-brand-accent pb-4">{category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {productsByCategory[category].map((item) => (
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