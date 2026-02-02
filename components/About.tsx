'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Heart, Shield, Zap } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Vi levererar exakta och noggranna finansiella tjänster',
  },
  {
    icon: Heart,
    title: 'Dedikation',
    description: 'Vi är engagerade i din framgång och tillväxt',
  },
  {
    icon: Shield,
    title: 'Förtroende',
    description: 'Din finansiella information är säker hos oss',
  },
  {
    icon: Zap,
    title: 'Effektivitet',
    description: 'Snabba lösningar utan att kompromissa med kvalitet',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-violet-50/40 to-purple-50/40 relative overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'radial-gradient(at 40% 20%, rgba(147, 51, 234, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(167, 139, 250, 0.15) 0px, transparent 50%)',
      }} />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-violet-200 rounded-full blur-3xl opacity-30 -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-violet-200 to-purple-200 rounded-full blur-3xl opacity-30 -z-10 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">Om Oss</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Din betrodda{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                finansiella partner
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              På Björnsta har vårt team av experter många års erfarenhet inom redovisningsbranschen. 
              Vi är dedikerade till att tillhandahålla personlig service till varje kund, oavsett 
              företagets storlek eller bransch. Våra tjänster är skräddarsydda för att möta just dina 
              specifika behov och utmaningar.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Vi arbetar outtröttligt för att säkerställa att dina ekonomiska behov tillgodoses med 
              högsta precision och professionalism. Vårt mål är att bli din långsiktiga partner för 
              finansiell framgång. Med över 90 nöjda kunder och 5 industri-partners har vi bevisat 
              vår förmåga att leverera resultat.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Vår expertis omfattar allt från löpande bokföring och månadsrapporter till komplex 
              skatteplanering och finansiell rådgivning. Vi håller oss ständigt uppdaterade med de 
              senaste regelverken och använder moderna verktyg för att effektivisera dina processer. 
              Oavsett om du driver ett litet företag eller ett större bolag, erbjuder vi lösningar 
              som hjälper dig att fokusera på din kärnverksamhet medan vi tar hand om ekonomin.
            </p>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
            >
              Kontakta Oss Idag
            </motion.a>
          </motion.div>

          {/* Right Content - Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100"
                >
                  <div className="bg-gradient-to-br from-purple-600 to-violet-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Vårt Team av Experter</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vårt dedikerade team består av certifierade redovisningskonsulter och skatterådgivare 
            med djup expertis och passion för att hjälpa våra kunder att nå sina finansiella mål.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
