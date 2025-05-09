import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Sitemap = () => {
  const sitemapLinks = {
    Main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
    ],
    Tools: [
      { name: 'Color Palettes', href: '/palettes' },
      { name: 'Gradients', href: '/gradients' },
      { name: 'Color Harmony', href: '/color-harmony' },
      { name: 'Contrast Checker', href: '/contrast' },
    ],
    Blog: [
      { name: 'Blog Home', href: '/blog' },
      { name: 'Color Theory Guide', href: '/blog/complete-guide-color-theory-designers' },
      { name: 'Color Palette Tools', href: '/blog/top-5-free-color-palette-tools-2025' },
      { name: 'Image Color Extraction', href: '/blog/how-to-extract-colors-from-image' },
      { name: 'WCAG Guidelines', href: '/blog/wcag-color-contrast-guidelines' },
      { name: 'Color Psychology', href: '/blog/color-psychology-customer-behavior' },
      { name: 'Brand Color Guide', href: '/blog/how-to-choose-brand-color-palette' },
      { name: 'Color Perception', href: '/blog/science-behind-color-perception' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Helmet>
        <title>Sitemap | ColorPeek</title>
        <meta name="description" content="Navigate through all pages and resources available on ColorPeek." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Sitemap</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(sitemapLinks).map(([category, links]) => (
            <div key={category}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{category}</h2>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sitemap; 