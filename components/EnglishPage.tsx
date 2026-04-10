'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Globe, BookOpen, Calculator, FileCheck, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: BookOpen,
    title: 'Bookkeeping & Accounting',
    description: 'Professional bookkeeping and accounting for businesses across Sweden. We handle ongoing bookkeeping, monthly reports, and annual accounts with precision — whether you are in Stockholm, Gothenburg, or anywhere else in the country.',
    features: ['Ongoing bookkeeping', 'Monthly reports', 'Annual accounts', 'Financial reporting'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Calculator,
    title: 'Tax Services',
    description: 'Tax returns, VAT reporting, and proactive tax planning for Swedish businesses. We ensure you pay exactly the right amount — no more, no less — and that all filings are submitted on time.',
    features: ['Tax returns', 'Tax planning', 'VAT reporting', 'Tax advisory'],
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: FileCheck,
    title: 'Payroll Administration',
    description: 'Complete payroll management so you can focus on running your business. We handle salary calculations, employer contributions, and reporting to the Swedish Tax Agency — accurately and on time every month.',
    features: ['Salary calculations', 'Employer contributions', 'Holiday management', 'Tax Authority reporting'],
    color: 'from-purple-600 to-purple-700',
  },
  {
    icon: TrendingUp,
    title: 'Advisory & Analysis',
    description: 'Strategic financial advisory to help your business grow. We analyse your numbers, support budgeting and business planning — and act as your dedicated financial sparring partner.',
    features: ['Financial analysis', 'Budgeting', 'Business planning', 'Financial strategy'],
    color: 'from-violet-600 to-violet-700',
  },
];

const faqs = [
  {
    question: 'Do you work with companies outside Eskilstuna?',
    answer: 'Yes — that is our everyday reality. We work entirely digitally and serve 110+ clients across Sweden. Wherever your business is located, you get the same personal service and quality.',
  },
  {
    question: 'Can I communicate in English?',
    answer: 'Absolutely. We provide full service in Swedish, English, and Arabic. You can communicate with us, receive reports, and get advisory in whichever language you prefer.',
  },
  {
    question: 'How does remote accounting work?',
    answer: 'Most of our work happens digitally regardless of location. We use modern cloud-based systems where you can securely share receipts, invoices, and documents. Meetings happen via video call, and you always have a dedicated contact person to call or email.',
  },
  {
    question: 'What types of businesses do you work with?',
    answer: 'We work with sole traders, partnerships, and limited companies across all industries — consultants, e-commerce, restaurants, tradespeople, importers, property companies, and more. Whether you just started out or have an established business with employees, we have solutions that fit.',
  },
  {
    question: 'How quickly can you get started?',
    answer: 'We can typically begin within 2–5 business days after our first consultation. Onboarding is straightforward: we assess your needs, sign a digital agreement, and collect the necessary information. Most clients are up and running within a week.',
  },
  {
    question: 'What accounting systems do you use?',
    answer: 'We work with the most common accounting systems on the Swedish market, including Fortnox, Visma, BL Administration, and Bokio. We can adapt to your existing system or help you choose a better fit for your business.',
  },
  {
    question: 'How does onboarding work?',
    answer: 'It starts with a free consultation to understand your business and needs. We then set up a contract, collect necessary authorisations and history, and configure the digital workflows. You are assigned a dedicated contact person who is responsible for your accounting going forward.',
  },
];

