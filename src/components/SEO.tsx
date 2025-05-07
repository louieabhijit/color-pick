import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Color Peek - Extract Colors & Generate Palettes',
  description = 'Upload images and get beautiful color palettes with hex codes.',
  image = 'https://color-peek.com/preview.jpg',
  url = 'https://color-peek.com',
  type = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle = 'Color Peek',
  twitterDescription = 'Easily extract colors from images and build palettes.',
  twitterImage = 'https://color-peek.com/preview.jpg',
  keywords = 'color picker, color palette, color extraction, hex codes, color tools, web design, UI design'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 