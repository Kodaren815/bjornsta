'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, FileQuestion, ArrowLeft, Phone, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FileQuestion className="w-24 h-24 mx-auto text-purple-600 mb-6" />
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sidan hittades inte
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Tyvärr kunde vi inte hitta sidan du letar efter. Den kan ha flyttats eller tagits bort.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span className="font-semibold">Till Startsidan</span>
          </Link>

          <Link
            href="/#services"
            className="group flex items-center justify-center gap-2 bg-white text-purple-600 border-2 border-purple-600 px-6 py-4 rounded-xl hover:bg-purple-50 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Våra Tjänster</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Snabblänkar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/#services"
              className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
            >
              Tjänster
            </Link>
            <Link
              href="/#about"
              className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
            >
              Om Oss
            </Link>
            <Link
              href="/#faq"
              className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/#contact"
              className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
            >
              Kontakt
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Behöver du hjälp?
          </h3>
          <p className="text-gray-600 mb-4">
            Kontakta oss direkt så hjälper vi dig vidare
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0760602088"
              className="flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              076-060 20 88
            </a>
            <a
              href="mailto:kontakt@bjornsta.se"
              className="flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              <Mail className="w-5 h-5" />
              kontakt@bjornsta.se
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
