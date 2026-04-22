import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp, FaEye, FaCheck, FaTimes, FaUniversalAccess } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ColorContrastGuide = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: "Color Contrast & WCAG Compliance: The Developer's Accessibility Guide",
    description: "Learn how to measure color contrast ratios, meet WCAG 2.2 AA and AAA standards, simulate color blindness, and build accessible UIs that work for everyone.",
    author: "Priya Sharma",
    date: "April 22, 2026",
    readTime: "11 min read",
    tags: ["Accessibility", "WCAG", "Color Contrast", "UI Design", "Color Blindness"],
    image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2070&auto=format&fit=crop"
  };

  const shareUrl = window.location.href;
  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${metadata.title}`, '_blank');
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  const shareOnLinkedIn = () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${metadata.title}`, '_blank');

  const standards = [
    { level: "AA — Normal text", ratio: "4.5:1", passes: true, example: "Body copy, labels, inputs" },
    { level: "AA — Large text (18px+)", ratio: "3:1", passes: true, example: "Headings, hero text" },
    { level: "AA — UI components", ratio: "3:1", passes: true, example: "Borders, icons, focus rings" },
    { level: "AAA — Normal text", ratio: "7:1", passes: true, example: "Critical body copy" },
    { level: "AAA — Large text", ratio: "4.5:1", passes: true, example: "Enhanced headings" },
  ];

  const badPairs = [
    { bg: "#ffffff", fg: "#aaaaaa", ratio: "2.3:1", label: "Gray on White — FAIL" },
    { bg: "#0000ff", fg: "#ff0000", ratio: "1.0:1", label: "Red on Blue — FAIL" },
    { bg: "#ffff00", fg: "#ffffff", ratio: "1.1:1", label: "White on Yellow — FAIL" },
  ];

  const goodPairs = [
    { bg: "#1a1a2e", fg: "#e8e8f8", ratio: "14.5:1", label: "Light on Dark — AAA" },
    { bg: "#4f46e5", fg: "#ffffff", ratio: "5.9:1", label: "White on Indigo — AA" },
    { bg: "#ffffff", fg: "#1d4ed8", ratio: "7.2:1", label: "Blue on White — AAA" },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metadata.title} | ColorPeek Blog</title>
        <link rel="canonical" href="https://color-peek.com/blog/color-contrast-accessibility-guide" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="keywords" content="color contrast checker, wcag accessibility, color contrast ratio, accessible color palette, color blindness design, wcag 2.2 compliance, accessible web design" />
      </Helmet>
      <Navbar onColorSelect={() => {}} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={metadata.image} alt={metadata.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl md:text-5xl font-bold text-white mb-4">{metadata.title}</motion.h1>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
            <div className="flex items-center"><FaCalendar className="w-4 h-4 mr-2" /><span>{metadata.date}</span></div>
            <div className="flex items-center"><FaClock className="w-4 h-4 mr-2" /><span>{metadata.readTime}</span></div>
            <div className="flex items-center"><FaTags className="w-4 h-4 mr-2" /><span className="hidden md:inline">{metadata.tags.join(', ')}</span></div>
          </motion.div>
        </div>
      </motion.div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl md:text-3xl font-bold">Why Color Contrast Is a Legal and Moral Requirement</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Approximately 1 in 12 men and 1 in 200 women have some form of color vision deficiency. Add low-vision users, people reading on bright screens outdoors, and aging users, and you're looking at a significant portion of your audience who will struggle with low-contrast text. WCAG (Web Content Accessibility Guidelines) defines measurable contrast ratios so designers and developers have objective targets to hit.
            </p>
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>✓ How contrast ratios are calculated (the math)</li>
                <li>✓ WCAG 2.2 AA vs AAA requirements</li>
                <li>✓ Common contrast failures and how to fix them</li>
                <li>✓ Color blindness types and how they affect palette choices</li>
                <li>✓ Tools to test your designs for accessibility</li>
              </ul>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold">How Contrast Ratios Are Calculated</h2>
            <p className="text-[var(--text-secondary)] mt-4">
              The WCAG contrast ratio formula compares the relative luminance of two colors. Luminance is a measure of perceived brightness, calculated by converting sRGB values through a gamma correction formula. The ratio is expressed as X:1, where 1:1 is no contrast (same color) and 21:1 is maximum contrast (black on white).
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-xl font-semibold mb-4">The Formula</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">{`// 1. Convert each 8-bit channel to linear light
function toLinear(c: number) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

// 2. Calculate relative luminance
function luminance(r: number, g: number, b: number) {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

// 3. Compute contrast ratio
function contrastRatio(L1: number, L2: number) {
  const lighter = Math.max(L1, L2);
  const darker  = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}`}</pre>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold">WCAG 2.2 Standards at a Glance</h2>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-indigo-50 dark:bg-indigo-900/20">
                    <th className="text-left p-3 rounded-tl-lg">Criterion</th>
                    <th className="text-left p-3">Min. Ratio</th>
                    <th className="text-left p-3 rounded-tr-lg">Applies To</th>
                  </tr>
                </thead>
                <tbody>
                  {standards.map((s, i) => (
                    <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="p-3 text-[var(--text-primary)] font-medium">{s.level}</td>
                      <td className="p-3"><span className="font-bold text-indigo-600 dark:text-indigo-400">{s.ratio}</span></td>
                      <td className="p-3 text-[var(--text-muted)]">{s.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold">Failing vs Passing Pairs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-red-500 mb-4 flex items-center gap-2"><FaTimes /> Common Failures</h3>
                <div className="space-y-3">
                  {badPairs.map((p, i) => (
                    <div key={i} className="rounded-xl overflow-hidden shadow">
                      <div className="h-14 flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: p.bg, color: p.fg }}>{p.label}</div>
                      <div className="bg-white dark:bg-gray-800 px-3 py-2 text-xs text-[var(--text-muted)]">Ratio: {p.ratio}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-500 mb-4 flex items-center gap-2"><FaCheck /> Passing Pairs</h3>
                <div className="space-y-3">
                  {goodPairs.map((p, i) => (
                    <div key={i} className="rounded-xl overflow-hidden shadow">
                      <div className="h-14 flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: p.bg, color: p.fg }}>{p.label}</div>
                      <div className="bg-white dark:bg-gray-800 px-3 py-2 text-xs text-[var(--text-muted)]">Ratio: {p.ratio}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3"><FaEye className="text-indigo-500" /> Color Blindness & Palette Design</h2>
            <p className="text-[var(--text-secondary)] mt-4">
              Contrast ratio alone doesn't cover color blindness. Deuteranopia (red-green) affects 6% of men — if you rely on red vs green to convey status (error vs success), color-blind users won't see the difference. Always pair color with another visual cue: an icon, a label, or a pattern.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-6 space-y-4">
              <h3 className="font-semibold text-lg">The 4 most common types:</h3>
              {[
                { name: "Deuteranopia", pct: "~6% of men", desc: "Reduced sensitivity to green. Red and green look similar." },
                { name: "Protanopia", pct: "~2% of men", desc: "Reduced sensitivity to red. Reds appear dark/brownish." },
                { name: "Tritanopia", pct: "~0.01%", desc: "Rare. Blue and yellow are confused." },
                { name: "Achromatopsia", pct: "~0.003%", desc: "Complete color blindness — sees only grayscale." },
              ].map((t, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[var(--text-primary)]">{t.name}</span>
                    <span className="text-[var(--text-muted)] text-sm ml-2">({t.pct})</span>
                    <p className="text-[var(--text-secondary)] text-sm">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3"><FaUniversalAccess className="text-indigo-500" /> Practical Checklist</h2>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl mt-6">
              <h3 className="text-xl font-semibold mb-4">Before you ship, verify:</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• All body text meets 4.5:1 (AA) — aim for 7:1 (AAA) where possible</li>
                <li>• Large text (18px+) meets 3:1 minimum</li>
                <li>• Interactive element borders/focus rings meet 3:1 against their background</li>
                <li>• Never convey information with color alone — add icons or labels</li>
                <li>• Test your UI through deuteranopia and protanopia simulations</li>
                <li>• Check contrast in both light and dark mode</li>
                <li>• Placeholder text must also meet contrast requirements</li>
              </ul>
            </div>
          </motion.section>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="flex items-center text-lg font-semibold mb-4"><FaShare className="mr-2" />Share this article</h3>
            <div className="flex space-x-4">
              <button onClick={shareOnTwitter} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"><FaTwitter className="w-5 h-5" /></button>
              <button onClick={shareOnFacebook} className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"><FaFacebook className="w-5 h-5" /></button>
              <button onClick={shareOnLinkedIn} className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"><FaLinkedin className="w-5 h-5" /></button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-12 rounded-2xl p-8 border border-indigo-200/40 dark:border-indigo-500/20" style={{ background: 'rgba(99,102,241,0.06)' }}>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Test your palette for accessibility</h3>
            <p className="text-[var(--text-muted)] mb-6 text-sm">Simulate 7 types of color blindness and check contrast ratios with these free ColorPeek tools.</p>
            <div className="flex flex-wrap gap-3">
              <a href="/color-blindness" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Color Blindness Simulator →</a>
              <a href="/color-converter" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">Color Converter</a>
            </div>
          </motion.div>

          {/* Final ad placement */}
        </div>
      </article>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={scrollToTop} className="fixed bottom-8 right-8 p-4 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-colors">
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorContrastGuide;
