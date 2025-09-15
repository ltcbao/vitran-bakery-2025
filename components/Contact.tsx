
import React from 'react';

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
  return (
    <section id="contact" className="py-20 bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-brown">Visit Us</h2>
          <p className="text-lg text-gray-700 mt-2">We can't wait to serve you!</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <LocationIcon />
            <h3 className="text-xl font-serif font-bold mt-4 mb-2">Our Address</h3>
            <p className="text-gray-600">123 Bread Lane<br />Pastryville, PV 54321</p>
          </div>
          <div className="flex flex-col items-center">
            <ClockIcon />
            <h3 className="text-xl font-serif font-bold mt-4 mb-2">Opening Hours</h3>
            <p className="text-gray-600">Tue - Fri: 7am - 6pm<br />Sat - Sun: 8am - 4pm</p>
          </div>
          <div className="flex flex-col items-center">
            <PhoneIcon />
            <h3 className="text-xl font-serif font-bold mt-4 mb-2">Get in Touch</h3>
            <p className="text-gray-600">hello@artisanbakery.com<br />(123) 456-7890</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
