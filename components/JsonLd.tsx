export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Björnsta Consulting Group',
    url: 'https://bjornsta.se',
    logo: 'https://bjornsta.se/hero-image.jpg',
    description: 'Professionell redovisningsbyrå som erbjuder bokföring, redovisning och skattetjänster i Stockholm',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Stockholm',
      addressCountry: 'SE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+46-123-456-789',
      contactType: 'Customer Service',
      email: 'fakhri.shehab@bjornstaconsulting.com',
      availableLanguage: ['Swedish', 'English'],
    },
    sameAs: [
      'https://www.facebook.com/bjornsta',
      'https://www.linkedin.com/company/bjornsta',
      'https://www.instagram.com/bjornsta',
    ],
    founder: {
      '@type': 'Person',
      name: 'Björnsta Consulting Group',
    },
    foundingDate: '2019',
    areaServed: {
      '@type': 'Country',
      name: 'Sweden',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '60',
    },
  };

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Björnsta Consulting Group',
    image: 'https://bjornsta.se/hero-image.jpg',
    '@id': 'https://bjornsta.se',
    url: 'https://bjornsta.se',
    telephone: '+46-123-456-789',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Stockholm',
      addressLocality: 'Stockholm',
      addressCountry: 'SE',
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
    </>
  );
}
