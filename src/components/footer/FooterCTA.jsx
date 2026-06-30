import React from 'react';

const FooterCTA = ({ scrollToSection }) => {
  return (
    <div className="footer-cta">
      <h3>Ready to Plan Your Celebration?</h3>
      <p>Contact us today and let us make your special event unforgettable.</p>
      <button 
        className="footer-cta-btn" 
        onClick={() => scrollToSection(4)} // 4 is the index for Contact/Enquire section
      >
        Book Your Event <span style={{ marginLeft: '4px' }}>&rsaquo;</span>
      </button>
    </div>
  );
};

export default FooterCTA;
