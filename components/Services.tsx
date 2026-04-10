import { BookOpen, Calculator, FileCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: BookOpen,
    title: 'Bokföring & Redovisning',
    description: 'Professionell bokföring och redovisning för företag i hela Sverige. Vi hanterar löpande bokföring, månadsrapporter och årsredovisning med hög precision — oavsett om du befinner dig i Eskilstuna eller på andra sidan landet.',
    features: ['Löpande bokföring', 'Månadsrapporter', 'Årsredovisning', 'Ekonomisk rapportering'],
    color: 'from-purple-500 to-purple-600',
    href: '#contact',
  },
  {
    icon: Calculator,
    title: 'Skattetjänster',
    description: 'Skattedeklarationer, momsredovisning och proaktiv skatteplanering för svenska företag. Vi säkerställer att du betalar rätt skatt — varken mer eller mindre — och att alla deklarationer lämnas in i tid.',
    features: ['Skattedeklarationer', 'Skatteplanering', 'Momsredovisning', 'Skatterådgivning'],
    color: 'from-violet-500 to-violet-600',
    href: '#contact',
  },
  {
    icon: FileCheck,
    title: 'Löneadministration',
    description: 'Komplett lönehantering som frigör tid för dig att fokusera på verksamheten. Vi hanterar löneberäkningar, arbetsgivaravgifter och rapportering till Skatteverket — säkert och i tid varje månad.',
    features: ['Löneberäkningar', 'Arbetsgivaravgifter', 'Semesterhantering', 'Skatteverket-rapportering'],
    color: 'from-purple-600 to-purple-700',
    href: '#contact',
  },
  {
    icon: TrendingUp,
    title: 'Rådgivning & Analys',
    description: 'Strategisk finansiell rådgivning som hjälper ditt företag att växa. Vi analyserar dina siffror, hjälper med budgetering och affärsplanering — och finns som din dedikerade sparringpartner.',
    features: ['Finansiell analys', 'Budgetering', 'Affärsplanering', 'Ekonomisk strategi'],
    color: 'from-violet-600 to-violet-700',
    href: '#contact',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-purple-50/50 to-white relative overflow-hidden">
      {/* Diagonal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-100/20 to-violet-100/30 -z-10" />

      {/* Background Elements */}
      <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-violet-200 rounded-full blur-3xl opacity-25 -z-10" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-violet-200 to-purple-200 rounded-full blur-3xl opacity-25 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">Våra Tjänster</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Komplett finansiell{' '}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              expertis
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vi erbjuder ett komplett utbud av redovisnings- och skattetjänster för företag i hela Sverige —
            skräddarsydda efter dina behov och levererade digitalt oavsett var du befinner dig.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-purple-100/50 hover:border-purple-200 hover:-translate-y-1"
              >
                <div className="p-8 relative">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-violet-50/0 group-hover:from-purple-50/50 group-hover:to-violet-50/50 transition-all duration-300 rounded-2xl" />

                  {/* Icon */}
                  <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <Icon size={32} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    prefetch={false}
                    href={service.href}
                    className="relative inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                  >
                    Boka kostnadsfri konsultation →
                  </Link>
                </div>

                {/* Bottom Border Animation */}
                <div className={`h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
