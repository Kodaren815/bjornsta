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
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-30 -z-10" />

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
              På Björnsta Consulting Group har vårt team av experter många års erfarenhet inom 
              redovisningsbranschen. Vi är dedikerade till att tillhandahålla personlig service 
              till varje kund.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Vi arbetar outtröttligt för att säkerställa att dina ekonomiska behov tillgodoses 
              med högsta precision och professionalism. Vårt mål är att bli din långsiktiga partner 
              för finansiell framgång.
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
