import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ComponentType } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import AdsterraAd from '../components/AdsterraAd';
import BannerAd from '../components/BannerAd';
import Toast from '../components/Toast';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';

interface ContactInfo {
  icon: ComponentType<{ className?: string }>;
  title: string;
  details: string[];
}

const ContactCard = ({ icon: Icon, title, details }: ContactInfo) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md 
               transition-all duration-300 border border-gray-100 dark:border-gray-700"
  >
    <div className="flex items-start space-x-4">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-lg">
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        {details.map((detail, index) => (
          <p key={index} className="text-gray-600 dark:text-gray-400">{detail}</p>
        ))}
      </div>
    </div>
  </motion.div>
);

const InputField = ({ label, type, name, value, onChange, required = true }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={6}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                 focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                 transition-colors duration-200 resize-none"
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                 focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                 transition-colors duration-200"
      />
    )}
  </motion.div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleColorSelect = (color: string) => {
    // No-op since we don't need color selection on this page
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setToastMessage('Message sent successfully! We will get back to you soon.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["support@colorpeek.com", "business@colorpeek.com"]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <Helmet>
        <title>Contact Us | Color Pick</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Get in touch with the ColorPeek team. We're here to help with your color design needs, technical support, and partnership opportunities." />
        <meta name="keywords" content="contact, support, color design help, technical support, partnership" />
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
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          {/* Ad placement after hero */}
          <AdsterraAd variant="content" />
          <BannerAd variant="content" />

          {/* Contact Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ContactCard {...info} />
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map or Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-10" />
              <div className="relative p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  Why Contact Us?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-500 rounded-full p-1">
                      {FaCheck && <FaCheck className="w-4 h-4 text-white" />}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Get expert color advice</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-500 rounded-full p-1">
                      {FaCheck && <FaCheck className="w-4 h-4 text-white" />}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Technical support</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-500 rounded-full p-1">
                      {FaCheck && <FaCheck className="w-4 h-4 text-white" />}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Partnership opportunities</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-500 rounded-full p-1">
                      {FaCheck && <FaCheck className="w-4 h-4 text-white" />}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Feature requests</p>
                  </div>
                </div>
              </div>

              {/* Banner ad in sidebar area */}
              <BannerAd variant="sidebar" />
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <InputField
                  label="Message"
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 
                           rounded-lg font-medium shadow-sm transition-all duration-200
                           ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Ad placement at end */}
          <AdsterraAd variant="footer" />
          <BannerAd variant="footer" />
        </div>
      </main>

      <Toast
        message={toastMessage}
        type="success"
        isVisible={showToast}
      />
    </div>
  );
};

export default Contact; 