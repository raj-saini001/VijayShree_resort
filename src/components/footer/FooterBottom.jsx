import React from 'react';
import SocialIcons from './SocialIcons';

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="footer-bottom">
      <div className="copyright">
        &copy; {currentYear} Vijay Shree Resort. All Rights Reserved.
      </div>
      
      <SocialIcons />
      
      <div className="credits">
        Designed & Developed by Raj Saini
      </div>
    </div>
  );
};

export default FooterBottom;