export default function EnglishPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Language switcher */}
      <div className="fixed top-[82px] right-4 z-40 flex gap-2">
        <Link href="/" className="bg-white/90 border border-purple-200 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors shadow-sm">SV</Link>
        <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">EN</span>
        <Link href="/ar" className="bg-white/90 border border-purple-200 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors shadow-sm">AR</Link>
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-violet-50 pt-32">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Accounting firm in Sweden — based in Eskilstuna
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Accounting firm in Sweden —{' '}
                <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  serving clients nationwide
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0">
                Björnsta Consulting Group is based in Eskilstuna and works with 110+ businesses across
                Sweden. We provide bookkeeping, tax services, and payroll — delivered digitally, with
                personal service in Swedish, English, and Arabic.
              </p>

              {/* Trust stats */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-purple-100">
                  <span className="font-bold text-purple-600">110+</span>
                  <span className="text-gray-600 text-sm">clients</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-purple-100">
                  <span className="font-bold text-purple-600">Sweden</span>
                  <span className="text-gray-600 text-sm">nationwide</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-purple-100">
                  <Globe size={16} className="text-purple-600" />
                  <span className="text-gray-600 text-sm">SV / EN / AR</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  '5+ years of industry experience',
                  '110+ satisfied clients across Sweden',
                  'Dedicated contact person — certified experts',
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle className="text-purple-600 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#contact-en"
                  className="group bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="font-semibold">Book a consultation</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  href="#services-en"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-lg hover:bg-purple-50 transition-all duration-300 font-semibold text-center"
                >
                  Our services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-violet-600/20 z-10" />
                <Image
                  src="/hero-image.webp"
                  alt="Björnsta Consulting Group — accounting firm in Sweden serving clients nationwide"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(min-width: 1024px) 50vw, 90vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-600 to-violet-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">
                    110+
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Satisfied clients</p>
                    <p className="text-sm text-gray-600">Across Sweden</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services-en" className="py-20 bg-gradient-to-br from-gray-50 via-purple-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Complete financial{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                expertise
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a complete range of accounting and tax services for businesses across Sweden —
              tailored to your needs and delivered digitally wherever you are located.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  key={index}
                  className="group bg-white/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-purple-100/50 hover:border-purple-200 hover:-translate-y-1"
                >
                  <div className="p-8">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="#contact-en" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                      Book a free consultation →
                    </Link>
                  </div>
                  <div className={`h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">About Us</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
            Modern accounting firm —{' '}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              nationwide reach
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Björnsta Consulting Group is based in Eskilstuna and works with 110+ businesses across Sweden.
            We combine the personal touch of a local firm with the digital infrastructure needed to serve
            clients from Malmö to Umeå. You always get a dedicated contact person who knows your business.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We serve clients in Swedish, English, and Arabic — making us the natural choice for international
            entrepreneurs, foreign-owned companies, and businesses that need multilingual accounting support
            in Sweden.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-8">
            {[
              { value: '110+', label: 'Clients' },
              { value: '3', label: 'Languages' },
              { value: '5+', label: 'Years' },
            ].map((m, i) => (
              <div key={i} className="bg-purple-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-600">{m.value}</div>
                <div className="text-sm text-gray-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
          <Link href="#contact-en" className="inline-block bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300">
            Get in touch
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
              Common{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                questions
              </span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-purple-50/50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <span className={`text-purple-600 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''} flex-shrink-0`}>▼</span>
                </button>
                <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact-en" className="py-20 bg-gradient-to-tr from-purple-50 via-white to-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">Contact</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
              Ready to get your finances{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                in order?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book a free consultation. We respond within 24 hours and can get started quickly —
              regardless of where in Sweden your business is based.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form
                name="contact-en"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="contact-en" />
                <div className="hidden"><input name="bot-field" /></div>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Thank you! We will get back to you within 24 hours.
                  </div>
                )}

                <div>
                  <label htmlFor="en-name" className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <input type="text" id="en-name" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="en-company" className="block text-sm font-semibold text-gray-700 mb-2">Company name</label>
                  <input type="text" id="en-company" name="company" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="Your Company Ltd" />
                </div>
                <div>
                  <label htmlFor="en-email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input type="email" id="en-email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="en-service" className="block text-sm font-semibold text-gray-700 mb-2">I am interested in</label>
                  <select id="en-service" name="service" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white">
                    <option value="">Select a service</option>
                    <option value="bookkeeping">Bookkeeping & Accounting</option>
                    <option value="tax">Tax Services</option>
                    <option value="payroll">Payroll Administration</option>
                    <option value="advisory">Advisory & Analysis</option>
                    <option value="all">Full package</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="en-message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea id="en-message" name="message" required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none" placeholder="Tell us briefly about your business and what you need help with" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300">
                  Send message
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-600 to-violet-600 text-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg"><Mail size={24} /></div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a href="mailto:fakhri.shehab@bjornstaconsulting.com" className="text-purple-100 hover:text-white transition-colors break-all text-sm">fakhri.shehab@bjornstaconsulting.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg"><Phone size={24} /></div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <a href="tel:+46760602088" className="text-purple-100 hover:text-white transition-colors">+46 76-060 20 88</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg"><MapPin size={24} /></div>
                    <div>
                      <p className="font-semibold mb-1">Office</p>
                      <p className="text-purple-100 text-sm">Heljestrandsgatan 5A<br />633 44 Eskilstuna, Sweden<br /><span className="text-purple-200">Clients across all of Sweden</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Language options</h3>
                <div className="flex gap-3">
                  <Link href="/" className="flex-1 text-center border-2 border-purple-200 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold">🇸🇪 Svenska</Link>
                  <span className="flex-1 text-center bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold">🇬🇧 English</span>
                  <Link href="/ar" className="flex-1 text-center border-2 border-purple-200 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold">🇸🇦 العربية</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
