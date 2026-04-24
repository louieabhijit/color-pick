import { Helmet } from 'react-helmet-async';

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  /** JSON-LD structured data object - serialized automatically */
  schema?: object;
}

const BASE_URL = 'https://color-peek.com';
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const PageSEO = ({ title, description, path, keywords, schema }: PageSEOProps) => {
  const canonical = `${BASE_URL}${path}`;
  const fullTitle = title.includes('ColorPeek') ? title : `${title} | ColorPeek`;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: fullTitle,
    description,
    url: canonical,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: {
      '@type': 'Organization',
      name: 'ColorPeek',
      url: BASE_URL,
    },
  };

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="ColorPeek" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#6366f1" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:site_name" content="ColorPeek" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:site" content="@colorpeek" />

      {/* JSON-LD - main schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema ?? defaultSchema)}
      </script>

      {/* JSON-LD - BreadcrumbList */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: title.split('|')[0].trim(), item: canonical },
          ],
        })}
      </script>
    </Helmet>
  );
};

export default PageSEO;
