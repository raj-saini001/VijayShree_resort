import React from 'react';

const MobileMenuLinks = ({ activeSection, handleMobileNavClick }) => {
  const links = [
    { name: 'HOME', index: 0 },
    { name: 'ABOUT', index: 1 },
    { name: 'FACILITIES', index: 2 },
    { name: 'PACKAGES', index: 3 },
    { name: 'ENQUIRE', index: 4 }
  ];

  return (
    <ul className="mobile-nav-links">
      {links.map((link) => (
        <li key={link.index}>
          <button 
            className={activeSection === link.index ? 'active-link' : ''} 
            onClick={() => handleMobileNavClick(link.index)}
          >
            {link.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MobileMenuLinks;
