import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Redovisningsbyrå Örebro | Bokföring & Skatt - Björnsta',
  description: 'Björnsta erbjuder redovisning och bokföring för företag i Örebro och centrala Sverige. Logistik, transport och handel. 110+ kunder. Ring 076-060 20 88.',
  alternates: {
    canonical: '/orebro',
  },
  openGraph: {
    title: 'Redovisningsbyrå Örebro | Bokföring & Skatt - Björnsta',
    description: 'Björnsta erbjuder redovisning och bokföring för företag i Örebro och centrala Sverige. Logistik, transport och handel. 110+ kunder.',
    url: 'https://bjornsta.se/orebro',
  },
};

export default function OrebroPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-violet-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-purple-600 text-sm font-semibold mb-4">
            <MapPin size={16} />
            <span>Örebro, centrala Sverige</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Redovisningsbyrå för företag i{' '}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Örebro
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Örebro är ett av Sveriges viktigaste logistik- och handelscentrum — ett knutpunkt där
            gods och företag möts mitt i landet. Björnsta arbetar med örebroaretag i transport-,
            logistik-, grossist- och tjänstesektorn och förstår de specifika ekonomiska utmaningar
            som dessa branscher innebär.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Vi levererar komplett redovisningsservice digitalt till Örebro-baserade bolag. Oavsett
            om du driver ett åkeri, en grossistverksamhet eller en tjänsteföretag har vi
            erfarenheten och systemen som krävs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '110+', label: 'Kunder i hela Sverige' },
              { value: 'Central', label: 'Sveriges mittelpunkt' },
              { value: 'Digital', label: 'Fullständig fjärrservice' },
            ].map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">{m.value}</div>
                <div className="text-sm text-gray-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#contact" className="group bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 font-semibold">
              Boka kostnadsfri konsultation
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link href="/#services" className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-lg hover:bg-purple-50 transition-all font-semibold text-center">
              Se våra tjänster
            </Link>
          </div>
        </div>
      </section>

      {/* Why Björnsta for Örebro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Varför välja Björnsta som din redovisningsbyrå i Örebro?
          </h2>
          <div className="space-y-4">
            {[
              'Erfarenhet av logistik- och transportbranschen',
              'Digital service — ingen pendling till byrån krävs',
              'Förstår centralsvenska handelsstrukturer och branschspecifika regler',
              'Service på svenska, engelska och arabiska',
              'Dedikerad kontaktperson — du är aldrig ett ärendenummer',
              '110+ nöjda kunder i hela Sverige, inklusive centrala regioner',
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
            Tjänster för örebrobaserade företag
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Bokföring & Redovisning', desc: 'Löpande bokföring och årsredovisning för logistik-, transport- och handelsbolag' },
              { title: 'Skattetjänster', desc: 'Branschspecifik skatteplanering och momsredovisning för Örebroföretag' },
              { title: 'Löneadministration', desc: 'Lönehantering för säsongsbetonade och skiftarbetande verksamheter' },
              { title: 'Rådgivning & Analys', desc: 'Finansiell analys och budgetering för tillväxtorienterade centralsvenska bolag' },
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
          <h2 className="text-3xl font-bold mb-4">Ta hand om ekonomin — fokusera på logistiken</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Kontakta oss för en kostnadsfri genomgång av dina redovisningsbehov.
            Vi finns tillgängliga och återkommer snabbt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+46760602088" className="flex items-center justify-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              <Phone size={20} />
              076-060 20 88
            </a>
            <Link href="/#contact" className="flex items-center justify-center gap-2 bg-purple-500/50 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500/70 transition-colors">
              <Mail size={20} />
              Skicka förfrågan
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
              { href: '/stockholm', label: 'Redovisningsbyrå Stockholm' },
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
