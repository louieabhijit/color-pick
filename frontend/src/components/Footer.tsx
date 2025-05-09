import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ColorPickerLogo = () => (
  <motion.div
    className="relative w-8 h-8"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    {/* Color circles */}
    {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'].map((color, index) => (
      <motion.div
        key={color}
        className="absolute w-3 h-3 rounded-full"
        style={{
          backgroundColor: color,
          left: `${Math.cos(2 * Math.PI * index / 5) * 12 + 16}px`,
          top: `${Math.sin(2 * Math.PI * index / 5) * 12 + 16}px`,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.4,
          ease: "easeInOut"
        }}
      />
    ))}
    {/* Center dot */}
    <motion.div
      className="absolute w-2 h-2 bg-primary rounded-full"
      style={{ left: '14px', top: '14px' }}
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <ColorPickerLogo />
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                ColorPeek
            </Link>
                <a
              href="https://github.com/louieabhijit/color-pick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              aria-label="GitHub"
                >
              <FaGithub className="w-5 h-5" />
                </a>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {links.map((link) => (
                      <Link
                key={link.name}
                        to={link.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                ))}
          </nav>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} ColorPeek. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 