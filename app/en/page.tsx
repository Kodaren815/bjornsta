import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight, Globe, BookOpen, Calculator, FileCheck, TrendingUp, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import EnglishPage from '@/components/EnglishPage';

export const metadata: Metadata = {
  title: 'Accounting Firm in Sweden | Bookkeeping & Tax Services - Björnsta',
  description: 'Accounting firm based in Eskilstuna, serving 110+ clients across Sweden. Bookkeeping, tax services and payroll in Swedish, English & Arabic. Call +46 76-060 20 88.',
  alternates: {
    canonical: '/en',
    languages: {
      'sv': '/',
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    title: 'Accounting Firm in Sweden | Bookkeeping & Tax Services - Björnsta',
    description: 'Accounting firm based in Eskilstuna, serving 110+ clients across Sweden. Bookkeeping, tax services and payroll in Swedish, English & Arabic.',
    locale: 'en_SE',
    url: 'https://bjornsta.se/en',
  },
};

export default function EnglishHomePage() {
  return <EnglishPage />;
}
