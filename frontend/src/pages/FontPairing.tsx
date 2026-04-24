import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

interface Pairing {
  name: string;
  heading: string;
  body: string;
  headingWeight: number;
  bodyWeight: number;
  tag: string;
  importUrl: string;
}

const PAIRINGS: Pairing[] = [
  {
    name: 'Classic Editorial',
    heading: 'Playfair Display',
    body: 'Source Sans 3',
    headingWeight: 700,
    bodyWeight: 400,
    tag: 'Editorial',
    importUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@400;600&display=swap',
  },
  {
    name: 'Modern Tech',
    heading: 'Inter',
    body: 'Inter',
    headingWeight: 800,
    bodyWeight: 400,
    tag: 'Tech',
    importUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap',
  },
  {
    name: 'Warm Humanist',
    heading: 'Lora',
    body: 'Open Sans',
    headingWeight: 700,
    bodyWeight: 400,
    tag: 'Humanist',
    importUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Open+Sans:wght@400;600&display=swap',
  },
  {
    name: 'Geometric Clean',
    heading: 'Poppins',
    body: 'Poppins',
    headingWeight: 700,
    bodyWeight: 300,
    tag: 'Geometric',
    importUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap',
  },
  {
    name: 'Elegant Serif',
    heading: 'Cormorant Garamond',
    body: 'Raleway',
    headingWeight: 600,
    bodyWeight: 400,
    tag: 'Elegant',
    importUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Raleway:wght@400;500&display=swap',
  },
  {
    name: 'Bold Contrast',
    heading: 'Oswald',
    body: 'Merriweather',
    headingWeight: 600,
    bodyWeight: 300,
    tag: 'Contrast',
    importUrl: 'https://fonts.googleapis.com/css2?family=Oswald:wght@600&family=Merriweather:wght@300;400&display=swap',
  },
  {
    name: 'Friendly Round',
    heading: 'Nunito',
    body: 'Nunito',
    headingWeight: 800,
    bodyWeight: 400,
    tag: 'Friendly',
    importUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;800&display=swap',
  },
  {
    name: 'Minimal Mono',
    heading: 'Space Grotesk',
    body: 'Space Mono',
    headingWeight: 700,
    bodyWeight: 400,
    tag: 'Minimal',
    importUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Space+Mono:wght@400&display=swap',
  },
  {
    name: 'Luxury Brand',
    heading: 'Libre Baskerville',
    body: 'Libre Franklin',
    headingWeight: 700,
    bodyWeight: 400,
    tag: 'Luxury',
    importUrl: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Libre+Franklin:wght@400;500&display=swap',
  },
  {
    name: 'Creative Studio',
    heading: 'DM Serif Display',
    body: 'DM Sans',
    headingWeight: 400,
    bodyWeight: 400,
    tag: 'Creative',
    importUrl: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap',
  },
];

const TAGS = ['All', 'Editorial', 'Tech', 'Humanist', 'Geometric', 'Elegant', 'Contrast', 'Friendly', 'Minimal', 'Luxury', 'Creative'];

const PREVIEW_TEXTS = {
  heading: ['The Art of Color', 'Design with Purpose', 'Build Beautiful Things', 'Less is More'],
  body: [
    'Great typography sets the tone for your entire design. The right pairing creates visual hierarchy and guides the reader naturally through your content.',
    'Color and type work together to communicate mood, brand personality, and hierarchy. Choose pairings that complement your palette.',
    'Every font has a personality. When two typefaces share complementary qualities — contrast, rhythm, and proportion — the result feels inevitable.',
  ],
};

