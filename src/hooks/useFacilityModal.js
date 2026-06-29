import { useState, useEffect, useCallback } from 'react';
import { facilitiesData } from '../data/facilitiesData';

export const useFacilityModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const openModal = useCallback((facilityId) => {
    const facility = facilitiesData.find(f => f.id === facilityId);
    if (facility) {
      setSelectedFacility(facility);
      setIsOpen(true);
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedFacility(null);
    }, 300); // Wait for exit animation
    // Restore body scrolling
    document.body.style.overflow = 'unset';
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  return {
    isOpen,
    selectedFacility,
    openModal,
    closeModal
  };
};
