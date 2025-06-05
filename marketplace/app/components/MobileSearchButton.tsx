import React from 'react';
import { FiSearch, FiSliders } from 'react-icons/fi';

interface MobileSearchButtonProps {
  onClick: () => void;
}

const MobileSearchButton: React.FC<MobileSearchButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-full bg-gray-900 rounded-full py-3 px-4 flex items-center justify-between md:hidden shadow-lg shadow-black/30"
      onClick={onClick}
    >
      <div className="flex items-center text-gray-400">
        <span>Search & Filters</span>
      </div>
      <div className="purple-button rounded-full p-2 flex items-center justify-center">
        <FiSearch size={16} />
      </div>
    </button>
  );
};

export default MobileSearchButton; 