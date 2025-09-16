import React from "react";
// Import 'motion' từ thư viện framer-motion
import { motion } from "framer-motion";
import mooncakeImage from "../images/banh-trung-thu-doan-vien.png";

const MooncakeSection = () => {
  // Định nghĩa các "variants" cho animation container của phần nội dung
  // Giúp tạo hiệu ứng xuất hiện lần lượt cho các phần tử con (stagger)
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Thời gian trễ giữa mỗi phần tử con
      },
    },
  };

  // Định nghĩa variant cho từng phần tử con (văn bản, nút)
  // Chúng sẽ trượt nhẹ lên và hiện ra
  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="mooncake" className="bg-amber-50 py-16 sm:py-24 overflow-hidden">
      {/* Thêm overflow-hidden để các hiệu ứng trượt vào không bị tràn ra ngoài */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* --- Cột hình ảnh với hiệu ứng Framer Motion --- */}
          <motion.div
            className="w-full lg:w-1/2"
            // Trạng thái ban đầu: mờ và trượt sang trái
            initial={{ opacity: 0, x: -50 }}
            // Trạng thái khi xuất hiện trong viewport: rõ và về vị trí gốc
            whileInView={{ opacity: 1, x: 0 }}
            // Thiết lập để animation chỉ chạy 1 lần
            viewport={{ once: true }}
            // Tùy chỉnh transition
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img
              src={mooncakeImage}
              alt="Bánh Trung Thu Đoàn Viên"
              className="rounded-lg shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* --- Cột nội dung với hiệu ứng Stagger --- */}
          {/*
            Sử dụng component 'motion.div' và gán các variants đã định nghĩa.
            Hiệu ứng sẽ được kích hoạt khi thẻ div này lọt vào viewport.
          */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Chạy khi 30% phần tử hiện ra
          >
            {/* Mỗi phần tử con sẽ dùng variant 'textItemVariants' */}
            <motion.span
              variants={textItemVariants}
              className="inline-block bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full mb-4"
            >
              Mùa Trăng Yêu Thương 2025
            </motion.span>
           <motion.h2
  variants={textItemVariants}
  // Thêm class 'leading-relaxed' hoặc 'leading-snug' vào đây
  className="text-4xl sm:text-5xl font-bold text-gray-800 font-serif mb-6 leading-relaxed"
>
              Hương Vị Đoàn Viên Trong Từng Chiếc Bánh
            </motion.h2>
            <motion.p
              variants={textItemVariants}
              className="text-gray-600 leading-relaxed mb-8"
            >
              Đêm trăng rằm tháng Tám, ánh đèn lồng lung linh, tiếng cười nói
              rộn ràng. Nơi đó, có gia đình đang quây quần bên nhau, cùng nhau
              cắt miếng bánh trung thu ngọt ngào. Chiếc bánh không chỉ là món
              quà, mà còn là lời nhắn gửi yêu thương, là sợi dây vô hình kết nối
              các thế hệ. Tại <strong>Vi Trần Handmade</strong>, chúng tôi tin rằng mỗi chiếc
              bánh đều chứa đựng câu chuyện của sự sum vầy. Hãy để những hộp
              bánh tinh tế của chúng tôi thay lời muốn nói, trao đi những hương
              vị ngọt ngào và tình thân ấm áp.
            </motion.p>
            <motion.a
              variants={textItemVariants}
              href="#menu"
              className="inline-block bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg shadow-red-500/50 hover:bg-red-800 transition-all duration-300 transform hover:-translate-y-1"
            >
              Lựa chọn hương vị
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MooncakeSection;