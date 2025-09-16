import React, { useState, useEffect } from 'react';
import heroBackgroundImage from '../images/hero-background.png';

// Hàm throttle đơn giản để giới hạn số lần gọi hàm
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Sử dụng throttle để chỉ cập nhật trạng thái sau mỗi 16ms (khoảng 60 khung hình/giây)
    const handleScroll = throttle(() => {
      setOffsetY(window.pageYOffset);
    }, 16);

    window.addEventListener('scroll', handleScroll);

    // Dọn dẹp listener khi component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // [] đảm bảo effect chỉ chạy một lần sau render đầu tiên

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Lớp phủ tối */}
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      
      {/* Hình ảnh nền với hiệu ứng parallax */}
      <img 
        src={heroBackgroundImage}
        alt="Bánh kem và rau câu nghệ thuật" 
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />

      {/* Nội dung chính */}
      <div className="relative z-20 text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold drop-shadow-lg mb-4">
          Ngọt Ngào Từ Tâm, Trao Tay Yêu Thương
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md mb-8">
          Trải nghiệm hương vị tinh tế của những chiếc bánh và rau câu tươi mới, được làm thủ công mỗi ngày từ những nguyên liệu tốt nhất.
        </p>
        <a 
          href="#menu" 
          className="bg-brand-accent text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Khám Phá Thực Đơn
        </a>
      </div>
    </section>
  );
};

export default Hero;