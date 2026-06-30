import React from 'react';

const FooterLinks = ({ scrollToSection }) => {
  return (
    <>
      <div className="footer-col">
        <h4 className="footer-col-title">Quick Links</h4>
        <ul className="footer-links">
          <li><button onClick={() => scrollToSection(0)}>Home</button></li>
          <li><button onClick={() => scrollToSection(1)}>About</button></li>
          <li><button onClick={() => scrollToSection(2)}>Facilities</button></li>
          <li><button onClick={() => scrollToSection(3)}>Pricing</button></li>
          <li><button onClick={() => scrollToSection(4)}>Contact</button></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4 className="footer-col-title">Our Facilities</h4>
        <ul className="footer-links cursor-pointer">
          <li><span onClick={() => scrollToSection(2)}>Luxury Rooms</span></li>
          <li><span onClick={() => scrollToSection(2)}>Guest Hall</span></li>
          <li><span onClick={() => scrollToSection(2)}>Banquet Hall</span></li>
          <li><span onClick={() => scrollToSection(2)}>Garden</span></li>
          <li><span onClick={() => scrollToSection(2)}>Kitchen</span></li>
          <li><span onClick={() => scrollToSection(2)}>Parking</span></li>
        </ul>
      </div>
    </>
  );
};

export default FooterLinks;
