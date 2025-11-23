'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Briefcase, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Award, value: '5+', label: 'År av Erfarenhet', color: 'from-purple-500 to-purple-600' },
  { icon: Users, value: '3+', label: 'Experter', color: 'from-violet-500 to-violet-600' },
  { icon: Briefcase, value: '60+', label: 'Nöjda Kunder', color: 'from-purple-600 to-purple-700' },
  { icon: TrendingUp, value: '3+', label: 'Industri Partners', color: 'from-violet-600 to-violet-700' },
];

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Våra <span className="bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">Resultat</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Siffror som visar vårt engagemang för excellens och kundsuccess
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`}
                >
                  <Icon size={32} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  <p className="text-gray-300 font-medium">{stat.label}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
