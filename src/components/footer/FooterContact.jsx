import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const FooterContact = () => {
  return (
    <div className="footer-col">
      <h4 className="footer-col-title">Contact Information</h4>
      
      <div className="footer-contact-item">
        <MapPin size={18} className="contact-icon" />
        <span>
          Vijay Shree Resort<br/>
          KhatyaKhedi Road, Pipliya Mandi,<br/>
          Mandsaur, M. P.
        </span>
      </div>
      
      <div className="footer-contact-item">
        <Phone size={18} className="contact-icon" />
        <a href="tel:7974119727">7974119727</a>
      </div>
      
      <div className="footer-contact-item">
        <Mail size={18} className="contact-icon" />
        <a href="mailto:info@vijayshreeresort.com">vijayshreeresort@gmail.com</a>
      </div>
      
      <div className="footer-contact-item">
        <Clock size={18} className="contact-icon" />
        <span>Open 24×7</span>
      </div>

      <a 
        href="https://maps.app.goo.gl/fKj9Cg5J1xkjTFMY6" 
        target="_blank" 
        rel="noopener noreferrer"
        className="map-btn"
      >
        <MapPin size={16} /> View on Google Maps
      </a>
    </div>
  );
};

export default FooterContact;
