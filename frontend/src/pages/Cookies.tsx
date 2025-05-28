import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import PopunderAd from '../components/PopunderAd';

const Cookies = () => {
  const handleColorSelect = (color: string) => {
    // No-op since we don't need color selection on this page
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <Helmet>
        <title>Cookie Policy | Color Pick</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Learn about how ColorPeek uses cookies to enhance your experience and protect your privacy." />
        <meta name="keywords" content="cookie policy, privacy, website cookies, cookie management, data protection" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GSMXWF15GP"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GSMXWF15GP');
          `}
        </script>
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8219399801950643"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      <Navbar onColorSelect={handleColorSelect} />
      
      <PopunderAd />
      
      <main className="pt-16 pb-8">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Cookie Policy
            </h1>

            <div className="space-y-8 text-gray-600 dark:text-gray-400">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  What Are Cookies
                </h2>
                <p className="mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit 
                  our website. They are widely used to make websites work more efficiently and provide useful 
                  information to website owners.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  How We Use Cookies
                </h2>
                <p className="mb-4">
                  We use cookies for several purposes, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand how visitors use our site</li>
                  <li>Preference cookies to remember your settings and choices</li>
                  <li>Marketing cookies to deliver relevant content and advertisements</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Types of Cookies We Use
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Essential Cookies</h3>
                    <p>Required for basic site functionality and cannot be disabled.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Analytics Cookies</h3>
                    <p>Help us understand how visitors interact with our website.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Preference Cookies</h3>
                    <p>Remember your settings and improve your experience.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Marketing Cookies</h3>
                    <p>Used to track visitors across websites to display relevant advertisements.</p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Managing Cookies
                </h2>
                <p className="mb-4">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>View cookies stored on your computer</li>
                  <li>Allow, block, or delete cookies</li>
                  <li>Set preferences for certain websites</li>
                  <li>Use private browsing mode</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Third-Party Cookies
                </h2>
                <p className="mb-4">
                  Some cookies are placed by third-party services that appear on our pages. We use these 
                  services to enhance our website functionality and analyze usage patterns.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Updates to This Policy
                </h2>
                <p className="mb-4">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page 
                  with an updated revision date.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Contact Us
                </h2>
                <p>
                  If you have any questions about our Cookie Policy, please contact us through our contact page.
                </p>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Cookies; 