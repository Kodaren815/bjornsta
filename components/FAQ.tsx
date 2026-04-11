"use client";

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'Arbetar ni med företag utanför Eskilstuna?',
    answer: 'Absolut. Vi har 110+ kunder i hela Sverige och arbetar helt digitalt. Oavsett om ditt företag finns i Stockholm, Göteborg, Malmö eller någon annanstans i landet kan vi hjälpa dig med precis samma kvalitet och personliga service som om du satt i Eskilstuna.',
  },
  {
    question: 'Kan jag få hjälp på engelska eller arabiska?',
    answer: 'Ja. Vi erbjuder full service på svenska, engelska och arabiska. Det innebär att du kan kommunicera med oss, ta del av rapporter och få rådgivning på det språk du föredrar. Det är en av anledningarna till att vi har kunder med bakgrund i många olika länder.',
  },
  {
    question: 'Hur fungerar digital redovisning om mitt företag finns i en annan stad?',
    answer: 'Mycket av redovisningsarbetet sker digitalt oavsett var du befinner dig. Vi använder moderna molnbaserade system där du kan dela underlag, fakturor och kvitton säkert och enkelt. Möten sker via video, och du har alltid en dedikerad kontaktperson att ringa eller mejla. De flesta av våra kunder utanför Eskilstuna träffar oss aldrig fysiskt — och det fungerar utmärkt.',
  },
  {
    question: 'Vilka typer av företag hjälper ni?',
    answer: 'Vi arbetar med enskilda firmor, handelsbolag och aktiebolag i alla branscher — konsulter, e-handel, restauranger, hantverkare, importörer, fastighetsbolag med mera. Oavsett om du precis startat eller har ett etablerat bolag med flera anställda har vi lösningar som passar.',
  },
  {
    question: 'Hur snabbt kan ni komma igång?',
    answer: 'Vi kan ofta börja arbetet inom 2–5 vardagar efter vår första konsultation. Onboarding-processen är enkel: vi går igenom dina behov, signerar avtal digitalt och samlar in nödvändig information. De flesta kunder är igång inom en vecka.',
  },
  {
    question: 'Vilka system arbetar ni med?',
    answer: 'Vi arbetar med de vanligaste ekonomisystemen på den svenska marknaden, däribland Fortnox, Visma, BL Administration och Bokio. Vi kan också anpassa oss efter det system du redan använder eller hjälpa dig att välja och byta till ett system som passar din verksamhet bättre.',
  },
  {
    question: 'Hur fungerar onboarding för nya kunder?',
    answer: 'Processen börjar alltid med ett kostnadsfritt samtal där vi lär känna din verksamhet och dina behov. Därefter upprättar vi ett avtal, samlar in nödvändiga fullmakter och historik, och sätter upp de digitala flödena. Du tilldelas en fast kontaktperson som ansvarar för din redovisning — och vi håller dig löpande uppdaterad.',
  },
  {
    question: 'Vilka tjänster erbjuder Björnsta?',
    answer: 'Vi erbjuder ett komplett utbud av ekonomitjänster: löpande bokföring, månadsrapporter, årsredovisning, skattedeklarationer, momsredovisning, löneadministration och finansiell rådgivning. Alla tjänster kan levereras digitalt till företag i hela Sverige.',
  },
  {
    question: 'Hur mycket kostar era tjänster?',
    answer: 'Vår prissättning är transparent och baseras på antal verifikationer. Vi tar 675 kr per timme (exkl. moms) och på en timme hanterar vi normalt cirka 25 verifikationer. Det innebär att du alltid vet vad du betalar för — utan dolda avgifter eller fasta paket.',
  },
  {
    question: 'Vad händer om Skatteverket granskar mitt företag?',
    answer: 'Då finns vi vid din sida hela vägen. Vi sammanställer nödvändig dokumentation, svarar på frågor och representerar dig gentemot Skatteverket. Vår noggranna bokföring minimerar risken för problem — men om det ändå händer är du aldrig ensam.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #9333ea 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Vanliga{' '}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              frågor
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Här hittar du svar på de vanligaste frågorna om våra tjänster och hur vi arbetar med
            kunder i hela Sverige
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-purple-50/50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`flex-shrink-0 text-purple-600 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Hittade du inte svar på din fråga?</p>
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
          >
            Kontakta oss
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
