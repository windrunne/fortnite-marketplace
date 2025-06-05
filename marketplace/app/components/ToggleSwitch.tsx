import React from 'react';
import { FiCheck } from 'react-icons/fi';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  subLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  isOn, 
  onToggle, 
  label, 
  subLabel 
}) => {
  return (
    <div className="flex items-center justify-between">
      {(label || subLabel) && (
        <div>
          {label && <div className="text-white">{label}</div>}
          {subLabel && <div className="text-gray-400 text-xs">{subLabel}</div>}
        </div>
      )}
      
      <div className="relative">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
          type="button"
          role="switch"
          aria-checked={isOn}
          className="relative inline-block w-12 h-6 rounded-full"
          style={{ backgroundColor: '#1E2231' }}
        >
          {/* Circle Knob */}
          <div 
            className={`absolute rounded-full w-7 h-7 flex items-center justify-center top-1/2 transform -translate-y-1/2 transition-all duration-200 ${isOn ? 'right-[-2px]' : 'left-[-2px]'}`}
            style={{ backgroundColor: isOn ? '#FFFFFF' : '#4A4E59' }}
          >
            {isOn && <FiCheck size={15} className="text-black" />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ToggleSwitch; 