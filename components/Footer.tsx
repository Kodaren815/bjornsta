'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* National positioning tagline */}
      <div className="border-b border-purple-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-purple-300 text-sm font-medium">
            Redovisningsbyrå i Eskilstuna — med 110+ kunder i hela Sverige &nbsp;·&nbsp;
            Svenska · English · العربية
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
              Björnsta Consulting Group
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Modern redovisningsbyrå med kontor i Eskilstuna och kunder i hela Sverige.
              Vi erbjuder bokföring, skattetjänster och löneadministration — på svenska,
              engelska och arabiska.
            </p>
            {/* Language switcher */}
            <div className="flex gap-2 mt-4">
              <Link href="/" className="text-xs bg-purple-700 hover:bg-purple-600 px-3 py-1.5 rounded-full transition-colors font-medium">🇸🇪 SV</Link>
              <Link href="/en" className="text-xs bg-purple-800 hover:bg-purple-700 px-3 py-1.5 rounded-full transition-colors font-medium">🇬🇧 EN</Link>
              <Link href="/ar" className="text-xs bg-purple-800 hover:bg-purple-700 px-3 py-1.5 rounded-full transition-colors font-medium">🇸🇦 AR</Link>
            </div>
          </div>

          {/* Tjänster */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tjänster</h4>
            <ul className="space-y-2">
              {[
                { href: '/#services', label: 'Bokföring & Redovisning' },
                { href: '/#services', label: 'Skattetjänster' },
                { href: '/#services', label: 'Löneadministration' },
                { href: '/#services', label: 'Rådgivning & Analys' },
              ].map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-gray-300 hover:text-purple-300 transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Städer */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Städer</h4>
            <ul className="space-y-2">
              {[
                { href: '/eskilstuna', label: 'Eskilstuna' },
                { href: '/vasteras', label: 'Västerås' },
                { href: '/stockholm', label: 'Stockholm' },
                { href: '/orebro', label: 'Örebro' },
                { href: '/uppsala', label: 'Uppsala' },
              ].map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-gray-300 hover:text-purple-300 transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-300 text-sm">
                <Mail size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:fakhri.shehab@bjornstaconsulting.com" className="hover:text-purple-300 transition-colors break-all">
                  fakhri.shehab@bjornstaconsulting.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone size={16} className="text-purple-400 flex-shrink-0" />
                <a href="tel:+46760602088" className="hover:text-purple-300 transition-colors">
                  076-060 20 88
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Heljestrandsgatan 5A<br />633 44 Eskilstuna</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-5">
              <a href="#" className="bg-purple-800 hover:bg-purple-700 p-2 rounded-full transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-purple-800 hover:bg-purple-700 p-2 rounded-full transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="bg-purple-800 hover:bg-purple-700 p-2 rounded-full transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* City links row */}
        <div className="border-t border-gray-700/50 pt-6 mb-4">
          <p className="text-gray-500 text-xs mb-3">Redovisning i hela Sverige:</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/eskilstuna', label: 'Redovisning Eskilstuna' },
              { href: '/vasteras', label: 'Redovisning Västerås' },
              { href: '/stockholm', label: 'Redovisning Stockholm' },
              { href: '/orebro', label: 'Redovisning Örebro' },
              { href: '/uppsala', label: 'Redovisning Uppsala' },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="text-gray-500 hover:text-purple-300 transition-colors text-xs">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-400 text-sm">
            © {currentYear} Björnsta Consulting Group. Alla rättigheter förbehållna.
          </p>
          <Link href="/personal" className="text-gray-600 hover:text-gray-500 text-xs transition-colors">
            Medarbetare
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
