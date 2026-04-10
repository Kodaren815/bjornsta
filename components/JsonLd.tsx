export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: 'Björnsta Consulting Group',
    url: 'https://bjornsta.se',
    logo: 'https://bjornsta.se/PDF_file_page-0001-removebg-preview.png',
    image: 'https://bjornsta.se/hero-image.webp',
    description: 'Professionell redovisningsbyrå i Eskilstuna med 110+ kunder i hela Sverige. Vi erbjuder bokföring, redovisning, skattetjänster och löneadministration på svenska, engelska och arabiska.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Heljestrandsgatan 5A',
      addressLocality: 'Eskilstuna',
      postalCode: '633 44',
      addressRegion: 'Södermanland',
      addressCountry: 'SE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 59.3706,
      longitude: 16.5095,
    },
    telephone: '+46760602088',
    email: 'fakhri.shehab@bjornstaconsulting.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    availableLanguage: [
      { '@type': 'Language', name: 'Swedish' },
      { '@type': 'Language', name: 'English' },
      { '@type': 'Language', name: 'Arabic' },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Sweden',
    },
    priceRange: '$$',
    foundingDate: '2019',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '110',
    },
    sameAs: [
      'https://www.facebook.com/bjornsta',
      'https://www.linkedin.com/company/bjornsta',
      'https://www.instagram.com/bjornsta',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Redovisningstjänster',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bokföring & Redovisning',
            description: 'Löpande bokföring, månadsrapporter och årsredovisning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Skattetjänster',
            description: 'Skattedeklarationer, skatteplanering och momsredovisning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Löneadministration',
            description: 'Professionell lönehantering och personaladministration',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rådgivning & Analys',
            description: 'Finansiell rådgivning, budgetering och affärsplanering',
          },
        },
      ],
    },
  };

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://bjornsta.se/#business',
    name: 'Björnsta Consulting Group',
    image: 'https://bjornsta.se/hero-image.webp',
    url: 'https://bjornsta.se',
    telephone: '+46760602088',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Heljestrandsgatan 5A',
      addressLocality: 'Eskilstuna',
      postalCode: '633 44',
      addressRegion: 'Södermanland',
      addressCountry: 'SE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 59.3706,
      longitude: 16.5095,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    areaServed: 'Sweden',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
    </>
  );
}
