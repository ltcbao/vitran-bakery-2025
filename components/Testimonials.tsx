import React from 'react';
import type { Testimonial } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const testimonials: Testimonial[] = [
  {
    quote: "Đây chắc chắn là tiệm bánh ngon nhất mình từng đến. Bánh kem bắp mềm tan trong miệng, không gian lại ấm cúng. Một viên ngọc quý của khu phố!",
    author: 'Chị Lan Anh',
  },
  {
    quote: "Mình đã đặt bánh cưới ở Tiệm Vi Trần, và đó là một quyết định tuyệt vời. Chiếc bánh không chỉ đẹp lộng lẫy mà còn ngon không thể tả. Cảm ơn tiệm rất nhiều!",
    author: 'Anh Minh',
  },
  {
    quote: "Rau câu trái cây ở đây thật sự là một phép màu. Mát lạnh, thanh ngọt, hoàn hảo cho ngày hè. Cuối tuần nào mình cũng phải ghé qua để thưởng thức.",
    author: 'Bạn Tú',
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-brand-cream p-8 rounded-lg shadow-md border border-brand-pink">
    <p className="text-gray-700 italic text-lg mb-6">"{testimonial.quote}"</p>
    <p className="text-brand-brown font-bold font-serif text-right">- {testimonial.author}</p>
  </div>
);

const Testimonials: React.FC = () => {
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div 
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-brown">Cảm Nhận Từ Khách Hàng</h2>
          <p className="text-lg text-gray-700 mt-2">Chúng tôi yêu quý khách hàng của mình, và họ cũng yêu những chiếc bánh của chúng tôi!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;