const FontPairing = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [headingText, setHeadingText] = useState(PREVIEW_TEXTS.heading[0]);
  const [bodyText, setBodyText] = useState(PREVIEW_TEXTS.body[0]);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#1a1a2e');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = activeTag === 'All' ? PAIRINGS : PAIRINGS.filter(p => p.tag === activeTag);
  const active = filtered[selectedIdx] ?? filtered[0];

  const htmlOutput = active
    ? `<!-- Google Fonts import -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${active.importUrl}" rel="stylesheet">

<!-- CSS usage -->
<style>
  h1, h2, h3 {
    font-family: '${active.heading}', serif;
    font-weight: ${active.headingWeight};
  }
  body, p {
    font-family: '${active.body}', sans-serif;
    font-weight: ${active.bodyWeight};
  }
</style>`
    : '';

  const cssOutput = active
    ? `/* Tailwind CSS config */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['${active.heading}', 'serif'],
        body: ['${active.body}', 'sans-serif'],
      },
    },
  },
};`
    : '';

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const safeIdx = (idx: number) => Math.min(idx, filtered.length - 1);

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Font Pairing Tool — Find Google Fonts That Work Together"
        description="Discover curated Google Font pairings with live preview. Browse 20+ heading and body font combinations, customize text and colors, copy the Google Fonts import or Tailwind config. Free at ColorPeek."
        path="/font-pairing"
        keywords="font pairing tool, google font combinations, typography pairing, heading body font pairings, best font pairings 2025, google fonts for web"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebApplication', name: 'Font Pairing Tool | ColorPeek', description: 'Discover curated Google Font pairings with live preview and copy-ready code.', url: 'https://color-peek.com/font-pairing', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
            { '@type': 'FAQPage', mainEntity: [
              { '@type': 'Question', name: 'What makes a good font pairing?', acceptedAnswer: { '@type': 'Answer', text: 'A good font pairing creates contrast and hierarchy without clash. A common rule is to pair a serif heading font with a sans-serif body font (or vice versa), ensuring the two fonts have different personalities but share similar x-height or proportions for visual harmony.' } },
              { '@type': 'Question', name: 'Are Google Fonts free to use commercially?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All Google Fonts are licensed under open-source licenses (SIL Open Font License or Apache License 2.0), making them free for personal and commercial use including web, print, and products.' } },
            ]},
          ],
        }}
      />
      <Navbar onColorSelect={() => {}} />

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Typography Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Font <span className="gradient-text">Pairing</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">Discover beautiful Google Font pairings with live preview. Copy the HTML or Tailwind config instantly.</p>
        </motion.div>

        {/* Tag filter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="flex flex-wrap gap-2 mb-6 justify-center">
          {TAGS.map(tag => (
            <button key={tag} onClick={() => { setActiveTag(tag); setSelectedIdx(0); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${activeTag === tag ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
              {tag}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pairing list */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="space-y-2">
            {filtered.map((p, i) => (
              <button key={p.name} onClick={() => setSelectedIdx(i)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200
                  ${safeIdx(selectedIdx) === i
                    ? 'glass-card border-indigo-300/50 dark:border-indigo-500/40'
                    : 'glass-card border-white/30 dark:border-white/8 hover:border-indigo-200/40'
                  }`}>
                <p className={`text-sm font-semibold transition-colors ${safeIdx(selectedIdx) === i ? 'text-indigo-500 dark:text-indigo-400' : 'text-[var(--text-primary)]'}`}>
                  {p.name}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{p.heading} + {p.body}</p>
                <span className="mt-1.5 inline-block px-2 py-0.5 text-[10px] font-medium rounded-full
                  bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400
                  border border-indigo-200/50 dark:border-indigo-700/30">
                  {p.tag}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Live preview */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-4">

            {/* Controls row */}
            <div className="glass-card p-4 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">Background</span>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent p-0.5"/>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">Text</span>
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent p-0.5"/>
              </div>
              <select value={headingText} onChange={e => setHeadingText(e.target.value)}
                className="glass-input text-xs flex-1 min-w-[160px]">
                {PREVIEW_TEXTS.heading.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Preview card */}
            {active && (
              <>
                {/* Load the font */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="stylesheet" href={active.importUrl}/>
                <div className="glass-card p-8 rounded-2xl min-h-[240px] flex flex-col justify-center"
                  style={{ backgroundColor: bgColor, color: textColor }}>
                  <p className="text-xs font-mono mb-4 opacity-50" style={{ color: textColor }}>
                    {active.heading} {active.headingWeight} / {active.body} {active.bodyWeight}
                  </p>
                  <h2 className="mb-4 leading-tight" style={{
                    fontFamily: `'${active.heading}', serif`,
                    fontWeight: active.headingWeight,
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    color: textColor,
                  }}>
                    {headingText}
                  </h2>
                  <p className="leading-relaxed text-sm sm:text-base max-w-prose opacity-80" style={{
                    fontFamily: `'${active.body}', sans-serif`,
                    fontWeight: active.bodyWeight,
                    color: textColor,
                  }}>
                    {bodyText}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {PREVIEW_TEXTS.body.map((t, i) => (
                      <button key={i} onClick={() => setBodyText(t)}
                        className={`w-2 h-2 rounded-full transition-all ${bodyText === t ? 'bg-indigo-500' : 'bg-current opacity-20'}`}/>
                    ))}
                  </div>
                </div>

                {/* Export tabs */}
                <div className="glass-card p-5 space-y-3">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">Export</p>
                  <div className="space-y-3">
                    {[
                      { id: 'html', label: 'HTML + CSS', code: htmlOutput },
                      { id: 'tw',   label: 'Tailwind Config', code: cssOutput },
                      { id: 'url',  label: 'Google Fonts URL', code: active.importUrl },
                    ].map(({ id, label, code }) => (
                      <div key={id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[var(--text-muted)]">{label}</span>
                          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            onClick={() => copy(code, id)}
                            className="glass-button px-3 py-1 text-xs font-semibold">
                            {copied === id ? '✓ Copied' : 'Copy'}
                          </motion.button>
                        </div>
                        <pre className="glass-card p-3 rounded-xl text-[11px] font-mono text-[var(--text-secondary)] overflow-x-auto whitespace-pre-wrap max-h-32 overflow-y-auto">{code}</pre>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the Font Pairing Tool</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Filter pairings by tag — Elegant, Modern, Minimal, Editorial, Friendly, or Technical.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>Click any pairing card to load a live preview with heading and body text samples.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>Edit the preview text and adjust heading/body colors to match your brand.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Copy the Google Fonts HTML <code className="text-indigo-400">&lt;link&gt;</code> tag to add the fonts to your project.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Copy the Tailwind config snippet to add the fonts as custom font families.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is Font Pairing?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">Font pairing is the art of selecting two or more typefaces that complement each other to create visual hierarchy and harmony in a design. The most reliable approach is contrast: pair a high-personality display or serif font for headings with a clean, neutral sans-serif for body text. The pairing works when the fonts are distinct enough to create hierarchy, yet share enough visual DNA (similar x-height, stroke width, or mood) to feel cohesive. Classic combinations like Playfair Display + Source Sans, or Merriweather + Open Sans, have been refined over years of UI design practice. Beyond serif/sans contrast, you can also pair fonts based on weight contrast (a thin display with a medium body) or style contrast (a geometric sans with a humanist sans). Google Fonts provides over 1,000 free typefaces, making it the most widely used font source for web projects.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How many fonts should I use in one design?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Most designs work best with 2 fonts: one for headings and one for body. Adding a third font for a special purpose (like monospace for code) is acceptable, but more than 3 typefaces rarely improves a design and usually creates visual noise.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Do Google Fonts slow down my website?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Loading Google Fonts adds an external request, which can add ~100–300ms latency. To minimize impact: load only the weights you use, add <code className="text-indigo-400">display=swap</code> to the URL, and consider self-hosting the font files for critical performance scenarios.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What is the difference between serif and sans-serif?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Serif fonts have small decorative strokes ("serifs") at the ends of letter forms (e.g., Times New Roman, Playfair Display). Sans-serif fonts have clean, stroke-free endings (e.g., Arial, Inter). Serifs feel traditional and authoritative; sans-serifs feel modern and clean. Screen legibility is generally equivalent for both at display sizes.</p>
              </details>
            </div>
          </div>

          <RelatedTools tools={['/type-scale','/palettes','/gradient-generator']} />
        </div>
      </main>
    </div>
  );
};

export default FontPairing;
