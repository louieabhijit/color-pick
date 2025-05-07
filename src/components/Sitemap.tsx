import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap: React.FC = () => {
  const siteStructure = [
    {
      title: 'Main Pages',
      links: [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/faq', label: 'FAQ' },
        { path: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Tools & Features',
      links: [
        { path: '/shortcuts', label: 'Keyboard Shortcuts' },
        { path: '/help', label: 'Help Guide' },
      ],
    },
    {
      title: 'Content',
      links: [
        { path: '/blog', label: 'Blog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { path: '/privacy-policy', label: 'Privacy Policy' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Sitemap</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteStructure.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    to={link.path}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sitemap; 