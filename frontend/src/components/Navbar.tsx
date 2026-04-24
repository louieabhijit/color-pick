import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LinkProps } from 'react-router-dom';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  IconPalettes,
  IconGradients,
  IconGradientGenerator,
  IconTintShade,
  IconColorBlindness,
} from './ToolIcons';

const Link = RouterLink as React.ComponentType<LinkProps>;

const Logo = () => (
  <div className="relative w-8 h-8">
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30" />
    <div className="absolute inset-0 flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="6"  cy="6"  r="3.5" fill="white" opacity="0.9" />
        <circle cx="12" cy="6"  r="3.5" fill="white" opacity="0.6" />
        <circle cx="9"  cy="12" r="3.5" fill="white" opacity="0.75" />
      </svg>
    </div>
  </div>
);

const isValidHexColor = (color: string): boolean =>
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

const ColorInput = ({ onColorSelect }: { onColorSelect: (color: string) => void }) => {
  const [inputColor, setInputColor] = useState('');
  const [isError, setIsError] = useState(false);
  const [showApplied, setShowApplied] = useState(false);

  const handleColorSubmit = () => {
    const formatted = inputColor.startsWith('#') ? inputColor : `#${inputColor}`;
    if (isValidHexColor(formatted)) {
      onColorSelect(formatted);
      setIsError(false);
      setShowApplied(true);
      setTimeout(() => setShowApplied(false), 2000);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <input
        type="text"
        placeholder="#FFFFFF"
        value={inputColor}
        onChange={e => { setInputColor(e.target.value); setIsError(false); }}
        onKeyDown={e => e.key === 'Enter' && handleColorSubmit()}
        className={`w-24 px-3 py-1.5 text-sm rounded-xl glass-input
                   ${isError ? 'border-red-400/60' : ''}
                   placeholder:text-[var(--text-muted)] text-[var(--text-primary)]`}
      />
      <motion.button
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        onClick={handleColorSubmit}
        className="px-4 py-1.5 rounded-xl text-sm font-semibold glass-button-primary"
      >
        Get Info
      </motion.button>
      <AnimatePresence>
        {showApplied && (
          <motion.span
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="absolute -bottom-7 left-0 text-xs font-medium text-emerald-500 whitespace-nowrap"
          >
            ✓ Color applied
          </motion.span>
        )}
        {isError && (
          <motion.span
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="absolute -bottom-7 left-0 text-xs font-medium text-red-400 whitespace-nowrap"
          >
            Invalid hex color
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Nav data ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { name: 'Home',    href: '/' },
  { name: 'Tools',   href: '/tools' },
  { name: 'Blog',    href: '/blog' },
  { name: 'About',   href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQ',     href: '/faq' },
];

// Tool entries shown in mobile menu with SVG icons
const MOBILE_TOOLS = [
  { name: 'Color Palettes',     href: '/palettes',           Icon: IconPalettes },
  { name: 'Gradients',          href: '/gradients',          Icon: IconGradients },
  { name: 'Gradient Generator', href: '/gradient-generator', Icon: IconGradientGenerator },
  { name: 'Tint & Shade',       href: '/tint-shade',         Icon: IconTintShade },
  { name: 'Color Blindness',    href: '/color-blindness',    Icon: IconColorBlindness },
];

const TOOL_PATHS = MOBILE_TOOLS.map(t => t.href).concat('/tools');

// ── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = ({ onColorSelect }: { onColorSelect: (color: string) => void }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('colorpeek-theme');
    return saved !== null ? saved === 'dark' : false;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('colorpeek-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const isActive = (href: string) =>
    href === '/tools'
      ? TOOL_PATHS.includes(location.pathname)
      : location.pathname === href;

  const NavLink = ({ name, href }: { name: string; href: string }) => {
    const active = isActive(href);
    return (
      <Link to={href}
        className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
          ${active ? 'text-indigo-600 dark:text-violet-400' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
      >
        {active && (
          <motion.div layoutId="nav-pill"
            className="absolute inset-0 rounded-lg bg-white/60 dark:bg-indigo-500/20 shadow-sm border border-white/50 dark:border-indigo-400/30"
            style={{ backdropFilter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative z-10">{name}</span>
      </Link>
    );
  };

  const ThemeToggle = () => (
    <motion.button
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      onClick={() => setIsDark(!isDark)}
      className="w-9 h-9 flex items-center justify-center rounded-xl glass-button"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </motion.svg>
        ) : (
          <motion.svg key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
            className="text-amber-500" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo />
            <span className="text-lg font-bold gradient-text">ColorPeek</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => <NavLink key={item.href} {...item} />)}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ColorInput onColorSelect={onColorSelect} />
            </div>
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl glass-button"
              aria-label="Menu"
            >
              <motion.svg
                animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-[var(--text-secondary)]"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="glass-card mx-0 mb-4 p-4 space-y-1">
                {/* Main nav */}
                {NAV_ITEMS.filter(i => i.href !== '/tools').map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      <Link to={item.href}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                          ${active ? 'bg-white/60 dark:bg-indigo-500/20 text-indigo-600 dark:text-violet-400 shadow-sm border border-transparent dark:border-indigo-400/25' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/30 dark:hover:bg-white/6'}`}
                      >{item.name}</Link>
                    </motion.div>
                  );
                })}

                {/* Tools section */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.04 }}
                  className="pt-3 pb-1"
                >
                  <div className="flex items-center gap-2 px-4">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">Tools</span>
                    <div className="flex-1 h-px bg-white/20 dark:bg-white/10" />
                  </div>
                </motion.div>

                {MOBILE_TOOLS.map(({ name, href, Icon }, i) => {
                  const active = location.pathname === href;
                  return (
                    <motion.div key={href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (NAV_ITEMS.length + 1 + i) * 0.04 }}
                    >
                      <Link to={href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                          ${active ? 'bg-white/60 dark:bg-indigo-500/20 text-indigo-600 dark:text-violet-400 shadow-sm border border-transparent dark:border-indigo-400/25' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/30 dark:hover:bg-white/6'}`}
                      >
                        <span className={`${active ? 'text-indigo-500' : 'text-[var(--text-muted)]'}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <span>{name}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-3 border-t border-white/30 dark:border-white/8">
                  <ColorInput onColorSelect={onColorSelect} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
