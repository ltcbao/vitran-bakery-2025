import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icon 'X' để đóng modal
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Định nghĩa các props mà component này sẽ nhận
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  return (
    // AnimatePresence cho phép component con có animation khi bị xóa khỏi cây DOM
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // Lớp nền mờ bao phủ toàn màn hình
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={onClose} // Nhấp vào nền để đóng
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Nút đóng modal */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white z-50 hover:text-gray-300 transition-colors"
            aria-label="Đóng ảnh"
          >
            <CloseIcon />
          </button>

          {/* Container cho hình ảnh */}
          <motion.div
            className="relative p-4"
            // Ngăn việc click vào ảnh làm đóng modal
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <img
              src={imageUrl}
              alt="Enlarged product view"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;