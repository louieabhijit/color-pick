import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ToolsSidebar from './ToolsSidebar';

const ToolLayout = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile drawer on navigation
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className="relative">
      {/* ── Desktop fixed sidebar (xl+) ─────────────────────────────────── */}
      <aside
        className="hidden xl:flex flex-col fixed top-16 left-0 bottom-0 w-56 z-20 overflow-y-auto py-5 px-3"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--blur)) saturate(1.4)',
          WebkitBackdropFilter: 'blur(var(--blur)) saturate(1.4)',
          borderRight: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <ToolsSidebar />
      </aside>

      {/* ── Mobile sidebar toggle button (below xl) ──────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="xl:hidden fixed bottom-5 right-5 z-30 glass-card p-3 rounded-2xl border border-white/30 shadow-lg flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]"
        aria-label="Open tools menu"
      >
        <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        All Tools
      </button>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            {/* drawer panel */}
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="xl:hidden fixed top-0 left-0 bottom-0 w-72 z-40 overflow-y-auto py-5 px-3 pt-16"
              style={{
                background: 'var(--glass-bg-strong)',
                backdropFilter: 'blur(24px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                borderRight: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-sm font-bold text-[var(--text-primary)]">All Tools</span>
                <button onClick={() => setOpen(false)} aria-label="Close tools menu" className="p-1.5 rounded-lg glass-button">
                  <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <ToolsSidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Page content pushed right on desktop ─────────────────────────── */}
      <div className="xl:ml-56">
        <Outlet />
      </div>
    </div>
  );
};

export default ToolLayout;
