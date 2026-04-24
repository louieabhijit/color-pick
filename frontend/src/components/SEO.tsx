import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://color-peek.com';
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const SEO = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ColorPeek - Color Palette Generator & Design Tools',
    url: BASE_URL,
    description: 'Extract colour palettes from images, generate harmonies, check WCAG contrast, and use 13 free design tools - all in your browser, no sign-up required.',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Extract colour palettes from any image',
      'Generate colour harmonies and variations',
      'WCAG contrast checker',
      'CSS gradient generator',
      'Tint & shade scale generator',
      'Color blindness simulator',
      'Box shadow generator',
      'Glass effect generator',
      'Border radius builder',
      'Type scale generator',
      'Font pairing tool',
      'Palette exporter (CSS, SCSS, JSON, SVG, PNG)',
    ],
    publisher: {
      '@type': 'Organization',
      name: 'ColorPeek',
      url: BASE_URL,
    },
  };

  return (
    <Helmet>
      {/* Primary */}
      <title>ColorPeek - Color Palette Generator & Free Design Tools</title>
      <meta name="title" content="ColorPeek - Color Palette Generator & Free Design Tools" />
      <meta name="description" content="Extract colour palettes from any image, generate harmonies, check WCAG contrast, and use 13 free CSS & typography tools. Runs entirely in your browser - no sign-up." />
      <meta name="keywords" content="color palette generator, color picker, color extractor, css tools, gradient generator, box shadow, glassmorphism, type scale, font pairing, wcag contrast checker, free design tools" />
      <meta name="author" content="ColorPeek" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#6366f1" />
      <link rel="canonical" href={BASE_URL} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={BASE_URL} />
      <meta property="og:title" content="ColorPeek - Color Palette Generator & Free Design Tools" />
      <meta property="og:description" content="Extract colour palettes from any image, generate harmonies, check WCAG contrast, and use 13 free CSS & typography tools. Runs entirely in your browser - no sign-up." />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:site_name" content="ColorPeek" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={BASE_URL} />
      <meta name="twitter:title" content="ColorPeek - Color Palette Generator & Free Design Tools" />
      <meta name="twitter:description" content="Extract colour palettes from any image, generate harmonies, check WCAG contrast, and use 13 free CSS & typography tools." />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:site" content="@colorpeek" />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SEO;
