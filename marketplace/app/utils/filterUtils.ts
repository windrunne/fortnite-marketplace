import { MOCK_SUGGESTIONS } from '../constants/filterConstants';
import { FilterState } from '../types';

/**
 * Get search suggestions based on input text
 */
export const getSuggestions = (input: string): string[] => {
  if (!input.trim()) return [];
  
  return MOCK_SUGGESTIONS.filter(item => 
    item.toLowerCase().includes(input.toLowerCase())
  );
};

/**
 * Format price with dollar sign
 */
export const formatPrice = (price: number): string => {
  return `$${price}`;
};

/**
 * Parse price by removing dollar sign and converting to number
 */
export const parsePrice = (priceString: string): number => {
  return Number(priceString.replace('$', ''));
};

/**
 * Calculate slider position based on price
 */
export const calculateSliderPosition = (
  min: number, 
  max: number, 
  minLimit: number, 
  maxLimit: number
): { left: number; right: number } => {
  const leftPos = ((min - minLimit) / (maxLimit - minLimit)) * 100;
  const rightPos = ((max - minLimit) / (maxLimit - minLimit)) * 100;
  
  return {
    left: Math.max(0, Math.min(leftPos, 100)),
    right: Math.max(0, Math.min(rightPos, 100))
  };
};

/**
 * Calculate price from slider position
 */
export const calculatePriceFromSliderPosition = (
  position: number, 
  minLimit: number, 
  maxLimit: number
): number => {
  return Math.round(minLimit + (position / 100) * (maxLimit - minLimit));
};

/**
 * Apply price range to filters
 */
export const applyPriceRangeToFilters = (
  minPrice: string,
  maxPrice: string,
  currentFilters: FilterState
): FilterState => {
  const min = parsePrice(minPrice);
  const max = parsePrice(maxPrice);
  
  if (isNaN(min) || isNaN(max)) {
    return currentFilters;
  }
  
  return {
    ...currentFilters,
    priceRange: { min, max }
  };
}; 