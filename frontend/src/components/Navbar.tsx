import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LinkProps } from 'react-router-dom';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Use RouterLink instead of Link throughout the component
const Link = RouterLink as React.ComponentType<LinkProps>;

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

// Color input validation
const isValidHexColor = (color: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
};

const ColorInput = ({ onColorSelect }: { onColorSelect: (color: string) => void }) => {
  const [inputColor, setInputColor] = useState('');
  const [isError, setIsError] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleColorSubmit = () => {
    const formattedColor = inputColor.startsWith('#') ? inputColor : `#${inputColor}`;
    if (isValidHexColor(formattedColor)) {
      onColorSelect(formattedColor);
      setIsError(false);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="relative flex items-center space-x-2">
      <input
        type="text"
        placeholder="#FFFFFF"
        value={inputColor}
        onChange={(e) => {
          setInputColor(e.target.value);
          setIsError(false);
        }}
        className={`w-24 px-2 py-1 text-sm rounded-lg bg-white/10 backdrop-blur-sm
                   border ${isError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                   text-gray-700 dark:text-gray-300 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-primary/50
                   transition-all duration-200`}
      />
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleColorSubmit}
        className="relative px-4 py-1 rounded-md
                 bg-gradient-to-r from-primary/10 to-secondary/10
                 dark:from-primary/20 dark:to-secondary/20
                 text-sm font-medium
                 text-gray-700 dark:text-gray-200
                 overflow-hidden
                 transition-all duration-300
                 hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]
                 dark:hover:shadow-[0_0_20px_rgba(var(--color-primary),0.2)]
                 group"
      >
        <span className="relative z-10">Get Info</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20
                     dark:from-primary/30 dark:to-secondary/30
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
        />
      </motion.button>
      <AnimatePresence>
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-8 left-0 text-sm font-medium text-green-500"
          >
            Color applied!
          </motion.div>
        )}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-8 left-0 text-sm font-medium text-red-500"
          >
            Invalid hex color
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = ({ onColorSelect }: { onColorSelect: (color: string) => void }) => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Color Palettes', href: '/palettes' },
    { name: 'Gradients', href: '/gradients' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const handleColorSelect = (color: string) => {
    onColorSelect(color);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900">
      <nav className="max-w-[1920px] mx-auto px-6">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="navbar-glass rounded-b-2xl p-4"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <ColorPickerLogo />
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
              >
                ColorPeek
              </motion.span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
                           transition-colors duration-200 ${
                             location.pathname === item.href ? 'font-semibold text-indigo-500 dark:text-indigo-400' : ''
                           }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="inline-flex items-center justify-center">
                <svg
                  onClick={() => setIsDark(!isDark)}
                  className={`w-7 h-7 cursor-pointer transition-all duration-300
                            ${isDark 
                              ? 'text-indigo-300 hover:text-indigo-200' 
                              : 'text-amber-400 hover:text-amber-500'}`}
                  fill={isDark ? 'none' : 'currentColor'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isDark ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  )}
                </svg>
              </div>
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className="flex md:hidden items-center space-x-4">
              <div className="inline-flex items-center justify-center">
                <svg
                  onClick={() => setIsDark(!isDark)}
                  className={`w-7 h-7 cursor-pointer transition-all duration-300
                            ${isDark 
                              ? 'text-indigo-300 hover:text-indigo-200' 
                              : 'text-amber-400 hover:text-amber-500'}`}
                  fill={isDark ? 'none' : 'currentColor'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isDark ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  )}
                </svg>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 
                         hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4"
              >
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
                               transition-colors duration-200 ${
                                 location.pathname === item.href ? 'font-semibold text-indigo-500 dark:text-indigo-400' : ''
                               }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar; 