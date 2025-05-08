import { motion } from 'framer-motion';

const ToolsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Other Essential Developer Tools
        </h2>
        
        <div className="flex justify-center">
          {/* JSON Formatter Tool Card */}
          <motion.a
            href="https://jsonformattertool.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 max-w-2xl w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-6 relative z-10">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    JSON Formatter Tool
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Format, validate, and transform JSON data with our powerful online tool. Features include real-time validation, beautification, and conversion to different formats.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                      JSON Formatting
                    </span>
                    <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                      Validation
                    </span>
                    <span className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                      Format Conversion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection; 