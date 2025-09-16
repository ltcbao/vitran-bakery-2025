import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const LocationIcon = () => (
  <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);
const ClockIcon = () => (
  <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const PhoneIcon = () => (
  <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
);


const Contact: React.FC = () => {
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="contact" className="py-20 bg-brand-cream overflow-hidden">
      <div 
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-brown">Ghé Thăm Chúng Tôi</h2>
          <p className="text-lg text-gray-700 mt-2">Rất mong được phục vụ quý khách!</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <LocationIcon />
            <h3 className="text-xl font-serif font-bold mt-4 mb-2">Địa Chỉ</h3>
            <p className="text-gray-600">163/34/11 Đặng Văn Bi, p.Trường Thọ<br /> Thủ Đức, TP. Hồ Chí Minh</p>
          </div>
          <div className="flex flex-col items-center">
            <ClockIcon />
            <h3 className="text-xl font-serif font-bold mt-4 mb-2">Giờ Mở Cửa</h3>
            <p className="text-gray-600">Thứ 2 - t7: 8h - 21h</p>
          </div>
          <div className="flex flex-col items-center">
            <PhoneIcon />
            <h3 className="text-xl font-serif font-bold mt-4 mb-2">Liên Hệ</h3>
            <p className="text-gray-600">0907 188 351<br /></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;