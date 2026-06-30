import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './App.css';
import heroImg from './assets/heroimg.png';
import aboutImg from './assets/aboutimg.png';
import facilityBanquet from './assets/facility_banquet.png';
import facilityRoom from './assets/facility_room.png';
import facilityGuestHall from './assets/facility_guest_hall.png';
import facilityGarden from './assets/facility_garden.png';
import facilityParking from './assets/facility_parking.png';
import facilityKitchen from './assets/facility_kitchen.png';
import FacilityDetailsModal from './components/modals/FacilityDetailsModal';
import { useFacilityModal } from './hooks/useFacilityModal';
import { useNavbarVisibility } from './hooks/useNavbarVisibility';
import Footer from './components/footer/Footer';
import MobileMenu from './components/navbar/MobileMenu';

const SECTION_IDS = ['home', 'about', 'facilities', 'pricing', 'contact'];

const useSectionNavigation = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = (index) => {
    if (index >= 0 && index < sectionIds.length) {
      const el = document.getElementById(sectionIds[index]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return { activeSection, scrollToSection };
};

const SectionNavigator = ({ current, total, onUp, onDown }) => {
  return (
    <div className="section-navigator-wrapper">
      <div className="section-navigator-container">
        <div className="section-navigator">
          <span 
            className={`arrow ${current === 1 ? 'disabled' : ''}`} 
            onClick={current > 1 ? onUp : undefined}
          >
            &uarr;
          </span>
          <span className="current-slide">{current}/{total}</span>
          <span 
            className={`arrow ${current === total ? 'disabled' : ''}`} 
            onClick={current < total ? onDown : undefined}
          >
            &darr;
          </span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [highlightForm, setHighlightForm] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const nameInputRef = useRef(null);
  const formRef = useRef(null);
  
  const { activeSection, scrollToSection } = useSectionNavigation(SECTION_IDS);
  const { isOpen, selectedFacility, openModal, closeModal } = useFacilityModal();
  const { isVisible, isAtTop } = useNavbarVisibility();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formData = new FormData(e.target);
      formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
      formData.append("subject", "New Enquiry from Website");
      formData.append("from_name", "Vijay Shree Resort Website");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        e.target.reset();
        setSelectedPackage('');
        setAdditionalRequirements('');
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookFacility = (packageValue) => {
    closeModal();
    if (packageValue) {
      setSelectedPackage(packageValue);
    }
    scrollToSection(SECTION_IDS.indexOf('contact'));
  };

  const handleScrollToForm = (packageValue, toastText, subjectText = '') => {
    setSelectedPackage(packageValue);
    setAdditionalRequirements(subjectText);
    
    const showToastAndFocus = () => {
      setToastMessage(toastText);
      setHighlightForm(true);
      nameInputRef.current?.focus();
      setTimeout(() => setHighlightForm(false), 2000);
      setTimeout(() => setToastMessage(''), 3000);
    };

    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top <= window.innerHeight - 100;
      
      if (!isVisible) {
        scrollToSection(SECTION_IDS.indexOf('contact'));
        setTimeout(showToastAndFocus, 800);
      } else {
        showToastAndFocus();
      }
    }
  };

  const handleCustomQuote = () => {
    handleScrollToForm('Custom', 'Custom Package selected. Please complete your enquiry.', 'Subject: Custom Package Enquiry\n');
  };

  return (
    <>
      <FacilityDetailsModal 
        isOpen={isOpen} 
        facility={selectedFacility} 
        onClose={closeModal} 
        onBook={handleBookFacility} 
      />
      <SectionNavigator 
        current={activeSection + 1} 
        total={SECTION_IDS.length} 
        onUp={() => scrollToSection(activeSection - 1)} 
        onDown={() => scrollToSection(activeSection + 1)} 
      />
      <div className="container">
        <div className="watermark-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div className="watermark">Vijay Shree</div>
        </div>
      
      <motion.nav 
        className={`navbar navbar-sticky-wrapper ${!isAtTop ? 'scrolled' : ''}`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <ul className="nav-links left-links desktop-only">
          <li>
            <button 
              className={activeSection === 0 ? 'active-link' : ''} 
              onClick={() => scrollToSection(0)}
            >HOME</button>
          </li>
          <li>
            <button 
              className={activeSection === 1 ? 'active-link' : ''} 
              onClick={() => scrollToSection(1)}
            >ABOUT</button>
          </li>
          <li>
            <button 
              className={activeSection === 2 ? 'active-link' : ''} 
              onClick={() => scrollToSection(2)}
            >FACILITIES</button>
          </li>
          <li>
            <button 
              className={activeSection === 3 ? 'active-link' : ''} 
              onClick={() => scrollToSection(3)}
            >PACKAGES</button>
          </li>
          <li>
            <button 
              className={activeSection === 4 ? 'active-link' : ''} 
              onClick={() => scrollToSection(4)}
            >ENQUIRE</button>
          </li>
        </ul>
        
        <div className="logo">
          <h1>Vijay Shree</h1>
          <span>RESORT</span>
        </div>
        
        <div className="nav-contact desktop-only">
          <button 
            onClick={() => scrollToSection(4)} 
            style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', textDecoration: 'none' }}
          >Contact</button>
          <a href="tel:1-800-123-4567" className="phone">7974119727</a>
        </div>
        
        <button 
          className="mobile-menu-btn mobile-only" 
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu size={28} color="var(--text-primary)" />
        </button>
      </motion.nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />

      <main className="hero" id="home">
        <div className="carousel-indicator-spacer" style={{ width: '50px' }}></div>

        <div className="hero-content">
          <div className="image-wrapper">
            <img src={heroImg} alt="Hotel Balcony View" />
          </div>
          
          <div className="text-content">
            <div className="rating">
              <div className="stars">★★★★★</div>
              <p>Where Every Celebration<br/>Becomes a Beautiful Memory.</p>
            </div>
            
            <h2 className="headline">
              Create<br/>
              Unforgettable<br/>
              Celebrations
            </h2>
            
            <button className="cta-btn" onClick={() => scrollToSection(SECTION_IDS.indexOf('contact'))}>
              Reserve Your Venue <span className="chevron">&rsaquo;</span>
            </button>
          </div>
        </div>
      </main>

      <section className="about-section" id="about">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="about-image-wrapper">
            <img src={aboutImg} alt="Luxury Wedding Banquet Hall" />
            <div className="decorative-shape"></div>
          </div>
          
          <div className="about-text">
            <h4 className="subtitle">ABOUT US</h4>
            <h2 className="headline about-headline">
              Creating Memorable<br/>Celebrations
            </h2>
            <p className="about-description">
              We provide the perfect venue for weddings, receptions, birthday parties, corporate events, and family celebrations. Our elegant halls, luxurious rooms, delicious catering, and dedicated team ensure every event becomes unforgettable.
            </p>
            <button className="cta-btn about-btn">
              Learn More <span className="chevron">&rsaquo;</span>
            </button>
          </div>
        </motion.div>
      </section>

      <section className="facilities-section" id="facilities">
        <motion.div 
          className="facilities-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="subtitle text-center">OUR FACILITIES</h4>
          <h2 className="headline text-center facilities-headline">
            Everything You Need for a<br/>Perfect Celebration
          </h2>
          <p className="facilities-description text-center">
            Explore our premium facilities designed to make every wedding, reception, party, and event comfortable, elegant, and unforgettable.
          </p>
        </motion.div>

        <div className="facilities-grid">
          {/* Featured Banquet Hall */}
          <motion.div 
            className="facility-card featured-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="facility-img-wrapper">
              <img src={facilityBanquet} alt="Grand Banquet Hall" />
            </div>
            <div className="facility-content">
              <div className="facility-icon">✧</div>
              <h3 className="facility-title">The Grand Banquet Hall</h3>
              <ul className="facility-features">
                <li>Opulent Crystal Chandeliers</li>
                <li>Premium Stage & Sound System</li>
                <li>Customizable Luxury Decor</li>
                <li>Dedicated Event Manager</li>
              </ul>
              <div className="facility-meta">
                <span className="capacity">Up to 1000 Guests</span>
                <button className="text-btn" onClick={() => openModal('banquet')}>Learn More &rsaquo;</button>
              </div>
            </div>
          </motion.div>

          <div className="sub-facilities">
            {/* Luxury Rooms */}
            <motion.div 
              className="facility-card sub-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="facility-img-wrapper">
                <img src={facilityRoom} alt="Luxury Rooms" />
              </div>
              <div className="facility-content">
                <div className="facility-icon">🛏</div>
                <h3 className="facility-title">Luxury Rooms & Suites</h3>
                <ul className="facility-features">
                  <li>Plush King-Sized Beds</li>
                  <li>24/7 Room Service</li>
                  <li>Panoramic Views</li>
                </ul>
                <div className="facility-meta">
                  <span className="capacity">5+ Premium Rooms</span>
                  <button className="text-btn" onClick={() => openModal('rooms')}>Learn More &rsaquo;</button>
                </div>
              </div>
            </motion.div>

            {/* Guest Hall 1 */}
            <motion.div 
              className="facility-card sub-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="facility-img-wrapper">
                <img src={facilityGuestHall} alt="Guest Hall 1" />
              </div>
              <div className="facility-content">
                <div className="facility-icon">🍸</div>
                <h3 className="facility-title">Sapphire Guest Hall</h3>
                <ul className="facility-features">
                  <li>Intimate Elegant Setting</li>
                  <li>In-house Catering</li>
                  <li>Private Lounge Area</li>
                </ul>
                <div className="facility-meta">
                  <span className="capacity">Up to 00 Guests</span>
                  <button className="text-btn" onClick={() => openModal('guest_hall')}>Learn More &rsaquo;</button>
                </div>
              </div>
            </motion.div>

            {/* Big Commercial Kitchen */}
            <motion.div 
              className="facility-card sub-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="facility-img-wrapper">
                <img src={facilityKitchen} alt="Big Commercial Kitchen" />
              </div>
              <div className="facility-content">
                <div className="facility-icon">👨‍🍳</div>
                <h3 className="facility-title">Big Commercial Kitchen</h3>
                <p className="facilities-description" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  Our spacious and fully equipped commercial kitchen is designed to handle large-scale catering for weddings, receptions, parties, and special events.
                </p>
                <ul className="facility-features">
                  <li>Large Cooking Area</li>
                  <li>Hygienic Environment</li>
                  <li>Modern Kitchen Equipment</li>
                  <li>Suitable for Large Event Catering</li>
                  <li>Professional Food Preparation Space</li>
                </ul>
                <div className="facility-meta">
                  <span className="capacity">Full Service</span>
                  <button className="text-btn" onClick={() => openModal('kitchen')}>Learn More &rsaquo;</button>
                </div>
              </div>
            </motion.div>

            {/* Garden */}
            <motion.div 
              className="facility-card sub-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="facility-img-wrapper">
                <img src={facilityGarden} alt="Luxury Garden" />
              </div>
              <div className="facility-content">
                <div className="facility-icon">🌿</div>
                <h3 className="facility-title">The Royal Garden</h3>
                <ul className="facility-features">
                  <li>Lush Landscaping</li>
                  <li>Outdoor Dining Setup</li>
                  <li>Romantic Fairy Lighting</li>
                </ul>
                <div className="facility-meta">
                  <span className="capacity">Up to 2000 Guests</span>
                  <button className="text-btn" onClick={() => openModal('garden')}>Learn More &rsaquo;</button>
                </div>
              </div>
            </motion.div>

            {/* Parking */}
            <motion.div 
              className="facility-card sub-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="facility-img-wrapper">
                <img src={facilityParking} alt="Luxury Parking" />
              </div>
              <div className="facility-content">
                <div className="facility-icon">🚘</div>
                <h3 className="facility-title">Valet & Premium Parking</h3>
                <ul className="facility-features">
                  <li>Secure Covered Parking</li>
                  <li>Complimentary Valet</li>
                  <li>EV Charging Stations</li>
                </ul>
                <div className="facility-meta">
                  <span className="capacity">300+ Vehicles</span>
                  <button className="text-btn" onClick={() => openModal('parking')}>Learn More &rsaquo;</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <motion.div 
          className="pricing-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="subtitle">OUR PACKAGES</h4>
          <h2 className="headline pricing-headline">
            Choose the Perfect Package for Your Celebration
          </h2>
          <p className="pricing-description">
            Whether you're planning a wedding, reception, birthday, or family event, choose the package that best suits your celebration.
          </p>
        </motion.div>

        <div className="pricing-grid">
          {/* Card 1 */}
          <motion.div 
            className="pricing-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="pricing-title">🏢 Building Package</h3>
            <div className="pricing-price">₹21,000</div>
            <ul className="pricing-features">
              <li><span className="check">✔</span> Luxury Rooms</li>
              <li><span className="check">✔</span> Guest Hall</li>
              <li><span className="check">✔</span> Banquet Hall</li>
              <li><span className="check">✔</span> Kitchen</li>
            </ul>
            <button 
              className="cta-btn" 
              onClick={() => handleScrollToForm('Building', 'Building Package selected. Please complete the enquiry form.')}
            >
              Book Now
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="pricing-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="pricing-title">🌿 Garden Package</h3>
            <div className="pricing-price">₹21,000</div>
            <ul className="pricing-features">
              <li><span className="check">✔</span> Garden</li>
              <li><span className="check">✔</span> Banquet Hall</li>
              <li><span className="check">✔</span> Kitchen</li>
              <li><span className="check">✔</span> Parking</li>
            </ul>
            <button 
              className="cta-btn" 
              onClick={() => handleScrollToForm('Garden', 'Garden Package selected. Please complete the enquiry form.')}
            >
              Book Now
            </button>
          </motion.div>

          {/* Card 3 (Highlighted) */}
          <motion.div 
            className="pricing-card highlighted"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="pricing-badge">Best Value</div>
            <h3 className="pricing-title">👑 Premium Celebration Package</h3>
            <div className="pricing-price">₹31,000</div>
            <ul className="pricing-features">
              <li><span className="check">✔</span> Luxury Rooms</li>
              <li><span className="check">✔</span> Guest Hall</li>
              <li><span className="check">✔</span> Banquet Hall</li>
              <li><span className="check">✔</span> Kitchen</li>
              <li><span className="check">✔</span> Garden</li>
              <li><span className="check">✔</span> Parking</li>
            </ul>
            <button 
              className="cta-btn" 
              onClick={() => handleScrollToForm('Premium', 'Premium Celebration Package selected. Please complete the enquiry form.')}
            >
              Book Now
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="pricing-bottom-note"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="pricing-bottom-title">Need a Custom Package?</h3>
          <p className="pricing-bottom-text">
            Looking for a customized package? Contact us to create the perfect package based on your event requirements.
          </p>
          <button className="cta-btn pricing-bottom-btn" onClick={handleCustomQuote}>Get a Free Quote</button>
          <p className="pricing-disclaimer">
            Prices may vary depending on event requirements, decorations, and seasonal availability. Please contact us for the latest pricing and booking details.
          </p>
        </motion.div>
      </section>

      <section className="booking-section" id="contact">
        <motion.div 
          className="booking-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="booking-image-side">
            <img src={facilityBanquet} alt="Book Your Event Venue" />
            <div className="booking-image-overlay">
              <span className="booking-badge">Book Now</span>
              <h3 className="booking-image-title">Secure Your Date</h3>
              <p className="booking-image-text">Let's create unforgettable memories together.</p>
            </div>
          </div>
          
          <div className="booking-form-side" ref={formRef} style={{ position: 'relative' }}>
            {toastMessage && (
              <motion.div 
                className="custom-toast"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {toastMessage}
              </motion.div>
            )}
            <motion.div 
              className={`form-highlight-wrapper ${highlightForm ? 'highlighted' : ''}`}
              animate={{ 
                boxShadow: highlightForm ? '0 0 0 4px rgba(97, 87, 143, 0.3)' : '0 0 0 0px rgba(97, 87, 143, 0)'
              }}
              transition={{ duration: 0.5 }}
              style={{ borderRadius: '8px', padding: highlightForm ? '1rem' : '0' }}
            >
            {isSubmitted ? (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="success-icon">✧</div>
                <h3 className="success-title">Thank You!</h3>
                <p className="success-text">Your enquiry has been submitted successfully.<br/>Our team will contact you soon to discuss your celebration.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                <h3 className="booking-form-title">Enquire Now</h3>
                <p className="booking-form-subtitle">Fill in the details below and our event managers will get back to you.</p>
                
                {submitError && (
                  <div style={{ color: '#d9534f', backgroundColor: '#fdf7f7', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '0.9rem', border: '1px solid #f5c6cb' }}>
                    {submitError}
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" className="form-control" placeholder="John Doe" required ref={nameInputRef} />
                  </div>
                  
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input type="tel" name="phone" className="form-control" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" className="form-control" placeholder="john@example.com" />
                  </div>
                  
                  <div className="form-group">
                    <label>Event Date</label>
                    <input type="date" name="event_date" className="form-control" />
                  </div>
                  
                  <div className="form-group">
                    <label>Event Type</label>
                    <select name="event_type" className="form-control">
                      <option value="">Select an Event</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Reception">Reception</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Corporate">Corporate Event</option>
                      <option value="Family">Family Celebration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Number of Guests</label>
                    <input type="number" name="guests" className="form-control" placeholder="e.g. 200" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Package Selection</label>
                    <select 
                      name="package"
                      className="form-control"
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                    >
                      <option value="">Select a Package</option>
                      <option value="Building">Building Package – ₹21,000</option>
                      <option value="Garden">Garden Package – ₹21,000</option>
                      <option value="Premium">Premium Celebration Package -₹31,000</option>
                      <option value="Custom">Need a Custom Package</option>
                    </select>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Additional Requirements</label>
                    <textarea 
                      name="requirements"
                      className="form-control" 
                      placeholder="Tell us more about your event..." 
                      rows="3"
                      value={additionalRequirements}
                      onChange={(e) => setAdditionalRequirements(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                
                <div className="form-checkbox">
                  <input type="checkbox" id="agree" name="agree" required />
                  <label htmlFor="agree">I agree to be contacted regarding my enquiry.</label>
                </div>
                
                <input type="hidden" name="redirect" value="" />
                
                <button type="submit" className="cta-btn booking-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer scrollToSection={scrollToSection} />
    </div>
    </>
  );
}

export default App;
