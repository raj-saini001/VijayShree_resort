import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FooterLinks from './FooterLinks';
import FooterContact from './FooterContact';
import FooterCTA from './FooterCTA';
import FooterBottom from './FooterBottom';
import BackToTopButton from './BackToTopButton';
import './Footer.css';

const Footer = ({ scrollToSection }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="footer-wrapper">
        <div className="footer-top-accent"></div>
        
        <motion.div 
          className="footer-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Column 1: Brand */}
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <h2>Vijay Shree</h2>
              <span>RESORT</span>
            </div>
            <p className="footer-description">
              Creating unforgettable weddings, receptions and celebrations with elegant venues, premium hospitality and exceptional service.
            </p>
          </div>

          {/* Column 2 & 3: Links */}
          <FooterLinks scrollToSection={scrollToSection} />

          {/* Column 4: Contact */}
          <FooterContact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FooterCTA scrollToSection={scrollToSection} />
        </motion.div>

        <FooterBottom />
      </footer>

      <BackToTopButton isVisible={showBackToTop} scrollToTop={scrollToTop} />
    </>
  );
};

export default Footer;
