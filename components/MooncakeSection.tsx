import React from "react";
// Dòng này import biến JavaScript (đường dẫn hình ảnh) để dùng trong JSX
import mooncakeImage from "../images/banh-trung-thu-doan-vien.jpg";

const MooncakeSection = () => {
  // Phần return(...) bên dưới chính là JSX
  return (
    <section id="mooncake" className="bg-amber-50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Cột hình ảnh: Thẻ <img> và các thuộc tính trông giống HTML */}
          <div className="w-full lg:w-1/2">
            <img
              src={mooncakeImage} // Sử dụng biến JavaScript trong thuộc tính src
              alt="Bánh Trung Thu Đoàn Viên"
              className="rounded-lg shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Cột nội dung: Các thẻ h2, p, a... đều là cú pháp JSX */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              Mùa Trăng Yêu Thương 2025
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 font-serif mb-6">
              Hương Vị Đoàn Viên Trong Từng Chiếc Bánh
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Đêm trăng rằm tháng Tám, ánh đèn lồng lung linh, tiếng cười nói
              rộn ràng. Nơi đó, có gia đình đang quây quần bên nhau, cùng nhau
              cắt miếng bánh trung thu ngọt ngào. Chiếc bánh không chỉ là món
              quà, mà còn là lời nhắn gửi yêu thương, là sợi dây vô hình kết nối
              các thế hệ. Tại <strong>Vi Trần Handmade</strong>, chúng tôi tin rằng mỗi chiếc
              bánh đều chứa đựng câu chuyện của sự sum vầy. Hãy để những hộp
              bánh tinh tế của chúng tôi thay lời muốn nói, trao đi những hương
              vị ngọt ngào và tình thân ấm áp.
            </p>
            <a
              href="#menu"
              className="inline-block bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg shadow-red-500/50 hover:bg-red-800 transition-all duration-300 transform hover:-translate-y-1"
            >
              Khám Phá Bộ Sưu Tập
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MooncakeSection;
