'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isArabic = pathname?.startsWith('/ar') ?? false;
  const isEnglish = pathname?.startsWith('/en') ?? false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isArabic
    ? [
        { href: '#home', label: 'الرئيسية' },
        { href: '#services-ar', label: 'الخدمات' },
        { href: '#about-ar', label: 'من نحن' },
        { href: '#faq-ar', label: 'الأسئلة الشائعة' },
        { href: '#contact-ar', label: 'اتصل بنا' },
      ]
    : isEnglish
    ? [
        { href: '#home', label: 'Home' },
        { href: '#services-en', label: 'Services' },
        { href: '#about', label: 'About Us' },
        { href: '#faq', label: 'FAQ' },
        { href: '#contact-en', label: 'Contact' },
      ]
    : [
        { href: '#home', label: 'Hem' },
        { href: '#services', label: 'Tjänster' },
        { href: '#about', label: 'Om Oss' },
        { href: '#faq', label: 'FAQ' },
        { href: '#contact', label: 'Kontakt' },
      ];

  const ctaLabel = isArabic ? 'احجز استشارة' : isEnglish ? 'Book consultation' : 'Boka konsultation';
  const ctaHref = isArabic ? '#contact-ar' : isEnglish ? '#contact-en' : '#contact';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-20 ${isArabic ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center anim-fade-in-down">
              <Image
                src="/PDF_file_page-0001-removebg-preview.png"
                alt="Björnsta Consulting Group"
                width={310}
                height={134}
                priority
                className=""
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link, index) => (
              <div
                key={link.href}
                className="anim-fade-in-down"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  prefetch={false}
                  href={link.href}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm"
                >
                  {link.label}
                </Link>
              </div>
            ))}

            {/* Medarbetare — subtle staff link */}
            <div className="anim-fade-in-down anim-delay-500">
              <Link
                href="/personal"
                className="text-gray-400 hover:text-gray-500 transition-colors text-xs"
              >
                Medarbetare
              </Link>
            </div>

            {/* Language switcher */}
            <div className="flex items-center gap-1 border border-purple-200 rounded-lg px-2 py-1 anim-fade-in-down anim-delay-550">
              <Globe size={14} className="text-purple-600" />
              <Link
                prefetch={false}
                href="/"
                className={`text-xs px-1 ${!isArabic && !isEnglish ? 'font-semibold text-purple-600' : 'font-medium text-gray-500 hover:text-purple-600'}`}
              >
                SV
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                prefetch={false}
                href="/en"
                className={`text-xs px-1 ${isEnglish ? 'font-semibold text-purple-600' : 'font-medium text-gray-500 hover:text-purple-600'}`}
              >
                EN
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                prefetch={false}
                href="/ar"
                className={`text-xs px-1 ${isArabic ? 'font-semibold text-purple-600' : 'font-medium text-gray-500 hover:text-purple-600'}`}
              >
                AR
              </Link>
            </div>

            <div className="anim-fade-in-down anim-delay-600">
              <Link
                prefetch={false}
                href={ctaHref}
                className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm font-semibold"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-purple-600 transition-colors"
            aria-label="Öppna meny"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg anim-fade-in">
          <div className={`px-4 py-6 space-y-4 ${isArabic ? 'text-right' : ''}`}>
            {navLinks.map((link) => (
              <Link
                prefetch={false}
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link
                prefetch={false}
                href="/"
                onClick={() => setIsOpen(false)}
                className={`flex-1 text-center border py-2 rounded-lg text-sm ${!isArabic && !isEnglish ? 'border-purple-200 text-purple-700 font-semibold' : 'border-gray-200 text-gray-600 font-medium'}`}
              >
                🇸🇪 SV
              </Link>
              <Link
                prefetch={false}
                href="/en"
                onClick={() => setIsOpen(false)}
                className={`flex-1 text-center border py-2 rounded-lg text-sm ${isEnglish ? 'border-purple-200 text-purple-700 font-semibold' : 'border-gray-200 text-gray-600 font-medium'}`}
              >
                🇬🇧 EN
              </Link>
              <Link
                prefetch={false}
                href="/ar"
                onClick={() => setIsOpen(false)}
                className={`flex-1 text-center border py-2 rounded-lg text-sm ${isArabic ? 'border-purple-200 text-purple-700 font-semibold' : 'border-gray-200 text-gray-600 font-medium'}`}
              >
                🇸🇦 AR
              </Link>
            </div>
            <Link
              prefetch={false}
              href={ctaHref}
              onClick={() => setIsOpen(false)}
              className="block text-center bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
            >
              {ctaLabel}
            </Link>
            <Link
              href="/personal"
              onClick={() => setIsOpen(false)}
              className="block text-center text-gray-400 hover:text-gray-500 text-xs py-1 transition-colors"
            >
              Medarbetare
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
