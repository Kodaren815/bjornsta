'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Globe, BookOpen, Calculator, FileCheck, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: BookOpen,
    title: 'المحاسبة والدفاتر المالية',
    description: 'خدمات احترافية في مجال مسك الدفاتر والمحاسبة للشركات في جميع أنحاء السويد. نتولى المحاسبة الجارية والتقارير الشهرية والحسابات السنوية بدقة عالية — سواء كانت شركتك في إسكيلستونا أو في أي مكان آخر في البلاد.',
    features: ['المحاسبة الجارية', 'التقارير الشهرية', 'الحسابات السنوية', 'التقارير المالية'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Calculator,
    title: 'الخدمات الضريبية',
    description: 'إقرارات ضريبية وتقارير ضريبة القيمة المضافة وتخطيط ضريبي استباقي للشركات السويدية. نضمن لك دفع الضريبة الصحيحة بالضبط — لا أكثر ولا أقل — وتقديم جميع الإقرارات في موعدها.',
    features: ['الإقرارات الضريبية', 'التخطيط الضريبي', 'تقارير ضريبة القيمة المضافة', 'الاستشارات الضريبية'],
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: FileCheck,
    title: 'إدارة الرواتب',
    description: 'إدارة متكاملة للرواتب تتيح لك التركيز على تطوير أعمالك. نتعامل مع احتساب الرواتب ومساهمات صاحب العمل والتقارير لمصلحة الضرائب السويدية — بدقة وفي الوقت المحدد كل شهر.',
    features: ['احتساب الرواتب', 'مساهمات صاحب العمل', 'إدارة الإجازات', 'التقارير الضريبية'],
    color: 'from-purple-600 to-purple-700',
  },
  {
    icon: TrendingUp,
    title: 'الاستشارات والتحليل المالي',
    description: 'استشارات مالية استراتيجية تساعد شركتك على النمو. نحلل أرقامك ونساعدك في الميزانية والتخطيط التجاري — ونكون شريكك المخصص في النقاشات المالية.',
    features: ['التحليل المالي', 'الميزانية', 'التخطيط التجاري', 'الاستراتيجية المالية'],
    color: 'from-violet-600 to-violet-700',
  },
];

const faqs = [
  {
    question: 'هل تعملون مع شركات خارج إسكيلستونا؟',
    answer: 'نعم، بالتأكيد. نعمل رقمياً بالكامل ونخدم أكثر من 110 عميل في جميع أنحاء السويد. أينما كانت شركتك، ستحصل على نفس الجودة والخدمة الشخصية.',
  },
  {
    question: 'هل يمكنني التواصل باللغة العربية؟',
    answer: 'بالطبع. نقدم خدمة كاملة باللغة العربية والسويدية والإنجليزية. يمكنك التواصل معنا وتلقي التقارير والحصول على الاستشارات بأي لغة تفضلها.',
  },
  {
    question: 'كيف تعمل المحاسبة عن بُعد؟',
    answer: 'معظم أعمال المحاسبة تتم رقمياً بغض النظر عن موقعك. نستخدم أنظمة سحابية حديثة حيث يمكنك مشاركة الإيصالات والفواتير والمستندات بشكل آمن. تُعقد الاجتماعات عبر الفيديو، ولديك دائماً شخص مخصص للتواصل معه.',
  },
  {
    question: 'ما أنواع الشركات التي تعملون معها؟',
    answer: 'نعمل مع الملاك الأفراد والشراكات والشركات المساهمة في جميع القطاعات — مستشارون، تجارة إلكترونية، مطاعم، مقاولون، مستوردون، شركات عقارية وغيرها. سواء كنت قد بدأت للتو أو لديك شركة متأصلة، لدينا الحلول التي تناسبك.',
  },
  {
    question: 'ما هي الأنظمة المحاسبية التي تستخدمونها؟',
    answer: 'نعمل مع أكثر أنظمة المحاسبة شيوعاً في السوق السويدية، بما فيها Fortnox وVisma وBL Administration وBokio. يمكننا التكيف مع نظامك الحالي أو مساعدتك في اختيار نظام أفضل لعملك.',
  },
  {
    question: 'كيف تعمل عملية الإعداد للعملاء الجدد؟',
    answer: 'تبدأ دائماً بمحادثة مجانية لفهم أعمالك واحتياجاتك. ثم نُعد العقد ونجمع التفويضات والمعلومات الضرورية ونُهيئ التدفقات الرقمية. يُعين لك شخص مخصص مسؤول عن محاسبتك من الآن فصاعداً.',
  },
];

