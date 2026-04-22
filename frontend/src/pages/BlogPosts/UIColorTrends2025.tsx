import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const UIColorTrends2025 = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const metadata = {
    title: "UI Color Trends 2025: What's Shaping Modern Digital Design",
    description: "Explore the biggest color trends defining UI and web design in 2025 — from earthy neutrals and digital moss to neon accents, AI-inspired gradients, and neo-brutalism palettes.",
    author: "Zoe Williams",
    date: "April 22, 2026",
    readTime: "10 min read",
    tags: ["Color Trends", "UI Design", "Web Design", "2025", "Design Inspiration"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  };
  const shareUrl = window.location.href;
  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${metadata.title}`, '_blank');
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  const shareOnLinkedIn = () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${metadata.title}`, '_blank');

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metadata.title} | ColorPeek Blog</title>
        <link rel="canonical" href="https://color-peek.com/blog/ui-color-trends-2025" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="keywords" content="ui color trends 2025, web design color trends, digital design colors 2025, color palette trends, modern ui colors, design trends 2025" />
      </Helmet>
      <Navbar onColorSelect={() => {}} />

      {/* Hero */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={metadata.image} alt={metadata.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {metadata.title}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-gray-300 text-sm"
          >
            <div className="flex items-center"><FaCalendar className="w-4 h-4 mr-2" /><span>{metadata.date}</span></div>
            <div className="flex items-center"><FaClock className="w-4 h-4 mr-2" /><span>{metadata.readTime}</span></div>
            <div className="flex items-center"><FaTags className="w-4 h-4 mr-2" /><span className="hidden md:inline">{metadata.tags.join(', ')}</span></div>
          </motion.div>
        </div>
      </motion.div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">

          {/* Summary box */}
          <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-3 mt-0">Trends Covered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--text-secondary)] dark:text-gray-300">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-600 flex-shrink-0" />Earthy &amp; Organic Neutrals</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-700 flex-shrink-0" />Digital Moss &amp; Botanical Greens</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-violet-500 flex-shrink-0" />AI-Inspired Gradients</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400 flex-shrink-0" />Neo-Brutalism Colors</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-pink-300 flex-shrink-0" />Soft Pastels &amp; Candy Tones</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0" />Dark Mode Chromatic Accents</div>
            </div>
          </div>

          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              1. Why Color Trends Matter for Digital Products
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Color trends in UI design aren't just aesthetic fashion. They reflect deeper shifts in culture, technology, and user psychology. When a color direction becomes widespread across leading digital products — from app icons to marketing sites to SaaS dashboards — users begin to associate those colors with specific emotions, trust signals, and product quality signals.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              In 2025, several converging forces are shaping which colors feel "right" for digital products. The post-pandemic recalibration toward nature and authenticity is still producing earthy, organic palettes. The explosion of generative AI products has created a visual language of electric gradients and iridescence. And a youth-culture backlash against clinical minimalism has fueled bold neo-brutalist and candy-tone aesthetics simultaneously.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The critical takeaway: understanding trends lets you make <em>deliberate</em> choices. You can lean into a trend to signal that your product is current, or consciously diverge from it to position yourself as timeless or contrarian. You can't make that choice intelligently without knowing what the trends actually are.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-3">2025's Macro Color Forces</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--text-secondary)] dark:text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌿</span>
                  <div><strong>Nature as antidote</strong> — Digital fatigue is pushing users toward natural, grounding colors in interfaces they spend the most time in.</div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🤖</span>
                  <div><strong>AI aesthetic language</strong> — Generative AI tools have popularized a specific visual identity: electric purples, iridescent gradients, deep navy.</div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎨</span>
                  <div><strong>Anti-minimalism</strong> — Reaction against years of beige-and-white minimalism. Bold, high-contrast, even ugly-intentional color choices are gaining ground.</div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div><strong>Gen-Z palette expression</strong> — Younger users and creators bring candy tones, retro pastels, and playful irreverence into mainstream product design.</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              Trend 1: Earthy &amp; Organic Neutrals
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The shift toward earthy, organic neutrals has been building since 2021 and shows no sign of fading. Warm beiges, sun-dried clay, dusty terracottas, and sandy ochres dominate the landing pages of wellness brands, sustainable companies, premium e-commerce, and food startups in 2025. These colors communicate authenticity, warmth, and groundedness — the antithesis of cold corporate minimalism.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              What's evolved in 2025 is the sophistication of the application. Early versions of this trend produced somewhat muddy, unrefined interfaces. The current generation uses earthy colors with precision — as carefully balanced systems rather than simply swapping white backgrounds for beige. Expect to see warm neutrals paired with dark, rich typography (espresso browns instead of gray-blacks) and a single terracotta or rust accent used sparingly for CTAs.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Earthy Neutrals Palette 2025</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                {[
                  { hex: '#F5EFE6', name: 'Linen' },
                  { hex: '#DDD0BB', name: 'Sand' },
                  { hex: '#C4906A', name: 'Clay' },
                  { hex: '#A05B38', name: 'Terracotta' },
                  { hex: '#3D1F0D', name: 'Espresso' },
                ].map((item) => (
                  <div key={item.hex} className="text-center">
                    <div style={{ backgroundColor: item.hex }} className="w-full h-14 rounded-xl mb-2" />
                    <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-gray-300">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)] dark:text-gray-400 font-mono">{item.hex}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400">
                <strong>Best for:</strong> Wellness, food &amp; beverage, sustainable fashion, artisan/craft brands, hospitality. Pairs well with cream-toned photography and serif typography.
              </p>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              Trend 2: Digital Moss &amp; Botanical Greens
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Green has been making a slow, steady return to digital design for several years, but 2025 marks its most confident mainstream moment. Specifically, muted, desaturated greens — moss, sage, olive, forest — rather than the vivid, artificial greens of early-2010s infographics. These are greens that feel grown, not printed.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Botanical greens communicate health, growth, sustainability, and calm — a perfect fit for the mental wellness, fintech (prosperity, growth), health tech, and green-economy sectors that are all expanding rapidly. They also pair extraordinarily well with both warm neutrals (earthy palette above) and deep charcoals, giving them remarkable versatility as a system color.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Digital Moss &amp; Botanical Palette 2025</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                {[
                  { hex: '#F4F7F0', name: 'Mist' },
                  { hex: '#C4D4BE', name: 'Sage' },
                  { hex: '#7A9E7E', name: 'Moss' },
                  { hex: '#3D6B47', name: 'Forest' },
                  { hex: '#1E3528', name: 'Pine' },
                ].map((item) => (
                  <div key={item.hex} className="text-center">
                    <div style={{ backgroundColor: item.hex }} className="w-full h-14 rounded-xl mb-2" />
                    <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-gray-300">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)] dark:text-gray-400 font-mono">{item.hex}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400">
                <strong>Best for:</strong> Health tech, mental wellness apps, sustainable brands, fintech, agriculture, outdoor lifestyle. Use the muted sage as a background tint; forest green for primary actions.
              </p>
            </div>
          </motion.section>

          {/* Section 4 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              Trend 3: AI-Inspired Gradients
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The visual identity of AI products has crystallized around a specific aesthetic in 2025: deep indigo-to-violet-to-fuchsia gradients, often with a slightly iridescent, almost pearlescent quality. Think OpenAI, Anthropic, Midjourney, Cursor — there's a shared visual language of electric intelligence that moves through purple-adjacent color space.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              These gradients work because they're distinct from both the cold blues of legacy enterprise software and the warm oranges of consumer apps. They occupy a unique position: futuristic but not sterile, premium but not cold. The multi-stop gradients (indigo → violet → fuchsia → magenta) create a sense of spectral energy that users have come to associate with intelligence and capability.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">AI Gradient Palette &amp; CSS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
                {[
                  { hex: '#3730A3', name: 'Deep Indigo' },
                  { hex: '#6D28D9', name: 'Violet' },
                  { hex: '#9333EA', name: 'Purple' },
                  { hex: '#C026D3', name: 'Fuchsia' },
                  { hex: '#E11D9A', name: 'Magenta' },
                ].map((item) => (
                  <div key={item.hex} className="text-center">
                    <div style={{ backgroundColor: item.hex }} className="w-full h-14 rounded-xl mb-2" />
                    <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-gray-300">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)] dark:text-gray-400 font-mono">{item.hex}</p>
                  </div>
                ))}
              </div>
              <div
                className="w-full h-20 rounded-xl mb-5"
                style={{ background: 'linear-gradient(135deg, #3730A3, #6D28D9, #9333EA, #C026D3, #E11D9A)' }}
              />
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* AI-Inspired Gradient — CSS */
.hero-gradient {
  background: linear-gradient(
    135deg,
    #3730A3 0%,
    #6D28D9 25%,
    #9333EA 50%,
    #C026D3 75%,
    #E11D9A 100%
  );
}

/* Subtle background tint version */
.section-gradient-bg {
  background: linear-gradient(
    135deg,
    rgba(55,48,163,0.08) 0%,
    rgba(147,51,234,0.08) 100%
  );
}

/* Text gradient (webkit) */
.gradient-text {
  background: linear-gradient(90deg, #6D28D9, #E11D9A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`}
              </pre>
              <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400 mt-3">
                <strong>Best for:</strong> AI products, developer tools, ML platforms, productivity apps, tech startups. Use the full gradient as a hero element; the individual colors as a dark mode accent system.
              </p>
            </div>
          </motion.section>

          {/* Section 5 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              Trend 4: Neo-Brutalism Colors
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Neo-brutalism in UI design borrows its aesthetic from architectural brutalism: raw, unadorned, unapologetically bold. Its color language is equally uncompromising. Hard black (#000000 or very near it) as both text and border. Electric yellow, vivid coral, or raw cyan as a single dominant accent. Stark white as a background. The combination is visually arresting — even intentionally ugly in a way that demands attention.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Neo-brutalism exploded in niche design circles in 2022–2023 and has been moving steadily into mainstream product design in 2025, particularly in the creator economy, fintech startups, and anything targeting a young, design-literate audience that finds polished minimalism boring. Products like Figma plugins, indie SaaS tools, and music platforms have adopted neo-brutalist palettes to signal rawness and authenticity.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Neo-Brutalism Palette 2025</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                {[
                  { hex: '#FFFFFF', name: 'Raw White', border: true },
                  { hex: '#F5F500', name: 'Electric Yellow' },
                  { hex: '#FF4D4D', name: 'Hot Coral' },
                  { hex: '#00E5FF', name: 'Raw Cyan' },
                  { hex: '#0A0A0A', name: 'Hard Black' },
                ].map((item) => (
                  <div key={item.hex} className="text-center">
                    <div
                      style={{ backgroundColor: item.hex }}
                      className={`w-full h-14 rounded-xl mb-2 ${(item as { border?: boolean }).border ? 'border-2 border-gray-200 dark:border-gray-600' : ''}`}
                    />
                    <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-gray-300">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)] dark:text-gray-400 font-mono">{item.hex}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400">
                <strong>Usage rule:</strong> In neo-brutalism, borders are thick (2–4px solid black), shadows are offset and hard (no blur: <code>4px 4px 0 #000</code>), and the accent color is used in large blocks — not just accents. This is not a system for the timid.
              </p>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Neo-Brutalism Card Component */
.brutalist-card {
  background: #FFFFFF;
  border: 3px solid #0A0A0A;
  box-shadow: 6px 6px 0px #0A0A0A;
  border-radius: 4px;
  transition: transform 0.1s, box-shadow 0.1s;
}

.brutalist-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px #0A0A0A;
}

.brutalist-button {
  background: #F5F500;
  color: #0A0A0A;
  border: 3px solid #0A0A0A;
  box-shadow: 4px 4px 0px #0A0A0A;
  font-weight: 800;
  padding: 12px 24px;
}`}
            </pre>
          </motion.section>

          {/* Section 6 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              Trend 5: Soft Pastels &amp; Candy Tones
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Diametrically opposite to neo-brutalism in spirit but equally prominent in 2025 is the pastel and candy tone movement — driven heavily by Gen-Z design sensibility and the visual language of platforms like TikTok, BeReal, and emerging social apps. These palettes are light, airy, and emotionally warm: bubblegum pink, soft lavender, mint green, baby blue, peach.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The 2025 version of this trend is more sophisticated than the pastel minimalism of 2018–2019. Rather than a monochrome pastel wash, current implementations combine multiple candy tones in energetic ways — a lavender background with a coral button and mint card — creating a sense of playfulness and vibrancy that still reads as contemporary rather than childish.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Soft Pastels &amp; Candy Palette 2025</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                {[
                  { hex: '#FFB3D9', name: 'Gen-Z Pink' },
                  { hex: '#C9B8F5', name: 'Lavender' },
                  { hex: '#B3E8D4', name: 'Mint' },
                  { hex: '#FFDBB5', name: 'Peach' },
                  { hex: '#B3D8FF', name: 'Baby Blue' },
                  { hex: '#FAFFC2', name: 'Butter' },
                ].map((item) => (
                  <div key={item.hex} className="text-center">
                    <div style={{ backgroundColor: item.hex }} className="w-full h-14 rounded-xl mb-2" />
                    <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-gray-300">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)] dark:text-gray-400 font-mono">{item.hex}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400">
                <strong>Best for:</strong> Social apps, consumer apps targeting Gen-Z, beauty &amp; fashion, mental health apps, edutainment, creative tools. Use with soft rounded corners (border-radius: 16–24px) and playful typography.
              </p>
            </div>
          </motion.section>

          {/* Section 7 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              Trend 6: Dark Mode Chromatic Accents
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Dark mode isn't new, but the way designers are using color within dark mode has matured significantly in 2025. The defining characteristic of this trend is the use of a single vivid chromatic accent — electric cyan, neon green, warm amber, or hot pink — popped against a deep navy or charcoal background. The rest of the palette is deliberately muted and desaturated, making the single accent color feel electrifying by contrast.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              This approach is distinct from earlier dark mode design that simply used a brand color on a dark background. The 2025 version deliberately maximizes the contrast between the base darkness and the accent's luminance — creating the visual sensation of a light source within the interface. Developer tools (terminal apps, code editors, monitoring dashboards) pioneered this aesthetic, and it has moved into consumer-facing products as dark mode adoption has hit majority status among tech-adjacent users.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Dark Mode Chromatic Palette Examples</h3>

              <p className="text-sm font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-3">Option A: Charcoal + Electric Cyan</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-6">
                {[
                  { hex: '#0D1117', name: 'Github Black' },
                  { hex: '#161B22', name: 'Surface' },
                  { hex: '#21262D', name: 'Overlay' },
                  { hex: '#E6EDF3', name: 'Primary Text' },
                  { hex: '#00D9F5', name: 'Cyan Accent' },
                ].map((item) => (
                  <div key={item.hex} className="text-center">
                    <div style={{ backgroundColor: item.hex }} className="w-full h-10 rounded-lg mb-1 border border-white/5" />
                    <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-gray-300 leading-tight">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)] dark:text-gray-400 font-mono">{item.hex}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-3">Option B: Deep Navy + Warm Amber</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-6">
                {[
                  { hex: '#0A0F1E', name: 'Deep Navy' },
                  { hex: '#111827', name: 'Surface' },
                  { hex: '#1F2937', name: 'Overlay' },
                  { hex: '#F3F4F6', name: 'Primary Text' },
                  { hex: '#F59E0B', name: 'Amber Accent' },
                ].map((item) => (
                  <div key={item.hex} className="text-center">
                    <div style={{ backgroundColor: item.hex }} className="w-full h-10 rounded-lg mb-1 border border-white/5" />
                    <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-gray-300 leading-tight">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)] dark:text-gray-400 font-mono">{item.hex}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-3">Option C: Charcoal + Neon Green</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {[
                  { hex: '#0C0F0A', name: 'Near Black' },
                  { hex: '#141A11', name: 'Surface' },
                  { hex: '#1E2B1A', name: 'Overlay' },
                  { hex: '#E8F0E5', name: 'Primary Text' },
                  { hex: '#39FF14', name: 'Neon Green' },
                ].map((item) => (
                  <div key={item.hex} className="text-center">
                    <div style={{ backgroundColor: item.hex }} className="w-full h-10 rounded-lg mb-1 border border-white/5" />
                    <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-gray-300 leading-tight">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)] dark:text-gray-400 font-mono">{item.hex}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 8 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              8. How to Apply Trends Without Chasing Them
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The worst outcome of following design trends is building a product that looks dated in 18 months. The best outcome is using a trend's momentum to make your product feel current and culturally fluent while maintaining a timeless core. Here's the framework for doing that:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] dark:text-white mb-2">Separate structure from surface</h3>
                  <p className="text-sm text-[var(--text-secondary)] dark:text-gray-300">Your typographic scale, spacing system, and component architecture should be timeless. Color is the surface — it can be refreshed without a full redesign. Build your design system so swapping a palette is a token change, not a component change.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] dark:text-white mb-2">Extract the principle, not the hex</h3>
                  <p className="text-sm text-[var(--text-secondary)] dark:text-gray-300">The principle of "earthy neutrals" — warm, grounding, authentic — will outlast the specific hex values popular today. Use that principle to guide your color direction, and your palette will remain relevant even as the specific trend values shift.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] dark:text-white mb-2">Use trends in accent positions</h3>
                  <p className="text-sm text-[var(--text-secondary)] dark:text-gray-300">Apply trendy colors to your accent, highlight, and marketing layers rather than your core functional palette. This lets you refresh the "contemporary" feel without disrupting the product's foundational color logic.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] dark:text-white mb-2">Ask: is this trend relevant to my audience?</h3>
                  <p className="text-sm text-[var(--text-secondary)] dark:text-gray-300">AI gradients are perfect for an ML platform. Candy tones are perfect for a Gen-Z social app. But applying AI gradient aesthetics to an enterprise HR tool, or candy tones to a legal SaaS, creates dissonance. A relevant trend amplifies your brand; an irrelevant trend undermines it.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 9: Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              9. Key Takeaways
            </h2>
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <ul className="space-y-3 text-[var(--text-secondary)] dark:text-gray-300 mb-0">
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">01</span><span><strong>Earthy neutrals</strong> continue to dominate wellness, food, and sustainability verticals — warm beige and terracotta over cold gray.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">02</span><span><strong>Digital moss</strong> has moved from niche to mainstream — muted greens signal growth, health, and sustainability at scale.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">03</span><span><strong>AI gradients</strong> (indigo → violet → fuchsia) have created a new visual language for intelligence and capability in tech products.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">04</span><span><strong>Neo-brutalism</strong> is the anti-trend trend — raw black, electric yellow, thick borders, and intentional visual aggression signal authenticity.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">05</span><span><strong>Candy pastels</strong> have matured from monochrome minimalism into energetic multi-tone systems for Gen-Z-oriented products.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">06</span><span><strong>Dark mode chromatic accents</strong> — single vivid pops against deep neutrals — define the premium developer and tech aesthetic.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">07</span><span><strong>Don't chase hex values.</strong> Extract the principle from each trend and apply it in positions (accents, marketing layers) that can be refreshed as trends evolve.</span></li>
              </ul>
            </div>
          </motion.section>

          {/* Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <h3 className="flex items-center text-lg font-semibold mb-4"><FaShare className="mr-2" />Share this article</h3>
            <div className="flex space-x-4">
              <button onClick={shareOnTwitter} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"><FaTwitter className="w-5 h-5" /></button>
              <button onClick={shareOnFacebook} className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"><FaFacebook className="w-5 h-5" /></button>
              <button onClick={shareOnLinkedIn} className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"><FaLinkedin className="w-5 h-5" /></button>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl p-8 border border-indigo-200/40 dark:border-indigo-500/20"
            style={{ background: 'rgba(99,102,241,0.06)' }}
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-white mb-2">Build 2025-Ready Palettes with ColorPeek</h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-400 mb-6">
              Explore curated 2025 trend palettes, generate AI-inspired gradients, and export your color system in any format — all in one tool.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/palettes" className="inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
                Browse 2025 Palettes
              </a>
              <a href="/gradients" className="inline-flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[var(--text-primary)] dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
                Gradient Generator
              </a>
              <a href="/palette-exporter" className="inline-flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[var(--text-primary)] dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
                Export Your Palette
              </a>
            </div>
          </motion.div>
        </div>
      </article>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UIColorTrends2025;
