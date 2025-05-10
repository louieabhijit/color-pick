import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';

const Terms = () => {
  const handleColorSelect = (color: string) => {
    // No-op since we don't need color selection on this page
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <Helmet>
        <title>Terms of Service | Color Pick</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Read ColorPeek's terms of service to understand your rights and responsibilities when using our color design tools." />
        <meta name="keywords" content="terms of service, user agreement, legal terms, ColorPeek terms, service conditions" />
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
              Terms of Service
            </h1>

            <div className="space-y-8 text-gray-600 dark:text-gray-400">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  1. Acceptance of Terms
                </h2>
                <p className="mb-4">
                  By accessing and using ColorPeek, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our service.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  2. Service Description
                </h2>
                <p className="mb-4">
                  ColorPeek provides color extraction and palette generation services. We offer tools 
                  to help users extract colors from images and create harmonious color combinations 
                  for their design projects.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  3. User Obligations
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must be at least 13 years old to use this service</li>
                  <li>You agree to provide accurate information when required</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You agree not to misuse or abuse our service</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  4. Intellectual Property
                </h2>
                <p className="mb-4">
                  All content and functionality on ColorPeek, including but not limited to text, 
                  graphics, logos, and software, is the property of ColorPeek and is protected 
                  by intellectual property laws.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  5. Limitation of Liability
                </h2>
                <p className="mb-4">
                  ColorPeek is provided "as is" without any warranties. We are not liable for any 
                  damages arising from your use of our service.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  6. Changes to Terms
                </h2>
                <p className="mb-4">
                  We reserve the right to modify these terms at any time. We will notify users 
                  of any material changes through our website or email.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  7. Contact Information
                </h2>
                <p>
                  For any questions about these Terms of Service, please contact us through our contact page.
                </p>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Terms; 