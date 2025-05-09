import { Helmet } from 'react-helmet-async';

const SEO = () => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>ColorPeek - Color Palette Generator & Design Tools</title>
      <meta name="title" content="ColorPeek - Color Palette Generator & Design Tools" />
      <meta name="description" content="Create beautiful color palettes, extract colors from images, and access essential color tools for designers and developers. Free and easy to use." />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://color-peek.com/" />
      <meta property="og:title" content="ColorPeek - Color Palette Generator & Design Tools" />
      <meta property="og:description" content="Create beautiful color palettes, extract colors from images, and access essential color tools for designers and developers. Free and easy to use." />
      <meta property="og:image" content="https://color-peek.com/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://color-peek.com/" />
      <meta property="twitter:title" content="ColorPeek - Color Palette Generator & Design Tools" />
      <meta property="twitter:description" content="Create beautiful color palettes, extract colors from images, and access essential color tools for designers and developers. Free and easy to use." />
      <meta property="twitter:image" content="https://color-peek.com/twitter-image.jpg" />

      {/* Additional Meta Tags */}
      <meta name="keywords" content="color palette generator, color tools, color picker, color scheme, color harmony, color theory, design tools, web design, UI design" />
      <meta name="author" content="ColorPeek" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#6366f1" />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://color-peek.com/" />
    </Helmet>
  );
};

export default SEO; 