import React from 'react';

interface RadioButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, isSelected, onClick }) => {
  return (
    <div 
      className="px-2 py-2.5 text-white hover:bg-gray-700 rounded-lg cursor-pointer flex items-center"
      onClick={onClick}
    >
      <div className={`w-4 h-4 rounded-full border ${isSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-500'} mr-3 flex items-center justify-center`}>
        {isSelected && (
          <div className="w-2 h-2 bg-white rounded-full"></div>
        )}
      </div>
      <span className={`${isSelected ? 'text-purple-400' : 'text-white'}`}>
        {label}
      </span>
    </div>
  );
};

export default RadioButton; 