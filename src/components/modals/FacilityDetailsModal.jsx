import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, CheckCircle2, 
  Wifi, Snowflake, Tv, Coffee, Zap, Bath, 
  Wind, Shield, Car, Utensils, Music, Plug,
  CarFront, MapPin, Tent
} from 'lucide-react';
import './FacilityDetailsModal.css';

// Helper to map amenity names to Lucide icons
const getAmenityIcon = (name) => {
  const iconMap = {
    'WiFi': <Wifi size={18} />,
    'Air Conditioning': <Snowflake size={18} />,
    'Room Service': <Coffee size={18} />,
    'Power Backup': <Zap size={18} />,
    'Laundry': <Bath size={18} />,
    'Stage': <Music size={18} />,
    'Decoration': <Tent size={18} />,
    'Dining Area': <Utensils size={18} />,
    'Kitchen': <Utensils size={18} />,
    'Water Supply': <Wind size={18} />, // Using wind as a generic util icon for now
    'Ventilation': <Wind size={18} />,
    'Open Air': <MapPin size={18} />,
    'Stage Setup': <Music size={18} />,
    'Parking': <Car size={18} />,
    'Security': <Shield size={18} />,
    'Valet': <CarFront size={18} />,
    'EV Charging': <Plug size={18} />
  };
  return iconMap[name] || <CheckCircle2 size={18} />;
};

const FacilityDetailsModal = ({ isOpen, facility, onClose, onBook }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when facility changes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, facility]);

  if (!isOpen || !facility) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % facility.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + facility.images.length) % facility.images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-container"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={24} />
            </button>

            <div className="modal-content-scroll">
              {/* Image Slider */}
              <div className="slider-container">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={facility.images[currentImageIndex]}
                    alt={`${facility.title} - Image ${currentImageIndex + 1}`}
                    className="slider-image"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                
                {facility.images.length > 1 && (
                  <>
                    <button className="slider-btn prev" onClick={prevImage}>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="slider-btn next" onClick={nextImage}>
                      <ChevronRight size={24} />
                    </button>
                    <div className="slider-dots">
                      {facility.images.map((_, idx) => (
                        <button
                          key={idx}
                          className={`slider-dot ${idx === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Details Section */}
              <div className="modal-details">
                <div className="modal-header">
                  <h2 className="modal-title">{facility.title}</h2>
                  
                  <div className="modal-capacity">
                    <span>Capacity:</span> {facility.capacity}
                  </div>
                  
                  <div className="modal-tags">
                    {facility.tags.map((tag, idx) => (
                      <span key={idx} className="tag-chip">{tag}</span>
                    ))}
                  </div>
                  
                  <p className="modal-description">{facility.description}</p>
                </div>

                <div className="modal-grid">
                  {/* Features */}
                  <div className="modal-features-section">
                    <h3 className="section-title">Key Features</h3>
                    <ul className="features-list">
                      {facility.features.map((feature, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={18} className="feature-check" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Amenities */}
                  <div className="modal-amenities-section">
                    <h3 className="section-title">Premium Amenities</h3>
                    <div className="amenities-container">
                      {facility.amenities.map((amenity, idx) => (
                        <div key={idx} className="amenity-chip">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer CTA */}
              <div className="modal-footer">
                <button 
                  className="cta-btn" 
                  onClick={() => onBook(facility.value)}
                >
                  Book This Facility <span className="chevron">&rsaquo;</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FacilityDetailsModal;
