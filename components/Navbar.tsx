'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Hem' },
    { href: '#services', label: 'Tjänster' },
    { href: '#about', label: 'Om Oss' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Kontakt' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Image
                src="/PDF_file_page-0001-removebg-preview.png"
                alt="Björnsta Consulting Group"
                width={310}
                height={134}
                priority
                className=""
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  prefetch={false}
                  href={link.href}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Language switcher */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-1 border border-purple-200 rounded-lg px-2 py-1"
            >
              <Globe size={14} className="text-purple-600" />
              <Link prefetch={false} href="/" className="text-xs font-semibold text-purple-600 hover:text-purple-700 px-1">SV</Link>
              <span className="text-gray-300">|</span>
              <Link prefetch={false} href="/en" className="text-xs font-medium text-gray-500 hover:text-purple-600 px-1">EN</Link>
              <span className="text-gray-300">|</span>
              <Link prefetch={false} href="/ar" className="text-xs font-medium text-gray-500 hover:text-purple-600 px-1">AR</Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                prefetch={false}
                href="#contact"
                className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm font-semibold"
              >
                Boka konsultation
              </Link>
            </motion.div>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
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
                <Link prefetch={false} href="/" onClick={() => setIsOpen(false)} className="flex-1 text-center border border-purple-200 text-purple-700 py-2 rounded-lg text-sm font-semibold">🇸🇪 SV</Link>
                <Link prefetch={false} href="/en" onClick={() => setIsOpen(false)} className="flex-1 text-center border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium">🇬🇧 EN</Link>
                <Link prefetch={false} href="/ar" onClick={() => setIsOpen(false)} className="flex-1 text-center border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium">🇸🇦 AR</Link>
              </div>
              <Link
                prefetch={false}
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
              >
                Boka konsultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
