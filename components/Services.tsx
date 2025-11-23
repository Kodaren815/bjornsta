'use client';

import { motion } from 'framer-motion';
import { BookOpen, Calculator, FileCheck, TrendingUp } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: BookOpen,
    title: 'Bokföring & Redovisning',
    description: 'Professionella bokförings- och redovisningstjänster för företag av alla storlekar. Vi säkerställer att dina ekonomiska register är organiserade och korrekta.',
    features: ['Löpande bokföring', 'Månadsrapporter', 'Årsredovisning', 'Ekonomisk rapportering'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Calculator,
    title: 'Skattetjänster',
    description: 'Omfattande skattetjänster för att säkerställa efterlevnad av alla skatteregler. Vi minimerar din skattebörda inom lagens ramar.',
    features: ['Skattedeklarationer', 'Skatteplanering', 'Momsredovisning', 'Skatterådgivning'],
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: FileCheck,
    title: 'Avstämningar',
    description: 'Noggranna avstämningstjänster för att säkerställa integriteten i dina finansiella rapporter och uppfylla regulatoriska krav.',
    features: ['Kontoavstämning', 'Bankavstämning', 'Balansräkning', 'Resultatrapport'],
    color: 'from-purple-600 to-purple-700',
  },
  {
    icon: TrendingUp,
    title: 'Finansiell Rådgivning',
    description: 'Strategisk finansiell rådgivning för att hjälpa ditt företag att växa och nå sina ekonomiska mål med expertis och erfarenhet.',
    features: ['Affärsplanering', 'Budgetering', 'Kassaflödesanalys', 'Ekonomisk strategi'],
    color: 'from-violet-600 to-violet-700',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-purple-50/20 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">Våra Tjänster</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Komplett Finansiell{' '}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Expertis
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vi erbjuder ett komplett utbud av redovisnings- och skattetjänster skräddarsydda för dina behov
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Border Animation */}
                <div className={`h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