export default function ArabicPage() {
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
    <div dir="rtl" lang="ar" className="min-h-screen">
      {/* Language switcher */}
      <div className="fixed top-[82px] left-4 z-40 flex gap-2">
        <Link href="/" className="bg-white/90 border border-purple-200 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors shadow-sm">SV</Link>
        <Link href="/en" className="bg-white/90 border border-purple-200 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors shadow-sm">EN</Link>
        <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">AR</span>
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-bl from-purple-50 via-white to-violet-50 pt-32">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-right"
            >
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                  شركة محاسبة في السويد – مقرنا في إسكيلستونا
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                شركة محاسبة في السويد –{' '}
                <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  نخدم العملاء في جميع أنحاء السويد
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto lg:mr-0 lg:ml-auto">
                مجموعة بيورنستا للاستشارات مقرها في إسكيلستونا وتعمل مع أكثر من 110 شركة في جميع
                أنحاء السويد. نقدم خدمات المحاسبة والضرائب والرواتب — رقمياً مع خدمة شخصية باللغة
                العربية والسويدية والإنجليزية. محاسب في السويد، موحاسب، mo7aseb.
              </p>

              {/* Trust stats */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-end mb-8">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-purple-100">
                  <span className="font-bold text-purple-600">110+</span>
                  <span className="text-gray-600 text-sm">عميل</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-purple-100">
                  <span className="font-bold text-purple-600">السويد</span>
                  <span className="text-gray-600 text-sm">على المستوى الوطني</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-purple-100">
                  <Globe size={16} className="text-purple-600" />
                  <span className="text-gray-600 text-sm">عربي / EN / SV</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  'أكثر من 5 سنوات من الخبرة في المجال',
                  '110+ عميل راضٍ في جميع أنحاء السويد',
                  'جهة اتصال مخصصة — خبراء معتمدون',
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center lg:justify-end gap-2">
                    <span className="text-gray-700">{item}</span>
                    <CheckCircle className="text-purple-600 flex-shrink-0" size={20} />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <Link
                  href="#contact-ar"
                  className="group bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                  <span className="font-semibold">احجز استشارة مجانية</span>
                </Link>
                <Link
                  href="#services-ar"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-lg hover:bg-purple-50 transition-all duration-300 font-semibold text-center"
                >
                  خدماتنا
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/20 to-violet-600/20 z-10" />
                <Image
                  src="/hero-image.webp"
                  alt="مجموعة بيورنستا للاستشارات — شركة محاسبة في السويد تخدم العملاء في جميع أنحاء البلاد"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(min-width: 1024px) 50vw, 90vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">عملاء راضون</p>
                    <p className="text-sm text-gray-600">في جميع أنحاء السويد</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600 to-violet-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">
                    110+
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services-ar" className="py-20 bg-gradient-to-br from-gray-50 via-purple-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">خدماتنا</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              خبرة مالية{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                متكاملة
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة كاملة من خدمات المحاسبة والضرائب للشركات في جميع أنحاء السويد —
              مصممة وفق احتياجاتك ومقدمة رقمياً أينما كنت.
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
                  <div className="p-8 text-right">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center justify-end gap-2 text-gray-700">
                          <span>{f}</span>
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0`} />
                        </li>
                      ))}
                    </ul>
                    <Link href="#contact-ar" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                      ← احجز استشارة مجانية
                    </Link>
                  </div>
                  <div className={`h-1 bg-gradient-to-l ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right`} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">من نحن</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
            شركة محاسبة حديثة —{' '}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              تغطية وطنية
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            مجموعة بيورنستا للاستشارات مقرها في إسكيلستونا وتعمل مع أكثر من 110 شركة في جميع أنحاء السويد.
            نجمع بين الطابع الشخصي لشركة محلية والبنية التحتية الرقمية اللازمة لخدمة العملاء من مالمو إلى أوميا.
            ستحصل دائماً على جهة اتصال مخصصة تعرف أعمالك جيداً.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            نخدم العملاء باللغتين السويدية والعربية والإنجليزية — مما يجعلنا الخيار الطبيعي لرجال الأعمال
            العرب والشركات ذات الملكية الأجنبية والمنشآت التي تحتاج إلى دعم محاسبي متعدد اللغات في السويد.
            محاسب في السويد، موحاسب، mo7aseb — نحن هنا لخدمتك.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-8">
            {[
              { value: '110+', label: 'عميل' },
              { value: '3', label: 'لغات' },
              { value: '5+', label: 'سنوات' },
            ].map((m, i) => (
              <div key={i} className="bg-purple-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-600">{m.value}</div>
                <div className="text-sm text-gray-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
          <Link href="#contact-ar" className="inline-block bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300">
            تواصل معنا
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">الأسئلة الشائعة</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
              أسئلة{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                متكررة
              </span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-purple-50/50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className={`text-purple-600 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''} flex-shrink-0`}>▼</span>
                  <span className="text-lg font-semibold text-gray-900 pr-4 flex-1 text-right">{faq.question}</span>
                </button>
                <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed text-right">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact-ar" className="py-20 bg-gradient-to-tl from-purple-50 via-white to-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">تواصل معنا</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
              هل أنت مستعد لتنظيم{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                شؤونك المالية؟
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              احجز استشارة مجانية. نرد خلال 24 ساعة ويمكننا البدء بسرعة —
              بغض النظر عن مكان وجود شركتك في السويد.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 order-2 lg:order-1">
              <form
                name="contact-ar"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="contact-ar" />
                <div className="hidden"><input name="bot-field" /></div>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-right">
                    شكراً لرسالتك! سنرد عليك خلال 24 ساعة.
                  </div>
                )}

                <div>
                  <label htmlFor="ar-name" className="block text-sm font-semibold text-gray-700 mb-2 text-right">الاسم *</label>
                  <input type="text" id="ar-name" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-right" placeholder="اسمك الكامل" />
                </div>
                <div>
                  <label htmlFor="ar-company" className="block text-sm font-semibold text-gray-700 mb-2 text-right">اسم الشركة</label>
                  <input type="text" id="ar-company" name="company" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-right" placeholder="شركتك المحدودة" />
                </div>
                <div>
                  <label htmlFor="ar-email" className="block text-sm font-semibold text-gray-700 mb-2 text-right">البريد الإلكتروني *</label>
                  <input type="email" id="ar-email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="your@email.com" dir="ltr" />
                </div>
                <div>
                  <label htmlFor="ar-service" className="block text-sm font-semibold text-gray-700 mb-2 text-right">أنا مهتم بـ</label>
                  <select id="ar-service" name="service" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white text-right">
                    <option value="">اختر خدمة</option>
                    <option value="bookkeeping">المحاسبة والدفاتر المالية</option>
                    <option value="tax">الخدمات الضريبية</option>
                    <option value="payroll">إدارة الرواتب</option>
                    <option value="advisory">الاستشارات والتحليل</option>
                    <option value="all">الباقة الكاملة</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="ar-message" className="block text-sm font-semibold text-gray-700 mb-2 text-right">الرسالة *</label>
                  <textarea id="ar-message" name="message" required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-right" placeholder="أخبرنا باختصار عن شركتك وما تحتاج إلى مساعدة فيه" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300">
                  إرسال الرسالة
                </button>
              </form>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="bg-gradient-to-br from-purple-600 to-violet-600 text-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-right">معلومات الاتصال</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="bg-white/20 p-3 rounded-lg"><Mail size={24} /></div>
                    <div className="text-right">
                      <p className="font-semibold mb-1">البريد الإلكتروني</p>
                      <a href="mailto:fakhri.shehab@bjornstaconsulting.com" className="text-purple-100 hover:text-white transition-colors break-all text-sm">fakhri.shehab@bjornstaconsulting.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="bg-white/20 p-3 rounded-lg"><Phone size={24} /></div>
                    <div className="text-right">
                      <p className="font-semibold mb-1">الهاتف</p>
                      <a href="tel:+46760602088" className="text-purple-100 hover:text-white transition-colors" dir="ltr">+46 76-060 20 88</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="bg-white/20 p-3 rounded-lg"><MapPin size={24} /></div>
                    <div className="text-right">
                      <p className="font-semibold mb-1">المكتب</p>
                      <p className="text-purple-100 text-sm" dir="ltr">Heljestrandsgatan 5A<br />633 44 Eskilstuna, Sweden<br /><span className="text-purple-200">عملاء في جميع أنحاء السويد</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-right">خيارات اللغة</h3>
                <div className="flex gap-3 flex-row-reverse">
                  <Link href="/" className="flex-1 text-center border-2 border-purple-200 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-sm">🇸🇪 Svenska</Link>
                  <Link href="/en" className="flex-1 text-center border-2 border-purple-200 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-sm">🇬🇧 English</Link>
                  <span className="flex-1 text-center bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold text-sm">🇸🇦 العربية</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
