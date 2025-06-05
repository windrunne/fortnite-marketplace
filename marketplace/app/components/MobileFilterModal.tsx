import React from 'react';
import { FilterState } from '../types';
import MobileFilterContainer from './filters/MobileFilterContainer';

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  totalItems?: number;
}

const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
  isOpen,
  onClose,
  initialFilters,
  onApplyFilters,
  totalItems = 0
}) => {
  // Function to handle applying filters and ensure they propagate
  const handleApplyFilters = (updatedFilters: FilterState) => {
    // Call the parent's onApplyFilters with the updated filters
    onApplyFilters(updatedFilters);
    // Close the modal
    onClose();
  };

  return (
    <MobileFilterContainer
      isOpen={isOpen}
      onClose={onClose}
      initialFilters={initialFilters}
      onApplyFilters={handleApplyFilters}
      totalItems={totalItems}
    />
  );
};

export default MobileFilterModal; 