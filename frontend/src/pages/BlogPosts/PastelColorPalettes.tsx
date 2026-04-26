import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp, FaPalette, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const PastelColorPalettes = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: "Pastel Color Palettes for Modern Web Design: 8 Beautiful Collections",
    description: "Discover 8 curated pastel color palettes for web design - from soft spring florals to muted Scandinavian neutrals. Includes hex codes, CSS variables, and pairing tips.",
    author: "Sofia Martínez",
    date: "April 22, 2026",
    readTime: "8 min read",
    tags: ["Color Palette", "Pastel Colors", "Web Design", "UI Design", "Design Inspiration"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop"
  };

  const shareUrl = window.location.href;
  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${metadata.title}`, '_blank');
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  const shareOnLinkedIn = () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${metadata.title}`, '_blank');

  const palettes = [
    {
      name: "Spring Blossom",
      mood: "Fresh, feminine, approachable",
      use: "Beauty, lifestyle, wellness brands",
      colors: [
        { hex: "#FFD6E0", name: "Blush" },
        { hex: "#FFEFCF", name: "Cream" },
        { hex: "#C5E8B0", name: "Sage Mint" },
        { hex: "#B5D5F5", name: "Sky Blue" },
        { hex: "#DDB5F5", name: "Lavender" },
      ]
    },
    {
      name: "Scandinavian Mist",
      mood: "Clean, minimal, sophisticated",
      use: "SaaS, productivity tools, portfolios",
      colors: [
        { hex: "#F5F0EB", name: "Warm White" },
        { hex: "#E8E0D8", name: "Oat" },
        { hex: "#D4C5B5", name: "Sand" },
        { hex: "#B8C8D8", name: "Mist Blue" },
        { hex: "#9DB5A8", name: "Sage" },
      ]
    },
    {
      name: "Candy Pop",
      mood: "Playful, energetic, youthful",
      use: "Food & beverage, kids, Gen-Z brands",
      colors: [
        { hex: "#FF9EBC", name: "Bubblegum" },
        { hex: "#FFD166", name: "Lemon Drop" },
        { hex: "#06D6A0", name: "Aqua Mint" },
        { hex: "#A78BFA", name: "Soft Violet" },
        { hex: "#FFA07A", name: "Peach" },
      ]
    },
    {
      name: "Desert Dawn",
      mood: "Warm, earthy, organic",
      use: "Sustainable brands, travel, real estate",
      colors: [
        { hex: "#F2CBA7", name: "Terracotta Tint" },
        { hex: "#F5DEB3", name: "Wheat" },
        { hex: "#D4A98A", name: "Clay" },
        { hex: "#C9B99A", name: "Dune" },
        { hex: "#A8C5B5", name: "Succulent" },
      ]
    },
    {
      name: "Ocean Foam",
      mood: "Calming, trustworthy, airy",
      use: "Tech, healthcare, finance, SaaS",
      colors: [
        { hex: "#E0F4FF", name: "Ice Blue" },
        { hex: "#B3E5FC", name: "Aqua" },
        { hex: "#81D4FA", name: "Sky" },
        { hex: "#C5CAE9", name: "Periwinkle" },
        { hex: "#B2EBF2", name: "Foam" },
      ]
    },
    {
      name: "Golden Hour",
      mood: "Warm, nostalgic, luxurious",
      use: "Fashion, photography, lifestyle",
      colors: [
        { hex: "#FFF3CD", name: "Champagne" },
        { hex: "#FFE5A0", name: "Butter" },
        { hex: "#FFCBA4", name: "Apricot" },
        { hex: "#F7B3A0", name: "Coral Blush" },
        { hex: "#E8A598", name: "Rose Sand" },
      ]
    },
    {
      name: "Lavender Dreams",
      mood: "Dreamy, spiritual, creative",
      use: "Wellness, meditation, creative studios",
      colors: [
        { hex: "#F3E8FF", name: "Whisper" },
        { hex: "#E9D5FF", name: "Lilac" },
        { hex: "#D8B4FE", name: "Violet Mist" },
        { hex: "#C4B5FD", name: "Lavender" },
        { hex: "#A5B4FC", name: "Periwinkle" },
      ]
    },
    {
      name: "Matcha Café",
      mood: "Earthy, refined, artisanal",
      use: "Food, coffee brands, natural beauty",
      colors: [
        { hex: "#E8F5E9", name: "Matcha White" },
        { hex: "#C8E6C9", name: "Pale Leaf" },
        { hex: "#A5C8A0", name: "Sage Green" },
        { hex: "#D7CCC8", name: "Oat Latte" },
        { hex: "#BCAAA4", name: "Warm Taupe" },
      ]
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metadata.title} | ColorPeek Blog</title>
        <link rel="canonical" href="https://color-peek.com/blog/pastel-color-palettes-web-design" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="keywords" content="pastel color palette, pastel colors web design, soft color palette, pastel ui design, pastel hex codes, pastel color scheme, light color palette" />
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
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3"><FaPalette className="text-indigo-500" /> Why Pastel Palettes Work So Well</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Pastels are colors with high lightness and low-to-medium saturation - they're essentially colors mixed with significant white. They're visually restful, which is why they dominate wellness, lifestyle, and consumer apps. Unlike vibrant colors that demand attention, pastels invite the eye to linger. They also pair beautifully with white space, making them a natural fit for modern minimal layouts.
            </p>
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaHeart className="text-pink-400" /> What makes a good pastel palette?</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>✓ Consistent lightness level across all swatches (50–80% HSL lightness)</li>
                <li>✓ Varied hues so colors feel distinct, not muddy</li>
                <li>✓ At least one neutral (warm white, cream, or oat) as background</li>
                <li>✓ A slightly deeper accent for text and CTAs to maintain contrast</li>
                <li>✓ Maximum 5–6 colors to avoid visual noise</li>
              </ul>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold">8 Curated Pastel Palettes</h2>
            <p className="text-[var(--text-secondary)] mt-2 mb-8">Each palette includes hex codes, a mood label, and the type of product it suits best.</p>
            <div className="space-y-8">
              {palettes.map((palette, index) => (
                <motion.div key={palette.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + index * 0.06 }} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="flex h-16">
                    {palette.colors.map((c) => (
                      <div key={c.hex} className="flex-1" style={{ backgroundColor: c.hex }} title={`${c.name} - ${c.hex}`} />
                    ))}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="font-bold text-lg text-[var(--text-primary)]">{palette.name}</h3>
                        <p className="text-sm text-[var(--text-muted)]">{palette.mood}</p>
                      </div>
                      <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full">{palette.use}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {palette.colors.map((c) => (
                        <div key={c.hex} className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                          <div className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-600" style={{ backgroundColor: c.hex }} />
                          <span>{c.name}</span>
                          <code className="font-mono text-[10px]">{c.hex}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold">Accessibility Warning: Pastels & Contrast</h2>
            <p className="text-[var(--text-secondary)] mt-4">
              The biggest pitfall with pastel palettes is contrast. Pastel-on-pastel or pastel-on-white combinations almost never pass WCAG AA (4.5:1 for text). Always pair pastels with dark text - use a near-black like <code className="text-indigo-500">#1a1a2e</code> or <code className="text-indigo-500">#2d2d3e</code> rather than a tinted gray. Use the darker shades in your tint/shade scale for CTAs and important elements.
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl mt-6">
              <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Never use pastel text on a white background - it won't pass contrast</li>
                <li>• Use pastels as backgrounds, cards, and accent fills - not for text</li>
                <li>• A deep version of your accent (500–700 shade) works well for CTAs</li>
                <li>• Test your palette in both light and dark mode</li>
                <li>• Export your palette as CSS variables for consistent reuse across your project</li>
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
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Build and export your own pastel palette</h3>
            <p className="text-[var(--text-muted)] mb-6 text-sm">Generate a full tint scale from any pastel hex, or export your palette as CSS, Tailwind, or JSON.</p>
            <div className="flex flex-wrap gap-3">
              <a href="/palettes" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Color Palette Generator →</a>
              <a href="/tint-shade" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">Tint &amp; Shade Generator</a>
              <a href="/palette-exporter" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">Export Palette</a>
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

export default PastelColorPalettes;
