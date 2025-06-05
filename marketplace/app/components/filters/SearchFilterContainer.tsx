import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import SearchInput from './SearchInput';
import PriceRangeFilter from './PriceRangeFilter';
import DeliverySpeedFilter from './DeliverySpeedFilter';
import CertifiedVideoFilter from './CertifiedVideoFilter';
import { FilterState } from '../../types';
import { DEFAULT_FILTER_STATE } from '../../constants/filterConstants';

interface SearchFilterContainerProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const SearchFilterContainer: React.FC<SearchFilterContainerProps> = ({ 
  onFilterChange,
  initialFilters = DEFAULT_FILTER_STATE
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Update local state when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    const newFilters = { 
      ...filters, 
      priceRange: { min, max } 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDeliverySpeedChange = (speed: string) => {
    const newFilters = { ...filters, deliverySpeed: speed };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCertifiedVideoChange = (value: boolean) => {
    const newFilters = { ...filters, certifiedVideo: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full bg-gray-900 rounded-full flex flex-col items-center md:flex-row">
      {/* Search Input */}
      <div className="flex-1 md:border-r border-gray-700 px-10 py-3">
        <div className="text-gray-400 text-xs mb-1">Search</div>

        <SearchInput 
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="e.g. Travis Scott..."
        />
      </div>
      
      {/* Price Range */}
      <PriceRangeFilter 
        minValue={filters.priceRange.min}
        maxValue={filters.priceRange.max}
        onChange={handlePriceRangeChange}
        className="flex-1 md:border-r border-gray-700 px-4 py-3"
      />
      
      {/* Delivery Speed */}
      <DeliverySpeedFilter 
        value={filters.deliverySpeed}
        onChange={handleDeliverySpeedChange}
        className="flex-1 md:border-r border-gray-700 px-4 py-3"
      />
      
      {/* Certified Video */}
      <CertifiedVideoFilter 
        value={filters.certifiedVideo}
        onChange={handleCertifiedVideoChange}
        className="flex-1 px-4 py-3"
      />
      
      {/* Search Button */}
      <button 
        className="purple-button p-3 w-12 h-12 flex items-center justify-center rounded-full mr-4"
        onClick={() => onFilterChange(filters)}
      >
        <FiSearch size={20} />
      </button>
    </div>
  );
};

export default SearchFilterContainer; 