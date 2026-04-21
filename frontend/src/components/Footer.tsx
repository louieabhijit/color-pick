import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
  ];

  return (
    <footer className="relative mt-8">
      <div className="glass-card rounded-none rounded-t-4xl border-b-0 mx-0">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <circle cx="6" cy="6" r="3.5" fill="white" opacity="0.9" />
                  <circle cx="12" cy="6" r="3.5" fill="white" opacity="0.6" />
                  <circle cx="9" cy="12" r="3.5" fill="white" opacity="0.75" />
                </svg>
              </div>
              <span className="text-lg font-bold gradient-text">ColorPeek</span>
            </motion.div>

            {/* Links */}
            <motion.nav
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </motion.nav>

            {/* Social + copyright */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/louieabhijit/color-pick"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl glass-button text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                © {year} ColorPeek · Made with <FaHeart className="w-3 h-3 text-rose-400" />
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
