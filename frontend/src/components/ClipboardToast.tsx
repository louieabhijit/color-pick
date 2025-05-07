import { motion, AnimatePresence } from 'framer-motion';

interface ClipboardToastProps {
  copiedValue: string | null;
}

const ClipboardToast = ({ copiedValue }: ClipboardToastProps) => {
  if (!copiedValue) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="px-6 py-3 rounded-2xl
                     bg-white/10 dark:bg-gray-900/50
                     backdrop-blur-xl
                     shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                     border border-white/20 dark:border-white/10
                     flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-green-500/20 backdrop-blur-sm
                       flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-green-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Copied
            </span>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary
                         bg-clip-text text-transparent">
              {copiedValue}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClipboardToast; 