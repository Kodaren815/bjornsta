import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Redovisningsbyrå Stockholm | Bokföring & Skatt - Björnsta',
  description: 'Björnsta erbjuder digital redovisning och bokföring för Stockholmsbolag. Perfekt för startups och SME. 110+ kunder i hela Sverige. Ring 076-060 20 88.',
  alternates: {
    canonical: '/stockholm',
  },
  openGraph: {
    title: 'Redovisningsbyrå Stockholm | Bokföring & Skatt - Björnsta',
    description: 'Björnsta erbjuder digital redovisning och bokföring för Stockholmsbolag. Perfekt för startups och SME. 110+ kunder i hela Sverige.',
    url: 'https://bjornsta.se/stockholm',
  },
};

export default function StockholmPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-violet-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-purple-600 text-sm font-semibold mb-4">
            <MapPin size={16} />
            <span>Stockholm, Sverige</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Redovisningsbyrå för{' '}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Stockholmsbolag
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Stockholm är Skandinaviens startup- och tillväxtmotor — och det ställer andra krav på
            redovisningsbyrån. Björnsta arbetar med Stockholmsbaserade bolag som behöver en effektiv,
            digital redovisningspartner som levererar utan krångel. Vi passar extra bra för startups,
            tech-bolag och SME:s som vill ha skalbar service och enkel kommunikation.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Hela vår service levereras digitalt. Du behöver aldrig åka till Eskilstuna — allt
            sker via säkra digitala system och videomöten. Du får en dedikerad kontaktperson som
            alltid känner till läget i din verksamhet.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '110+', label: 'Kunder i hela Sverige' },
              { value: '100%', label: 'Digital service' },
              { value: 'Startup', label: 'Vänlig för tillväxtbolag' },
            ].map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">{m.value}</div>
                <div className="text-sm text-gray-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#contact" className="group bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 font-semibold">
              Boka digital konsultation
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link href="/#services" className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-lg hover:bg-purple-50 transition-all font-semibold text-center">
              Se våra tjänster
            </Link>
          </div>
        </div>
      </section>

      {/* Why Björnsta for Stockholm */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Varför väljer Stockholmsbolag Björnsta?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Många Stockholmsbolag betalar för mycket för redovisning hos stora byråer som inte ger
            personlig service. Björnsta erbjuder storkontorsstandard med boutique-känsla — och till
            ett pris som reflekterar ditt faktiska behov.
          </p>
          <div className="space-y-4">
            {[
              'Helt digital service — fullt fungerande utan fysiska möten',
              'Snabb kommunikation — vi svarar inom 24 timmar på vardagar',
              'Dedikerad kontaktperson, inte ett anonymt ärendesystem',
              'Passar startups, soloprenörer, e-handel och SME',
              'Service på svenska och engelska (och arabiska)',
              'Transparent prissättning — fast månadsavgift utan dolda kostnader',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Tjänster för Stockholmsbaserade bolag
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Bokföring & Redovisning', desc: 'Digital löpande bokföring och årsredovisning — helt utan pappershantering' },
              { title: 'Skattetjänster', desc: 'Skattedeklarationer och momsredovisning för Stockholmsbolag i alla branscher' },
              { title: 'Löneadministration', desc: 'Lönehantering som skalas med din tillväxt — oavsett antal anställda' },
              { title: 'Rådgivning & Analys', desc: 'Finansiell sparringpartner för tillväxtbolag — vi förstår startup-ekonomi' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Redo att byta till en byrå som bryr sig?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Boka en kostnadsfri digital konsultation. Vi hanterar övergången smidigt och du
            märker skillnaden från dag ett.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+46760602088" className="flex items-center justify-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              <Phone size={20} />
              076-060 20 88
            </a>
            <Link href="/#contact" className="flex items-center justify-center gap-2 bg-purple-500/50 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500/70 transition-colors">
              <Mail size={20} />
              Boka digital konsultation
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Fler städer vi arbetar med</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/eskilstuna', label: 'Redovisningsbyrå Eskilstuna' },
              { href: '/vasteras', label: 'Redovisningsbyrå Västerås' },
              { href: '/orebro', label: 'Redovisningsbyrå Örebro' },
              { href: '/uppsala', label: 'Redovisningsbyrå Uppsala' },
              { href: '/', label: '← Tillbaka till startsidan' },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="text-purple-600 hover:text-purple-700 font-medium border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
