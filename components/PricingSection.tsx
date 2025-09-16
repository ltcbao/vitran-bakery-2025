import React from 'react';

// Dữ liệu bảng giá để dễ quản lý
const priceList = [
  { name: 'Thập cẩm chà bông lạp xưởng Mai quế lộ', details: '200g / 2 trứng', price: '110k' },
  { name: 'Đậu xanh', details: '200g / 2 trứng', price: '90k' },
  { name: 'Khoai môn', details: '200g / 2 trứng', price: '90k' },
  { name: 'Hạt sen', details: '200g / 2 trứng', price: '90k' },
  { name: 'Lá dứa', details: '200g / 2 trứng', price: '90k' },
  { name: 'Sữa dừa', details: '200g / 2 trứng', price: '90k' },
];

const PricingSection = () => {
  return (
    <div className="my-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-brand-brown">
        <div className="p-8 sm:p-12">
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-brand-brown text-center mb-8">
            Bảng Giá Bánh Trung Thu 2025
          </h3>

          {/* Danh sách các loại bánh thông thường */}
          <ul className="space-y-5 text-lg">
            {priceList.map((item, index) => (
              <li key={index} className="flex items-baseline pb-4 border-b border-dashed border-gray-200">
                <span className="text-xl mr-3">✅</span>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.details}</p>
                </div>
                <p className="ml-4 font-bold text-brand-brown whitespace-nowrap">{item.price}</p>
              </li>
            ))}
             <li className="flex items-baseline pb-4 border-b border-dashed border-gray-200">
                <span className="text-xl mr-3">✅</span>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">Bánh dẻo đường phèn bột nếp Bắc</p>
                  <p className="text-sm text-gray-500">150g / 1 trứng: <span className="font-semibold">60k</span> | Nhân Thập cẩm: <span className="font-semibold">80k</span></p>
                </div>
              </li>
          </ul>

          {/* Phần đặc biệt */}
          <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <div className="flex items-start">
              <span className="text-3xl mr-4 -mt-1">🐷</span>
              <div>
                <h4 className="font-bold text-red-800 text-xl">Đặc biệt!</h4>
                <p className="text-gray-700 mt-1">
                  Set bánh 50g (thỏ, heo, cá, mèo tài lộc, voi, cua, túi tiền, ấm trà...) <span className="font-bold text-xl text-red-700 whitespace-nowrap">120k/4 bánh</span>.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-center text-xl font-serif italic text-gray-600 mt-10">
            Thân mời
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;