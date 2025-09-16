import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MooncakeSection from "./components/MooncakeSection";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-cream font-sans">
      <Header />
      <main>
        <Hero />
        <MooncakeSection /> {/* Đặt component của chúng ta ở đây */}
        <About />
        <Menu />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;