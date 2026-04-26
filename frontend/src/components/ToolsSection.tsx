
const ToolsSection = () => (
  <section
    className="py-12"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <span className="section-label mb-3 inline-block">Ecosystem</span>
        <h2 className="text-2xl md:text-3xl font-bold mt-2 text-[var(--text-primary)]">
          Other Essential <span className="gradient-text">Developer Tools</span>
        </h2>
      </div>

      <div className="flex justify-center">
        <a
          href="https://jsonformattertool.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group glass-card card-shine glow-ring border border-white/40 dark:border-white/10
                     hover:border-indigo-300/50 dark:hover:border-indigo-500/30
                     overflow-hidden rounded-2xl max-w-2xl w-full transition-all duration-300"
        >
          <div className="p-6 relative z-10">
            <div className="flex items-start space-x-4">
              <div className="icon-badge flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  JSON Formatter Tool
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Format, validate, and transform JSON data with our powerful online tool. Features include real-time validation, beautification, and conversion to different formats.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['JSON Formatting', 'Validation', 'Format Conversion'].map(tag => (
                    <span key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full
                                     bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400
                                     border border-indigo-200/50 dark:border-indigo-700/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
);

export default ToolsSection;
