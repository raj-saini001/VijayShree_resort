import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin, Clock } from 'lucide-react';
import MobileMenuLinks from './MobileMenuLinks';
import QuickContactIcons from './QuickContactIcons';
import './MobileMenu.css';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  activeSection, 
  scrollToSection 
}) => {

  // Prevent background scrolling and handle ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleMobileNavClick = (index) => {
    onClose();
    setTimeout(() => {
      scrollToSection(index);
    }, 100);
  };

  // Client links and details
  const contactLinks = {
    maps: 'https://maps.app.goo.gl/fKj9Cg5J1xkjTFMY6',
    whatsapp: 'https://wa.me/917974119727',
    email: 'vijayshreeresort@gmail.com',
    instagram: '#' // Empty or '#' will hide the icon automatically
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="mobile-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            if (e.target.classList.contains('mobile-menu-overlay')) {
              onClose();
            }
          }}
        >
          <motion.div 
            className="mobile-menu-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button 
              className="close-menu-btn"
              onClick={onClose}
              aria-label="Close mobile menu"
            >
              <X size={24} color="var(--text-primary)" />
            </button>
            
            <div className="mobile-menu-brand">
              <h2>Vijay Shree</h2>
              <span>RESORT</span>
            </div>
            
            <MobileMenuLinks 
              activeSection={activeSection} 
              handleMobileNavClick={handleMobileNavClick} 
            />
            
            <div className="mobile-quick-contact-section">
              <h4 className="mobile-section-title">Quick Contact</h4>
              
              <QuickContactIcons links={contactLinks} />
              
              <div className="mobile-contact-details">
                <div className="mobile-contact-item">
                  <Phone size={16} className="icon" />
                  <a href="tel:7974119727">7974119727</a>
                </div>
                <div className="mobile-contact-item">
                  <MapPin size={16} className="icon" />
                  <span>Main Road, City Name, State</span>
                </div>
                <div className="mobile-contact-item">
                  <Clock size={16} className="icon" />
                  <span>Open 24×7</span>
                </div>
              </div>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
