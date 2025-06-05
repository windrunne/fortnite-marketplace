// Price range limits
export const MIN_PRICE = 5;
export const MAX_PRICE = 10976;

// Delivery speed options
export const DELIVERY_SPEED_OPTIONS = [
  'Instant',
  '1 Hour',
  '2 Hours',
  '6 Hours',
  'Next Day'
];

// Default filter state
export const DEFAULT_FILTER_STATE = {
  search: '',
  priceRange: {
    min: MIN_PRICE,
    max: MAX_PRICE
  },
  deliverySpeed: 'Select',
  certifiedVideo: false
};

// Mock suggestions for demo purposes
// In a real app, these would come from an API
export const MOCK_SUGGESTIONS = [
  'Renegade', 
  'Renegade Raider', 
  'Travis Scott', 
  'Travis Scott Jordan', 
  'Nike Dunk', 
  'Jordan 1',
  'Fortnite',
  'Valorant'
]; 