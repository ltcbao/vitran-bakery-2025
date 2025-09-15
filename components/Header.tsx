import React, { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu accessibility (focus trap, escape key, body scroll)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      
      // Focus trapping logic
      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement | undefined;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement | undefined;

      const trapFocus = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !firstElement || !lastElement) {
            return;
        }

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };
      
      firstElement?.focus();
      menuRef.current?.addEventListener('keydown', trapFocus);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        menuRef.current?.removeEventListener('keydown', trapFocus);
        menuButtonRef.current?.focus();
      };
    } else {
        document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);


  const navLinks = [
    { href: '#about', label: 'Câu Chuyện' },
    { href: '#menu', label: 'Thực Đơn' },
    { href: '#testimonials', label: 'Cảm Nhận' },
    { href: '#contact', label: 'Liên Hệ' },
  ];

  const textColorClass = isScrolled ? 'text-brand-brown' : 'text-white';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-cream/90 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className={`text-2xl font-serif font-bold tracking-wider transition-colors duration-300 ${textColorClass}`} aria-label="Tiệm Bánh Vi Trần - Trang Chủ">
            Tiệm Bánh Vi Trần
          </a>
          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-brand-brown hover:text-brand-accent' : 'text-white hover:text-brand-pink'}`}>
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className={`md:hidden z-50 transition-colors duration-300 ${textColorClass}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span className={`block h-0.5 w-full bg-current transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-current transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-current transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        role="dialog"
        aria-modal="true"
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-brand-cream transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8" onClick={() => setIsMobileMenuOpen(false)}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-3xl font-serif text-brand-brown hover:text-brand-accent transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </>
  );
};

export default Header;