import React, { useState, useEffect } from 'react';
import { FilterState } from '../types';
import SearchFilterContainer from './filters/SearchFilterContainer';
import { DEFAULT_FILTER_STATE } from '../constants/filterConstants';

interface SearchFilterProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  onFilterChange,
  initialFilters = DEFAULT_FILTER_STATE
}) => {
  // Track current filters to pass down to the container
  const [currentFilters, setCurrentFilters] = useState<FilterState>(initialFilters);
  
  // Update currentFilters when initialFilters change
  useEffect(() => {
    setCurrentFilters(initialFilters);
  }, [initialFilters]);
  
  // Handle filter changes and propagate up
  const handleFilterChange = (filters: FilterState) => {
    setCurrentFilters(filters);
    onFilterChange(filters);
  };
  
  return (
    <SearchFilterContainer 
      onFilterChange={handleFilterChange} 
      initialFilters={currentFilters} 
    />
  );
};

export default SearchFilter; 