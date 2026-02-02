"use client";

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'Vilka tjänster erbjuder Björnsta?',
    answer: 'Vi erbjuder ett komplett utbud av redovisningstjänster inklusive löpande bokföring, månadsrapporter, årsredovisning, skattedeklarationer, momsredovisning, avstämningar och finansiell rådgivning. Vi skräddarsyr våra tjänster efter ditt företags specifika behov.'
  },
  {
    question: 'Hur mycket kostar era tjänster?',
    answer: 'Våra priser varierar beroende på företagets storlek och vilka tjänster som behövs. Vi erbjuder alltid en kostnadsfri första konsultation där vi går igenom dina behov och kan ge en skräddarsydd offert. Kontakta oss på 076-060 20 88 för mer information.'
  },
  {
    question: 'Kan ni hjälpa mitt företag med skatteplanering?',
    answer: 'Ja, skatteplanering är en av våra kärnkompetenser. Vi hjälper dig att optimera din skattesituation inom lagens ramar, identifiera möjliga avdrag och säkerställa att alla deklarationer lämnas in i tid. Våra experter håller sig uppdaterade med de senaste skattereglerna.'
  },
  {
    question: 'Hur ofta behöver jag uppdatera min bokföring?',
    answer: 'Vi rekommenderar löpande bokföring, helst månadsvis, för att hålla bra koll på företagets ekonomi. Detta underlättar också vid momsredovisning och årsbokslut. Vi kan hjälpa dig att sätta upp rutiner som passar just ditt företag och din bransch.'
  },
  {
    question: 'Arbetar ni med företag i alla branscher?',
    answer: 'Ja, vi har erfarenhet av att arbeta med företag inom många olika branscher. Oavsett om du driver en enskild firma, aktiebolag eller handelsbolag, har vi kompetensen att hantera din ekonomi professionellt. Vi har 5+ industri-partners och över 90 nöjda kunder.'
  },
  {
    question: 'Hur snabbt kan ni komma igång med mitt företag?',
    answer: 'Vi kan ofta påbörja arbetet redan inom några dagar efter första mötet. Processen börjar med en konsultation där vi går igenom dina behov, följt av en onboarding där vi samlar in nödvändiga dokument och information. Vi strävar efter att göra övergången så smidig som möjligt.'
  },
  {
    question: 'Var är ni lokaliserade?',
    answer: 'Vårt kontor ligger på Heljestrandsgatan 5A i Eskilstuna (633 44). Vi tar gärna emot kunder både på plats och digitalt. Mycket av vårt arbete kan genomföras på distans via säkra digitala lösningar, vilket gör att vi kan hjälpa företag oavsett var de befinner sig.'
  },
  {
    question: 'Vad händer om Skatteverket granskar mitt företag?',
    answer: 'Om ditt företag skulle bli föremål för en granskning från Skatteverket står vi vid din sida. Vi hjälper till att sammanställa nödvändig dokumentation, svarar på frågor och säkerställer att allt är korrekt. Vår noggranna bokföring och redovisning minimerar risken för problem vid granskningar.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-white relative overflow-hidden">
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
              Frågor
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Här hittar du svar på de vanligaste frågorna om våra tjänster och hur vi kan hjälpa ditt företag
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
            Kontakta Oss
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
