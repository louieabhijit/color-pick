import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import Footer from '../components/Footer';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const TOOL_CATEGORIES = [
  {
    label: 'Color Tools',
    gradient: 'from-indigo-500 to-violet-500',
    glow: 'rgba(99,102,241,0.25)',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    body: 'Generate palettes, create tint/shade scales, convert between HEX/RGB/HSL/OKLCH/CMYK, extract palettes from images or URLs, simulate color blindness (7 types), blend colors, generate harmonies, find color names, and export as CSS variables, SCSS, Tailwind, JSON, or SVG.',
    link: '/palettes',
  },
  {
    label: 'CSS Generators',
    gradient: 'from-violet-500 to-fuchsia-500',
    glow: 'rgba(139,92,246,0.25)',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    body: 'Build CSS gradients (linear, radial, conic) visually. Generate multi-layer box shadows, glassmorphism panels, border-radius shapes, text shadows, CSS filters, flexbox layouts, and CSS grid layouts — all with live preview and copy-ready code.',
    link: '/gradient-generator',
  },
  {
    label: 'Typography',
    gradient: 'from-rose-500 to-orange-400',
    glow: 'rgba(244,63,94,0.22)',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 6h18M3 10h18M3 14h18M3 18h12" />
      </svg>
    ),
    body: 'Calculate modular type scales with 8 musical ratios (Minor Third through Golden Ratio), preview Google Font pairings with live text samples, and generate design system spacing scales — export to CSS, SCSS, Tailwind, or JSON.',
    link: '/type-scale',
  },
  {
    label: 'Accessibility',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16,185,129,0.22)',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    body: 'Check WCAG 2.1 color contrast ratios with AA and AAA pass/fail badges, live text preview, and automatic suggestion of a passing alternative color.',
    link: '/contrast-checker',
  },
];

const TECH_STACK = [
  { name: 'React 18', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Vite', color: '#646CFF' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'Framer Motion', color: '#FF0066' },
  { name: 'Netlify', color: '#00C7B7' },
  { name: 'react-snap', color: '#6366F1' },
];

const PILLARS = [
  {
    icon: (
      <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: 'Instant Load',
    sub: 'No splash screens, no loading states',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    label: 'No Accounts',
    sub: 'Zero sign-ups, zero paywalls',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Client-Side',
    sub: 'All math runs in your browser',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Free Forever',
    sub: 'Personal and commercial use',
  },
];

const About = () => (
  <div className="min-h-screen w-full relative overflow-x-hidden">
    <PageSEO
      title="About ColorPeek - Free Design Tools for Designers & Developers"
      description="ColorPeek is a free collection of color, CSS, and typography tools built for web designers and developers by Abhijit Chapke. No sign-up, no paywalls, everything runs in your browser."
      path="/about"
      keywords="about colorpeek, free design tools, color tools for developers, css generators, who made colorpeek"
    />

    {/* Floating ambient orbs */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="bg-orb w-[500px] h-[500px] top-[-120px] right-[-100px] opacity-50 animate-float"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 70%)' }} />
      <div className="bg-orb w-[400px] h-[400px] bottom-[20%] left-[-150px] opacity-40 animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)' }} />
      <div className="bg-orb w-[300px] h-[300px] top-[50%] right-[15%] opacity-30 animate-float-delayed"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)' }} />
    </div>

    <Navbar onColorSelect={() => {}} />

    <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-4 inline-block"
          >
            About
          </motion.span>
          <h1 className="text-5xl sm:text-6xl font-bold mt-2 mb-5 text-[var(--text-primary)] leading-tight">
            About{' '}
            <span className="gradient-text">ColorPeek</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto">
            A free, open collection of color and CSS design tools built for web designers and developers.
          </p>
        </motion.div>

        {/* ── Pillars row ───────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.08)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
          {PILLARS.map(({ icon, label, sub }) => (
            <div
              key={label}
              className="glass-card p-4 rounded-2xl text-center group hover:scale-[1.03] transition-transform duration-300"
            >
              <div className="w-9 h-9 rounded-xl glass-card flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-tight">{sub}</p>
            </div>
          ))}
        </motion.div>

        {/* ── What is ColorPeek ────────────────────────────────────── */}
        <motion.section {...fadeUp(0)} className="mb-6">
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* gradient top strip */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is ColorPeek?</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                ColorPeek is a free browser-based toolkit for designers and developers who work with color and CSS.
                It brings together 23+ tools in one place - from color palette generators and CSS shadow builders
                to contrast checkers, type scale calculators, and font pairing previews.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Every tool runs entirely in your browser. There are no accounts, no sign-ups, no paywalls, and no data
                collected from what you create. Your palettes, gradients, and CSS code stay on your machine.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The site is free to use for personal and commercial projects. No attribution required.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Why I Built This ────────────────────────────────────── */}
        <motion.section {...fadeUp(0.05)} className="mb-6">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">Why I Built This</h2>

              {/* Pull quote */}
              <blockquote className="border-l-2 border-indigo-400/60 pl-5 mb-5 italic text-[var(--text-muted)]">
                "I kept switching between a dozen different websites. Each site had one tool, required sign-up
                for exports, or was cluttered with ads. It was frustrating."
              </blockquote>

              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Hi - I'm <strong className="text-[var(--text-primary)]">Abhijit Chapke</strong>, a developer based in India.
                I started building the tools I actually needed - a gradient generator that copies clean CSS,
                a tint/shade generator that outputs Tailwind-compatible scales, a font pairing tool that
                loads Google Fonts live. One by one, ColorPeek grew into a full toolkit.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The philosophy is simple: design tools should load instantly, work without accounts, and
                never get in the way. If a tool doesn't solve a real problem faster than opening a code editor,
                it doesn't belong here.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── What You Can Do — category cards ────────────────────── */}
        <motion.section {...fadeUp(0.05)} className="mb-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">What You Can Do</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {TOOL_CATEGORIES.map(({ label, gradient, glow, icon, body, link }) => (
                <Link
                  key={label}
                  to={link}
                  className="group block rounded-2xl p-5 border border-white/10 hover:border-white/25 transition-all duration-300"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      style={{ boxShadow: `0 4px 16px ${glow}` }}
                    >
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] text-sm group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">{label}</h3>
                      <span className="text-[10px] text-[var(--text-muted)]">Explore tools →</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{body}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── How It's Built ──────────────────────────────────────── */}
        <motion.section {...fadeUp(0.05)} className="mb-6">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">How It's Built</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                ColorPeek is hosted on Netlify with static prerendering so every page loads with real HTML
                and metadata — no JavaScript required to see the content.
                All color math (OKLCH conversions, WCAG contrast formulas, tint/shade generation) is
                implemented directly in the browser with no external color API or server calls.
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {TECH_STACK.map(({ name, color }) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border border-white/15 text-[var(--text-secondary)] hover:scale-105 transition-transform duration-200 cursor-default"
                    style={{
                      background: `${color}14`,
                      borderColor: `${color}30`,
                      color: color,
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <motion.section {...fadeUp(0.05)}>
          <div
            className="rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.10) 50%, rgba(236,72,153,0.08) 100%)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* faint grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Get in Touch</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-md mx-auto">
                Bug reports, feature requests, and feedback are all welcome. If a tool is behaving
                unexpectedly, or if you have an idea for something genuinely useful, I'd like to hear about it.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 glass-button-primary px-6 py-3 text-sm font-semibold rounded-xl"
              >
                Send a message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.section>

      </div>
    </main>

    <Footer />
  </div>
);

export default About;
