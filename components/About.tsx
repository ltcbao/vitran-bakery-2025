import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import aboutBakerImage from '../images/about-baker.png';

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
              src={aboutBakerImage} 
              alt="Thợ làm bánh đang trang trí bánh kem" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-serif font-bold text-brand-brown mb-6">Câu Chuyện Của Tiệm</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Ra đời từ một căn bếp nhỏ với niềm đam mê lớn, Tiệm Bánh Vi Trần khởi đầu bằng một khát khao giản dị: gắn kết mọi người qua từng miếng bánh ngọt ngào. Chúng tôi tin vào những công thức truyền thống, nguyên liệu chất lượng và một chút sáng tạo trong mỗi chiếc bánh , bánh rau câu mà chúng tôi tạo ra.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Mỗi ngày, những người thợ làm bánh của chúng tôi đều bắt đầu từ sáng sớm để đảm bảo mỗi sản phẩm đến tay bạn đều tươi mới nhất. Từ những chiếc bánh kem xốp mềm đến những khuôn rau câu mát lạnh, chúng tôi gửi gắm cả trái tim mình vào từng tác phẩm. Vi Trần không chỉ là một tiệm bánh, mà còn là nơi lưu giữ những khoảnh khắc ngọt ngào, nơi sẻ chia niềm vui và mang đến sự ấm áp mỗi ngày.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;