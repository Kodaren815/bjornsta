export default function ContactEmail({
  name,
  company,
  email,
  phone,
  language,
  service,
  message,
}) {
  return (
    <html lang="sv">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          color: '#1f2937',
          backgroundColor: '#f9fafb',
          margin: 0,
          padding: '24px',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              padding: '24px 32px',
            }}
          >
            <h1
              style={{
                color: '#ffffff',
                margin: 0,
                fontSize: '20px',
                fontWeight: '700',
              }}
            >
              Nytt kontaktformulär — Björnsta
            </h1>
          </div>

          {/* Body */}
          <div style={{ padding: '32px' }}>
            <table
              style={{ width: '100%', borderCollapse: 'collapse' }}
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr>
                  <td style={labelStyle}>Namn</td>
                  <td style={valueStyle}>{name}</td>
                </tr>
                {company && (
                  <tr>
                    <td style={labelStyle}>Företagsnamn</td>
                    <td style={valueStyle}>{company}</td>
                  </tr>
                )}
                <tr>
                  <td style={labelStyle}>E-post</td>
                  <td style={valueStyle}>
                    <a href={`mailto:${email}`} style={{ color: '#7c3aed' }}>
                      {email}
                    </a>
                  </td>
                </tr>
                {phone && (
                  <tr>
                    <td style={labelStyle}>Telefon</td>
                    <td style={valueStyle}>{phone}</td>
                  </tr>
                )}
                {language && (
                  <tr>
                    <td style={labelStyle}>Föredragen kommunikation</td>
                    <td style={valueStyle}>{language}</td>
                  </tr>
                )}
                {service && (
                  <tr>
                    <td style={labelStyle}>Tjänst</td>
                    <td style={valueStyle}>{service}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div
              style={{
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              <p
                style={{
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 8px 0',
                }}
              >
                Meddelande
              </p>
              <p
                style={{
                  color: '#4b5563',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                }}
              >
                {message}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              backgroundColor: '#f3f4f6',
              padding: '16px 32px',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>
              Björnsta Consulting Group · Heljestrandsgatan 5A, 633 44 Eskilstuna ·{' '}
              <a href="mailto:fakhri.shehab@bjornstaconsulting.com" style={{ color: '#9ca3af' }}>
                fakhri.shehab@bjornstaconsulting.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

const labelStyle = {
  fontWeight: '600',
  color: '#374151',
  padding: '8px 16px 8px 0',
  verticalAlign: 'top',
  width: '200px',
  fontSize: '14px',
};

const valueStyle = {
  color: '#4b5563',
  padding: '8px 0',
  verticalAlign: 'top',
  fontSize: '14px',
};
