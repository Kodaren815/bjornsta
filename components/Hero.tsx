'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-violet-50 pt-32">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #9333ea 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0">
        <div className="flex flex-col items-center text-center">
          <div className="w-full">
            <div className="inline-block mb-6 anim-fade-in-up anim-delay-200">
              <span className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                Redovisningsbyrå i Eskilstuna – kunder i hela Sverige
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight anim-fade-in-up anim-delay-300">
              Redovisningsbyrå i Eskilstuna med kunder i{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                hela Sverige
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto anim-fade-in-up anim-delay-400">
              Vi arbetar digitalt och ger dig personlig service var du än befinner dig i Sverige.
              Björnsta erbjuder professionell bokföring, redovisning och skattetjänster — på svenska,
              engelska och arabiska.
            </p>

            {/* Trust stats row */}
            <div className="flex flex-wrap gap-4 justify-center mb-8 anim-fade-in-up anim-delay-450">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-purple-100">
                <span className="font-bold text-purple-600">110+</span>
                <span className="text-gray-600 text-sm">kunder</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-purple-100">
                <Globe size={16} className="text-purple-600" />
                <span className="text-gray-600 text-sm">Svenska / English / العربية</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 anim-fade-in-up anim-delay-500">
              {[
                '5+ års erfarenhet i branschen',
                '110+ nöjda kunder i hela Sverige',
                'Personlig kontaktperson — certifierade experter',
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-2">
                  <CheckCircle className="text-purple-600 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center anim-fade-in-up anim-delay-600">
              <Link
                prefetch={false}
                href="#contact"
                className="group bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span className="font-semibold">Boka konsultation</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                prefetch={false}
                href="#services"
                className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-lg hover:bg-purple-50 transition-all duration-300 font-semibold text-center"
              >
                Se våra tjänster
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block anim-fade-in anim-delay-1200">
        <div
          className="w-6 h-10 border-2 border-purple-600 rounded-full flex justify-center p-2"
          style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}
        >
          <div className="w-1 h-2 bg-purple-600 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
