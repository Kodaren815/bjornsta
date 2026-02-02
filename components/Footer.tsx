'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
              Björnsta
            </h3>
            <p className="text-gray-300 mb-4">
              Din betrodda partner för bokföring, redovisning och skattetjänster.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Snabblänkar</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Hem
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Tjänster
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Om Oss
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Våra Tjänster</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Bokföring & Redovisning</li>
              <li>Skattetjänster</li>
              <li>Avstämningar</li>
              <li>Finansiell Rådgivning</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakta Oss</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail size={18} className="text-purple-400" />
                <span>fakhri.shehab@bjornstaconsulting.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone size={18} className="text-purple-400" />
                <span>076-060 20 88</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <MapPin size={18} className="text-purple-400" />
                <span>Heljestrandsgatan 5A, 633 44 Eskilstuna</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="bg-purple-800 hover:bg-purple-700 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-purple-800 hover:bg-purple-700 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="bg-purple-800 hover:bg-purple-700 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Björnsta Consulting Group. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
