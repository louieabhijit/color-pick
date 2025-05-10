import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';

const Privacy = () => {
  const handleColorSelect = (color: string) => {
    // No-op since we don't need color selection on this page
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <Helmet>
        <title>Privacy Policy | Color Pick</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Learn about how ColorPeek protects your privacy and handles your personal information." />
        <meta name="keywords" content="privacy policy, data protection, personal information, user privacy, ColorPeek privacy" />
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
      
      <main className="pt-16 pb-8">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>

            <div className="space-y-8 text-gray-600 dark:text-gray-400">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Introduction
                </h2>
                <p className="mb-4">
                  At ColorPeek, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, and protect your personal information when you use our service.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Email address (when you contact us)</li>
                    <li>Name (when provided)</li>
                    <li>Information you provide in messages</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Usage Data</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Browser type and version</li>
                    <li>Time spent on pages</li>
                    <li>Features used</li>
                    <li>Color palettes generated</li>
                  </ul>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Data Storage and Security
                </h2>
                <p className="mb-4">
                  We implement appropriate security measures to protect against unauthorized access, 
                  alteration, disclosure, or destruction of your personal information.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Your Rights
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of your personal data</li>
                  <li>Right to erasure of your personal data</li>
                  <li>Right to restrict processing of your personal data</li>
                  <li>Right to data portability</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us through our contact page.
                </p>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Privacy; 