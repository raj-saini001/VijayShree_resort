import React from 'react';

const QuickContactIcons = ({ links }) => {
  return (
    <div className="quick-contact-icons">
      {links.maps && (
        <a 
          href={links.maps} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="quick-contact-icon-btn"
          aria-label="Google Maps"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </a>
      )}
      
      {links.whatsapp && (
        <a 
          href={links.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="quick-contact-icon-btn"
          aria-label="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
            <path d="M14 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" />
            <path d="M9 10h.01" />
            <path d="M14 14h.01" />
          </svg>
        </a>
      )}
      
      {links.email && (
        <a 
          href={`mailto:${links.email}`} 
          className="quick-contact-icon-btn"
          aria-label="Email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      )}
      
      {links.instagram && links.instagram !== '#' && (
        <a 
          href={links.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="quick-contact-icon-btn"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      )}
    </div>
  );
};

export default QuickContactIcons;
