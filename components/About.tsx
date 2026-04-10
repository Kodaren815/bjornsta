'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Heart, Shield, Globe } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Exakta och noggranna finansiella tjänster — ingen siffra är för liten för att räknas rätt.',
  },
  {
    icon: Heart,
    title: 'Dedikation',
    description: 'Du får en dedikerad kontaktperson som känner ditt företag och alltid finns tillgänglig.',
  },
  {
    icon: Shield,
    title: 'Förtroende',
    description: 'Din finansiella information hanteras med absolut diskretion och säkerhet.',
  },
  {
    icon: Globe,
    title: 'Tillgänglighet',
    description: 'Vi kommunicerar på svenska, engelska och arabiska — och arbetar digitalt i hela Sverige.',
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
              Modern redovisningsbyrå —{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                rikstäckande räckvidd
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Björnsta Consulting Group grundades i Eskilstuna med en tydlig vision: att göra professionell
              redovisning och ekonomisk rådgivning tillgänglig för alla svenska företag, oavsett storlek
              eller geografisk plats. Idag arbetar vi med 110+ kunder i hela Sverige — från lokala
              hantverkare till växande aktiebolag.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Tack vare moderna digitala arbetsflöden behöver du aldrig vara på plats för att få
              förstklassig service. Vi hanterar allt från löpande bokföring och skattedeklarationer
              till komplex finansiell rådgivning — på distans, i tid, utan krångel.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Det som skiljer oss från de stora byråerna är den personliga kontakten. Du får alltid
              en dedikerad ansvarig som känner ditt företag på djupet. Vi kommunicerar på svenska,
              engelska och arabiska — och vi är stolta över att ha kunder i hela landet som väljer
              att stanna hos oss år efter år.
            </p>

            {/* Trust metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '110+', label: 'Nöjda kunder' },
                { value: '3', label: 'Språk' },
                { value: '5+', label: 'Års erfarenhet' },
              ].map((metric, i) => (
                <div key={i} className="text-center bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                  <div className="text-2xl font-bold text-purple-600">{metric.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
            >
              Kontakta oss idag
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
      </div>
    </section>
  );
};

export default About;
