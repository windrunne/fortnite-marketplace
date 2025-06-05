import React, { useState, useEffect } from 'react';
import Dropdown from '../ui/Dropdown';
import PriceRangeSlider from '../ui/PriceRangeSlider';
import { formatPrice, parsePrice } from '../../utils/filterUtils';
import { MIN_PRICE, MAX_PRICE } from '../../constants/filterConstants';
import { FiX } from 'react-icons/fi';

interface PriceRangeFilterProps {
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
  className?: string;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minValue,
  maxValue,
  onChange,
  className = ''
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(formatPrice(minValue));
  const [maxPrice, setMaxPrice] = useState(formatPrice(maxValue));
  
  // Update local state when props change
  useEffect(() => {
    setMinPrice(formatPrice(minValue));
    setMaxPrice(formatPrice(maxValue));
  }, [minValue, maxValue]);
  
  const handleDropdownClose = () => {
    // Auto-apply price range when closing dropdown
    const min = parsePrice(minPrice);
    const max = parsePrice(maxPrice);
    
    if (!isNaN(min) && !isNaN(max)) {
      onChange(min, max);
    }
    
    setIsDropdownOpen(false);
  };
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and $ sign
    if (/^(\$)?([0-9]*)$/.test(value)) {
      setMinPrice(value.startsWith('$') ? value : `$${value}`);
    }
  };
  
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and $ sign
    if (/^(\$)?([0-9]*)$/.test(value)) {
      setMaxPrice(value.startsWith('$') ? value : `$${value}`);
    }
  };
  
  const handleClearFilter = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening
    onChange(MIN_PRICE, MAX_PRICE);
  };

  const isFiltered = minValue !== MIN_PRICE || maxValue !== MAX_PRICE;

  return (
    <div 
      className={`cursor-pointer relative ${className} ${isFiltered ? 'bg-purple-500/10 rounded-md' : ''}`}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <div className="text-gray-400 text-xs mb-1">Price</div>
      <div className="text-white flex items-center gap-1 justify-between">
        {isFiltered 
          ? (
            <>
              <span>{`${formatPrice(minValue)} - ${formatPrice(maxValue)}`}</span>
              <button 
                onClick={handleClearFilter}
                className="text-gray-400 hover:text-white ml-1 p-1 rounded-full bg-gray-800"
              >
                <FiX size={16} />
              </button>
            </>
          )
          : "Select range"
        }
      </div>
      
      <Dropdown 
        isOpen={isDropdownOpen} 
        onClose={handleDropdownClose}
        className="p-6 w-[500px] z-20"
      >
        <div>
          <div className="text-white font-medium mb-6">Price range</div>
          
          <PriceRangeSlider
            minValue={parsePrice(minPrice)}
            maxValue={parsePrice(maxPrice)}
            onMinChange={setMinPrice}
            onMaxChange={setMaxPrice}
          />
          
          <div className="flex justify-between items-center mt-4">
            <div>
              <div className="text-xs text-gray-400 text-center mb-2">Min.</div>
              <input 
                type="text" 
                className="bg-gray-700 text-white rounded-full px-4 py-2.5 w-32 focus:outline-none focus:ring-1 focus:ring-purple-600 text-center"
                value={minPrice}
                onChange={handleMinPriceChange}
                onClick={(e) => e.stopPropagation()} // Prevent input click from closing dropdown
                onFocus={(e) => {
                  e.stopPropagation();
                  // Make sure dropdown stays open on focus
                  setIsDropdownOpen(true);
                }}
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 text-center mb-2">Max.</div>
              <input 
                type="text" 
                className="bg-gray-700 text-white rounded-full px-4 py-2.5 w-32 focus:outline-none focus:ring-1 focus:ring-purple-600 text-center"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                onClick={(e) => e.stopPropagation()} // Prevent input click from closing dropdown
                onFocus={(e) => {
                  e.stopPropagation();
                  // Make sure dropdown stays open on focus
                  setIsDropdownOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default PriceRangeFilter; 