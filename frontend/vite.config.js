import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
export default defineConfig({
    plugins: [
        react(),
        cssInjectedByJsPlugin(), // inlines CSS into JS — removes render-blocking <link rel="stylesheet">
    ],
    css: {
        devSourcemap: false,
        postcss: './postcss.config.js'
    },
    server: {
        port: 3000,
        strictPort: false,
        host: true
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    // Core React runtime
                    if (id.indexOf('node_modules/react/') !== -1 ||
                        id.indexOf('node_modules/react-dom/') !== -1 ||
                        id.indexOf('node_modules/react-router-dom/') !== -1) {
                        return 'vendor';
                    }
                    // Animation library
                    if (id.indexOf('node_modules/framer-motion/') !== -1) {
                        return 'framer-motion';
                    }
                    // Color science utilities used on homepage
                    if (id.indexOf('node_modules/culori/') !== -1 ||
                        id.indexOf('node_modules/colorthief/') !== -1 ||
                        id.indexOf('node_modules/color-name-list/') !== -1 ||
                        id.indexOf('node_modules/nearest-color/') !== -1) {
                        return 'color-utils';
                    }
                    // Chart.js — only in lazy-loaded pages
                    if (id.indexOf('node_modules/chart.js/') !== -1 ||
                        id.indexOf('node_modules/react-chartjs-2/') !== -1) {
                        return 'charts';
                    }
                    // react-icons — only in lazy-loaded pages
                    if (id.indexOf('node_modules/react-icons/') !== -1) {
                        return 'icons';
                    }
                }
            }
        },
        chunkSizeWarningLimit: 600,
        assetsDir: 'assets',
        copyPublicDir: true,
        minify: 'esbuild',
        target: 'es2020',
    },
    optimizeDeps: {
        include: ['colorthief', 'color-name-list', 'nearest-color']
    },
    publicDir: 'public'
});
