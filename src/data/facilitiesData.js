import facilityBanquet from '../assets/facility_banquet.png';
import facilityRoom from '../assets/facility_room.png';
import facilityGuestHall from '../assets/facility_guest_hall.png';
import facilityGarden from '../assets/facility_garden.png';
import facilityParking from '../assets/facility_parking.png';
import facilityKitchen from '../assets/facility_kitchen.png';
import aboutImg from '../assets/aboutimg.png';

export const facilitiesData = [
  {
    id: 'banquet',
    title: 'The Grand Banquet Hall',
    description: 'Our Grand Banquet Hall is the perfect setting for a majestic celebration. With opulent crystal chandeliers, premium acoustic treatments, and a stunning contemporary design, this venue transforms every wedding, reception, or corporate gala into a mesmerizing memory. Designed for grandeur, it includes specialized lighting and an expansive stage area.',
    images: [
      facilityBanquet,
      aboutImg,
      facilityBanquet
    ],
    features: [
      'Opulent Crystal Chandeliers',
      'Premium Stage & Sound System',
      'Customizable Luxury Decor',
      'Fully Air Conditioned',
      'Professional Lighting setup'
    ],
    capacity: 'Up to 500 Guests',
    tags: ['Wedding', 'Reception', 'Corporate Event', 'Anniversary'],
    amenities: ['Air Conditioning', 'Stage', 'Water Supply','Decoration', 'Power Backup'],
    value: 'Premium' // For dropdown mapping
  },
  {
    id: 'rooms',
    title: 'Luxury Rooms',
    description: 'Experience unparalleled comfort in our luxury rooms and suites. Whether you are hosting out-of-town guests or preparing for your big day, our accommodations provide a serene and plush environment. Enjoy 24/7 room service, panoramic views, and premium amenities that make every stay spectacular.',
    images: [
      facilityRoom,
      facilityRoom,
      facilityRoom
    ],
    features: [
      'Plush King-Sized Beds',
      '24/7 Room Service',
      'Panoramic Views',
      'En-suite Luxury Bathrooms',
      'High-speed Internet Access',
    ],
    capacity: '5+ Premium Rooms',
    tags: ['Accommodation', 'Guest Stay', 'Bridal Suite'],
    amenities: ['Air Conditioning', 'Room Service', 'Power Backup', 'Attach Bathroom'],
    value: 'Building'
  },
  {
    id: 'guest_hall',
    title: 'Sapphire Guest Hall',
    description: 'An intimately elegant setting perfect for pre-wedding rituals, smaller receptions, and exclusive private parties. The Sapphire Guest Hall offers a cozy yet sophisticated atmosphere, featuring a private lounge area and dedicated in-house catering to ensure your guests are treated like royalty.',
    images: [
      facilityGuestHall,
      facilityGuestHall,
      facilityGuestHall
    ],
    features: [
      'Intimate Elegant Setting',
      'In-house Catering Support',
      'Premium Interior Finish',
      'Luxury Seating Arrangements'
    ],
    capacity: 'Up to 40 Guests',
    tags: ['Birthday Party', 'Anniversary', 'Family Function', 'Pre-wedding Rituals'],
    amenities: ['Air Conditioning', 'Attach Bathroom', 'Decoration'],
    value: 'Building'
  },
  {
    id: 'kitchen',
    title: 'Big Commercial Kitchen',
    description: 'Our spacious commercial kitchen is the heart of our catering excellence. Designed to handle large-scale events, it adheres to the highest hygiene standards and features modern culinary equipment. It provides the perfect space for professional chefs to prepare mouth-watering delicacies for your guests.',
    images: [
      facilityKitchen,
      facilityKitchen,
      facilityKitchen
    ],
    features: [
      'Large Cooking Area',
      'Highest Hygiene Standards',
      'Suitable for Large Event Catering',
      'Professional Food Preparation Space',
      'Separate Veg & Non-Veg Sections'
    ],
    capacity: 'Full Service Capability',
    tags: ['Catering', 'Wedding', 'Large Events'],
    amenities: ['Kitchen', 'Power Backup', 'Water Supply', 'Ventilation'],
    value: 'Building'
  },
  {
    id: 'garden',
    title: 'The Royal Garden',
    description: 'Breathe in the beauty of nature while celebrating your most cherished moments. The Royal Garden features lush landscaping, romantic fairy lighting, and expansive open-air spaces perfect for winter weddings, evening receptions, or outdoor dining setups. Create magical memories under the stars.',
    images: [
      facilityGarden,
      facilityGarden,
      facilityGarden
    ],
    features: [
      'Lush Landscaping',
      'Outdoor Dining Setup Capability',
      'Romantic Fairy Lighting',
      'Spacious Open Area',
      'Perfect for Evening Events'
    ],
    capacity: 'Up to 2000 Guests',
    tags: ['Wedding', 'Reception', 'Outdoor Event', 'Family Function'],
    amenities: ['Decoration', 'Open Air', 'Power Backup', 'Stage Setup'],
    value: 'Garden'
  },
  {
    id: 'parking',
    title: 'Valet & Premium Parking',
    description: 'We believe premium service starts the moment you arrive. Our vast, secure parking facility ensures convenience and safety for all your guests’ vehicles. With complimentary valet service, covered spots, and even EV charging stations, we take care of the details so you can focus on the celebration.',
    images: [
      facilityParking,
      facilityParking,
      facilityParking
    ],
    features: [
      'Secure Covered Parking',
      'Complimentary Valet Service',
      '24/7 Security Personnel',
      'CCTV Surveillance',
      'Easy Access to Main Venues'
    ],
    capacity: '300+ Vehicles',
    tags: ['Convenience', 'Guest Service', 'Security'],
    amenities: ['Parking', 'Security', 'Valet'],
    value: 'Premium'
  }
];
