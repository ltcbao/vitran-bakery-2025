import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, RawMenuItem } from "../types";
import rawMenuData from "../menu-data.json";
import PricingSection from "./PricingSection"; // <-- 1. IMPORT COMPONENT MỚI

// --- Định nghĩa kiểu dữ liệu cho media ---
interface MediaItem {
  url: string;
  type: "image" | "video";
}

// Cập nhật Product type để sử dụng MediaItem
// Giả sử Product type ban đầu của bạn trông như thế này trong `types.ts`:
// export interface Product {
//   name: string;
//   description: string;
//   category: string;
//   imageUrls: string[];
// }
// Chúng ta sẽ tạo một kiểu mới dựa trên nó.
interface ProductWithMedia extends Omit<Product, "imageUrls"> {
  media: MediaItem[];
}

// --- CÁC COMPONENT ICON ---
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- COMPONENT MEDIA MODAL (Nâng cấp từ ImageModal) ---
interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  hasMultipleMedia: boolean;
}

const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  media,
  currentIndex,
  onNext,
  onPrevious,
  hasMultipleMedia,
}) => {
  const handleDragEnd = (
    event: any,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipeThreshold = 50;
    const swipePower = Math.abs(info.offset.x) * info.velocity.x;

    if (info.offset.x < -swipeThreshold || swipePower < -1000) {
      onNext();
    } else if (info.offset.x > swipeThreshold || swipePower > 1000) {
      onPrevious();
    }
  };

  const currentMedia = media[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 text-white z-[52] hover:text-gray-300 transition-colors"
            aria-label="Đóng"
          >
            <CloseIcon />
          </button>

          {hasMultipleMedia && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[52] bg-black/30 text-white rounded-full p-3 hover:bg-black/50 transition-colors"
                aria-label="Trước"
              >
                <ArrowLeftIcon />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[52] bg-black/30 text-white rounded-full p-3 hover:bg-black/50 transition-colors"
                aria-label="Sau"
              >
                <ArrowRightIcon />
              </button>
            </>
          )}

          <motion.div
            className="relative w-[95vw] h-[95vh] flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {currentMedia.type === "image" ? (
                <motion.img
                  key={currentMedia.url}
                  src={currentMedia.url}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl absolute"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.5 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <motion.video
                  key={currentMedia.url}
                  src={currentMedia.url}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl absolute"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.5 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- XỬ LÝ DỮ LIỆU ---
const menuItems: ProductWithMedia[] = (rawMenuData as RawMenuItem[]).map(
  (item) => {
    const media = item.imageFiles.map((file): MediaItem => {
      const isVideo = file.endsWith(".mp4") || file.endsWith(".webm");
      return {
        url: `/images/${item.folder}/${file}`,
        type: isVideo ? "video" : "image",
      };
    });
    return {
      name: item.name,
      description: item.description,
      category: item.category,
      media: media,
    };
  }
);

// --- COMPONENT PRODUCT CARD ---
const ProductCard: React.FC<{ product: ProductWithMedia }> = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const hasMultipleMedia = product.media.length > 1;

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? product.media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isLastSlide = currentIndex === product.media.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
        <div
          className="relative w-full h-56 cursor-pointer"
          onClick={openModal}
        >
          {hasMultipleMedia && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-2 z-20 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
                aria-label="Trước"
              >
                <ArrowLeftIcon />
              </button>
              <button
                onClick={goToNext}
                className="absolute top-1/2 right-2 z-20 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
                aria-label="Sau"
              >
                <ArrowRightIcon />
              </button>
            </>
          )}
          <div className="w-full h-full overflow-hidden">
            <div
              className="flex h-full transition-transform ease-in-out duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {product.media.map((mediaItem) => (
                <div
                  key={mediaItem.url}
                  className="w-full h-full flex-shrink-0 bg-gray-100"
                >
                  {mediaItem.type === "image" ? (
                    <img
                      src={mediaItem.url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <video
                      src={mediaItem.url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {hasMultipleMedia && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.media.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={(e) => goToSlide(slideIndex, e)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-md ${
                    currentIndex === slideIndex
                      ? "bg-white scale-125"
                      : "bg-white/50"
                  }`}
                  aria-label={`Đi đến media ${slideIndex + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-bold text-brand-brown mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm">{product.description}</p>
        </div>
      </div>

      <MediaModal
        isOpen={isModalOpen}
        onClose={closeModal}
        media={product.media}
        currentIndex={currentIndex}
        onNext={goToNext}
        onPrevious={goToPrevious}
        hasMultipleMedia={hasMultipleMedia}
      />
    </>
  );
};

// --- COMPONENT MENU ---
const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Bánh Kem" | "Rau Câu" | "Bánh Ngọt" | "Bánh Trung Thu"
  >("All");
  const categoryOrder: (
    | "Bánh Trung Thu"
    | "Bánh Kem"
    | "Rau Câu"
    | "Bánh Ngọt"
  )[] = ["Bánh Trung Thu", "Bánh Kem", "Rau Câu", "Bánh Ngọt"];
  const filterButtons = ["Tất cả", ...categoryOrder];

  const productsByCategory = useMemo(() => {
    return {
      "Bánh Trung Thu": menuItems.filter(
        (item) => item.category === "Bánh Trung Thu"
      ),
      "Bánh Kem": menuItems.filter((item) => item.category === "Bánh Kem"),
      "Rau Câu": menuItems.filter((item) => item.category === "Rau Câu"),
      "Bánh Ngọt": menuItems.filter((item) => item.category === "Bánh Ngọt"),
    };
  }, []);

  const handleFilterClick = (buttonText: string) => {
    const newCategory =
      buttonText === "Tất cả"
        ? "All"
        : (buttonText as
            | "Bánh Kem"
            | "Rau Câu"
            | "Bánh Ngọt"
            | "Bánh Trung Thu");
    setActiveCategory(newCategory);
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return [];
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const isActiveButton = (buttonText: string) => {
    if (activeCategory === "All" && buttonText === "Tất cả") return true;
    return activeCategory === buttonText;
  };

  if (!menuItems.length) {
    return <div>Loading menu...</div>;
  }

  return (
    <section id="menu" className="py-20 bg-brand-pink">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-brown">
            Menu các loại bánh
          </h2>
          <p className="text-lg text-gray-700 mt-2">
            Làm thủ công với tất cả tâm huyết, từ lò nướng đến bàn của bạn.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {filterButtons.map((buttonCategory) => (
            <button
              key={buttonCategory}
              onClick={() => handleFilterClick(buttonCategory)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                isActiveButton(buttonCategory)
                  ? "bg-brand-brown text-white shadow-md"
                  : "bg-white text-brand-brown hover:bg-brand-cream"
              }`}
            >
              {buttonCategory}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[50vh]"
          >
            {activeCategory === "All" ? (
              <div className="space-y-16">
                {categoryOrder.map(
                  (category) =>
                    productsByCategory[category] &&
                    productsByCategory[category].length > 0 && (
                      <div key={category}>
                        <h3 className="text-3xl font-serif font-bold text-brand-brown mb-8 text-center md:text-left border-b-2 border-brand-accent pb-4">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                          {productsByCategory[category].map((item) => (
                            <ProductCard key={item.name} product={item} />
                          ))}
                        </div>
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((item) => (
                  <ProductCard key={item.name} product={item} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
                <PricingSection />

      </div>
    </section>
  );
};

export default Menu;
