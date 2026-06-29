import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import heroImg from './assets/heroimg.png';
import aboutImg from './assets/aboutimg.png';
import facilityBanquet from './assets/facility_banquet.png';
import facilityRoom from './assets/facility_room.png';
import facilityGuestHall from './assets/facility_guest_hall.png';
import facilityGarden from './assets/facility_garden.png';
import facilityParking from './assets/facility_parking.png';
import facilityKitchen from './assets/facility_kitchen.png';

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
  const { activeSection, scrollToSection } = useSectionNavigation(SECTION_IDS);
  
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <SectionNavigator 
        current={activeSection + 1} 
        total={SECTION_IDS.length} 
        onUp={() => scrollToSection(activeSection - 1)} 
        onDown={() => scrollToSection(activeSection + 1)} 
      />
      <div className="container">
        <div className="watermark">Vijay Shree</div>
      
      <nav className="navbar">
        <ul className="nav-links left-links">
          <li><a href="#home">HOME</a></li>
          <li><a href="#rooms">ABOUT</a></li>
          <li><a href="#dining">FACILITIES</a></li>
          <li><a href="#events">PACKAGES</a></li>
          <li><a href="#events">ENQUIRE</a></li>
        </ul>
        
        <div className="logo">
          <h1>Vijay Shree</h1>
          <span>RESORT</span>
        </div>
        
        <div className="nav-contact">
          <a href="#contact">Contact</a>
          <a href="tel:1-800-123-4567" className="phone">7974119727</a>
        </div>
      </nav>

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
                <button className="text-btn">Learn More &rsaquo;</button>
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
                  <span className="capacity">50+ Premium Rooms</span>
                  <button className="text-btn">Learn More &rsaquo;</button>
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
                  <span className="capacity">Up to 200 Guests</span>
                  <button className="text-btn">Learn More &rsaquo;</button>
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
                  <button className="text-btn">Learn More &rsaquo;</button>
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
                  <span className="capacity">Up to 500 Guests</span>
                  <button className="text-btn">Learn More &rsaquo;</button>
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
                  <button className="text-btn">Learn More &rsaquo;</button>
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
            <div className="pricing-price">₹11,000</div>
            <ul className="pricing-features">
              <li><span className="check">✔</span> Luxury Rooms</li>
              <li><span className="check">✔</span> Guest Hall</li>
              <li><span className="check">✔</span> Banquet Hall</li>
              <li><span className="check">✔</span> Kitchen</li>
            </ul>
            <button className="cta-btn">Book Now</button>
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
            <div className="pricing-price">₹11,000</div>
            <ul className="pricing-features">
              <li><span className="check">✔</span> Garden</li>
              <li><span className="check">✔</span> Banquet Hall</li>
              <li><span className="check">✔</span> Kitchen</li>
              <li><span className="check">✔</span> Parking</li>
            </ul>
            <button className="cta-btn">Book Now</button>
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
              <li><span className="check">✔</span> Garden</li>
              <li><span className="check">✔</span> Banquet Hall</li>
              <li><span className="check">✔</span> Kitchen</li>
              <li><span className="check">✔</span> Parking</li>
            </ul>
            <button className="cta-btn">Book Now</button>
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
          <button className="cta-btn pricing-bottom-btn">Get a Free Quote</button>
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
          
          <div className="booking-form-side">
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
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" className="form-control" placeholder="John Doe" required />
                  </div>
                  
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input type="tel" className="form-control" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="john@example.com" />
                  </div>
                  
                  <div className="form-group">
                    <label>Event Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  
                  <div className="form-group">
                    <label>Event Type</label>
                    <select className="form-control">
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
                    <input type="number" className="form-control" placeholder="e.g. 200" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Package Selection</label>
                    <select className="form-control">
                      <option value="">Select a Package</option>
                      <option value="Building">Building Package – ₹11,000</option>
                      <option value="Garden">Garden Package – ₹11,000</option>
                      <option value="Premium">Premium Celebration Package – ₹31,000</option>
                      <option value="Custom">Need a Custom Package</option>
                    </select>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Additional Requirements</label>
                    <textarea className="form-control" placeholder="Tell us more about your event..." rows="3"></textarea>
                  </div>
                </div>
                
                <div className="form-checkbox">
                  <input type="checkbox" id="agree" required />
                  <label htmlFor="agree">I agree to be contacted regarding my enquiry.</label>
                </div>
                
                <button type="submit" className="cta-btn booking-submit-btn">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="language-selector">
          <span className="active"></span> &nbsp;&nbsp; <span></span>
        </div>
        <div className="social-links">
          <a href="#facebook">Instagram</a>
          <a href="#twitter">WhatsApp</a>
          <a href="#instagram">Gmail</a>
        </div>
      </footer>
    </div>
    </>
  );
}

export default App;
