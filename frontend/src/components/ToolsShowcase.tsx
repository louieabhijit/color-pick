import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  IconPalettes,
  IconGradients,
  IconGradientGenerator,
  IconTintShade,
  IconColorBlindness,
} from './ToolIcons';

interface ShowcaseTool {
  name: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  accentBg: string;
}

const TOOLS: ShowcaseTool[] = [
  {
    name: 'Color Palettes',
    href: '/palettes',
    description: 'Curated palettes ready to copy in any format',
    icon: <IconPalettes className="w-5 h-5" />,
    gradient: 'from-indigo-500 to-violet-500',
    accentBg: 'bg-indigo-50 dark:bg-indigo-950/40',
  },
  {
    name: 'Gradients',
    href: '/gradients',
    description: 'Browse and copy CSS gradient presets',
    icon: <IconGradients className="w-5 h-5" />,
    gradient: 'from-violet-500 to-fuchsia-500',
    accentBg: 'bg-violet-50 dark:bg-violet-950/40',
  },
  {
    name: 'Gradient Generator',
    href: '/gradient-generator',
    description: 'Build linear, radial & conic CSS gradients',
    icon: <IconGradientGenerator className="w-5 h-5" />,
    gradient: 'from-fuchsia-500 to-rose-500',
    accentBg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40',
  },
  {
    name: 'Tint & Shade',
    href: '/tint-shade',
    description: 'Generate a complete 50–900 color scale',
    icon: <IconTintShade className="w-5 h-5" />,
    gradient: 'from-rose-500 to-orange-500',
    accentBg: 'bg-rose-50 dark:bg-rose-950/40',
  },
  {
    name: 'Color Blindness',
    href: '/color-blindness',
    description: 'Simulate 7 vision types for accessibility',
    icon: <IconColorBlindness className="w-5 h-5" />,
    gradient: 'from-orange-500 to-amber-400',
    accentBg: 'bg-orange-50 dark:bg-orange-950/40',
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const ToolsShowcase = () => (
  <section className="py-16">
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6">

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
      >
        <div>
          <span className="section-label mb-2 inline-block">Free Tools</span>
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mt-1">
            Designer & Developer <span className="gradient-text">Toolbox</span>
          </h2>
        </div>
        <Link
          to="/tools"
          className="flex items-center gap-2 text-sm font-semibold text-indigo-500 dark:text-indigo-400
                     hover:gap-3 transition-all duration-200 self-start sm:self-auto pb-1"
        >
          View all tools
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </Link>
      </motion.div>

      {/* Tool cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {TOOLS.map((tool) => (
          <motion.div key={tool.href} variants={item}>
            <Link
              to={tool.href}
              className="group glass-card card-shine border border-white/40 dark:border-white/10
                         hover:border-indigo-300/50 dark:hover:border-indigo-500/30
                         flex flex-col gap-4 p-5 rounded-2xl h-full
                         transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/8"
            >
              {/* Icon badge */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white
                               bg-gradient-to-br ${tool.gradient} shadow-md
                               group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                {tool.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1
                               group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {tool.name}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1 text-xs font-medium text-indigo-400 dark:text-indigo-500
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Open</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ToolsShowcase;
