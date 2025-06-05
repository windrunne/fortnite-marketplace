import React, { useState, useEffect } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import SearchInput from './SearchInput';
import PriceRangeSlider from '../ui/PriceRangeSlider';
import RadioButton from '../ui/RadioButton';
import ToggleSwitch from '../ToggleSwitch';
import { FilterState } from '../../types';
import { DEFAULT_FILTER_STATE, DELIVERY_SPEED_OPTIONS } from '../../constants/filterConstants';
import { formatPrice, parsePrice } from '../../utils/filterUtils';

interface MobileFilterContainerProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  totalItems?: number;
}

const MobileFilterContainer: React.FC<MobileFilterContainerProps> = ({
  isOpen,
  onClose,
  initialFilters,
  onApplyFilters,
  totalItems = 0
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(formatPrice(initialFilters.priceRange.min));
  const [maxPrice, setMaxPrice] = useState(formatPrice(initialFilters.priceRange.max));
  
  // Reset state when modal opens to ensure sync with initialFilters
  useEffect(() => {
    if (isOpen) {
      setFilters(initialFilters);
      setMinPrice(formatPrice(initialFilters.priceRange.min));
      setMaxPrice(formatPrice(initialFilters.priceRange.max));
    }
  }, [isOpen, initialFilters]);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, search: value });
  };
  
  const handleDeliverySpeedSelect = (speed: string) => {
    setFilters({
      ...filters,
      deliverySpeed: speed
    });
  };
  
  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    
    // Try to update the filter state immediately if it's a valid number
    const parsedValue = parsePrice(value);
    if (!isNaN(parsedValue)) {
      setFilters({
        ...filters,
        priceRange: {
          ...filters.priceRange,
          min: parsedValue
        }
      });
    }
  };
  
  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    
    // Try to update the filter state immediately if it's a valid number
    const parsedValue = parsePrice(value);
    if (!isNaN(parsedValue)) {
      setFilters({
        ...filters,
        priceRange: {
          ...filters.priceRange,
          max: parsedValue
        }
      });
    }
  };
  
  const handleToggleChange = () => {
    setFilters({
      ...filters,
      certifiedVideo: !filters.certifiedVideo
    });
  };
  
  const handleClear = () => {
    setFilters(DEFAULT_FILTER_STATE);
    setMinPrice(formatPrice(DEFAULT_FILTER_STATE.priceRange.min));
    setMaxPrice(formatPrice(DEFAULT_FILTER_STATE.priceRange.max));
  };
  
  const handleApply = () => {
    // Apply price range
    const min = parsePrice(minPrice);
    const max = parsePrice(maxPrice);
    
    // Create a new filters object with the current state plus the updated price range
    const updatedFilters = {
      ...filters,
      priceRange: { 
        min: !isNaN(min) ? min : filters.priceRange.min,
        max: !isNaN(max) ? max : filters.priceRange.max
      }
    };
    
    // Also update our local state to ensure consistency
    setFilters(updatedFilters);
    
    // Close any expanded sections
    setExpandedSection(null);
    
    // Pass the updated filters to the parent component
    onApplyFilters(updatedFilters);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col h-full">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-white font-bold text-lg">Search & Filters</h2>
        <button onClick={onClose} className="text-gray-400">
          <FiX size={24} />
        </button>
      </div>
      
      {/* Account Count - Fixed below header */}
      <div className="flex-shrink-0 text-gray-400 text-sm p-4 border-b border-gray-800">
        {totalItems} accounts
      </div>
      
      {/* Content - Scrollable area */}
      <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar">
        <div className="px-4 pb-20 pt-2">
          {/* Search Field */}
          <div className="relative mb-6">
            <SearchInput 
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full border-gray-600 border-2 text-white rounded-full pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200"
            />
          </div>
          
          {/* Price Section */}
          <div className="mb-4 border-b border-gray-800 pb-4">
            <button 
              className="flex items-center justify-between w-full py-3 text-white"
              onClick={() => toggleSection('price')}
            >
              <span>Price</span>
              {expandedSection === 'price' ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </button>
            
            {expandedSection === 'price' && (
              <div 
                className="mt-4 mb-2"
                onClick={(e) => e.stopPropagation()}
              >
                <PriceRangeSlider
                  minValue={parsePrice(minPrice)}
                  maxValue={parsePrice(maxPrice)}
                  onMinChange={handleMinPriceChange}
                  onMaxChange={handleMaxPriceChange}
                />
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <div className="text-xs text-gray-400 text-center mb-2">Min.</div>
                    <input 
                      type="text" 
                      className="bg-gray-700 text-white rounded-full px-4 py-2 w-28 focus:outline-none focus:ring-1 focus:ring-purple-600 text-center"
                      value={minPrice}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^(\$)?([0-9]*)$/.test(value)) {
                          // Update the input field display value
                          const displayValue = value.startsWith('$') ? value : `$${value}`;
                          handleMinPriceChange(displayValue);
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Keep section expanded
                        if (expandedSection !== 'price') {
                          setExpandedSection('price');
                        }
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 text-center mb-2">Max.</div>
                    <input 
                      type="text" 
                      className="bg-gray-700 text-white rounded-full px-4 py-2 w-28 focus:outline-none focus:ring-1 focus:ring-purple-600 text-center"
                      value={maxPrice}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^(\$)?([0-9]*)$/.test(value)) {
                          // Update the input field display value
                          const displayValue = value.startsWith('$') ? value : `$${value}`;
                          handleMaxPriceChange(displayValue);
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Keep section expanded
                        if (expandedSection !== 'price') {
                          setExpandedSection('price');
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Delivery Speed Section */}
          <div className="mb-4 border-b border-gray-800 pb-4">
            <button 
              className="flex items-center justify-between w-full py-3 text-white"
              onClick={() => toggleSection('delivery')}
            >
              <span>Delivery Speed</span>
              {expandedSection === 'delivery' ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </button>
            
            {expandedSection === 'delivery' && (
              <div className="mt-2">
                {DELIVERY_SPEED_OPTIONS.map((speed) => (
                  <RadioButton
                    key={speed}
                    label={speed}
                    isSelected={filters.deliverySpeed === speed}
                    onClick={() => handleDeliverySpeedSelect(speed)}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Certified Video Toggle */}
          <div className="py-3 border-b border-gray-800 pb-4">
            <ToggleSwitch
              isOn={filters.certifiedVideo}
              onToggle={handleToggleChange}
              label="Certified Video"
            />
          </div>
        </div>
      </div>
      
      {/* Footer Buttons - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 border-t border-gray-800 flex items-center space-x-4 bg-black">
        <button 
          onClick={handleClear}
          className="flex-1 py-3 text-purple-500 font-medium uppercase"
        >
          CLEAR
        </button>
        <button 
          onClick={handleApply}
          className="flex-1 py-3 purple-button font-medium rounded-full"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default MobileFilterContainer; 