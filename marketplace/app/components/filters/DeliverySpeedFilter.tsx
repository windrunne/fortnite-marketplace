import React, { useState } from 'react';
import Dropdown from '../ui/Dropdown';
import RadioButton from '../ui/RadioButton';
import { DELIVERY_SPEED_OPTIONS } from '../../constants/filterConstants';
import { FiX } from 'react-icons/fi';

interface DeliverySpeedFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const DeliverySpeedFilter: React.FC<DeliverySpeedFilterProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleSpeedSelect = (speed: string) => {
    onChange(speed);
    setIsDropdownOpen(false);
  };

  const handleClearFilter = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening
    onChange('Select');
  };

  const isFiltered = value !== 'Select';

  return (
    <div 
      className={`cursor-pointer relative ${className} ${isFiltered ? 'bg-purple-500/10 rounded-md' : ''}`}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <div className="text-gray-400 text-xs mb-1">Delivery Speed</div>
      <div className="text-white flex items-center gap-1 justify-between">
        {isFiltered ? (
          <>
            <span>{value}</span>
            <button 
              onClick={handleClearFilter}
              className="text-gray-400 hover:text-white ml-1 p-1 rounded-full bg-gray-800"
            >
              <FiX size={16} />
            </button>
          </>
        ) : (
          "Select"
        )}
      </div>
      
      <Dropdown 
        isOpen={isDropdownOpen} 
        onClose={() => setIsDropdownOpen(false)}
        title="Select Delivery Speed"
        className="p-4 w-56 z-10"
      >
        {DELIVERY_SPEED_OPTIONS.map((speed) => (
          <RadioButton
            key={speed}
            label={speed}
            isSelected={value === speed}
            onClick={() => handleSpeedSelect(speed)}
          />
        ))}
      </Dropdown>
    </div>
  );
};

export default DeliverySpeedFilter; 