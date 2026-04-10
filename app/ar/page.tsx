import type { Metadata } from 'next';
import ArabicPage from '@/components/ArabicPage';

export const metadata: Metadata = {
  title: 'شركة محاسبة في السويد | خدمات محاسبية - Björnsta',
  description: 'شركة محاسبة في إسكيلستونا، السويد. نخدم أكثر من 110 عميل في جميع أنحاء السويد. خدمات المحاسبة، الضرائب والرواتب باللغة العربية والسويدية والإنجليزية. محاسب في السويد، mo7aseb.',
  alternates: {
    canonical: '/ar',
    languages: {
      'sv': '/',
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    title: 'شركة محاسبة في السويد | Björnsta Consulting Group',
    description: 'شركة محاسبة في إسكيلستونا تخدم أكثر من 110 عميل في السويد. خدمات المحاسبة والضرائب والرواتب باللغة العربية.',
    locale: 'ar_SE',
    url: 'https://bjornsta.se/ar',
  },
};

export default function ArabicHomePage() {
  return <ArabicPage />;
}
