import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import SearchSuggestions from '../ui/SearchSuggestions';
import { getSuggestions } from '../../utils/filterUtils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}) => {
  const [searchInput, setSearchInput] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearchSelected, setIsSearchSelected] = useState(false);
  
  const searchInputRef = useRef<HTMLDivElement>(null);
  const dummyFocusRef = useRef<HTMLButtonElement>(null);
  
  // Update suggestions when search input changes
  useEffect(() => {
    if (searchInput.trim()) {
      const newSuggestions = getSuggestions(searchInput);
      setSuggestions(newSuggestions);
      
      if (newSuggestions.length > 0) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [searchInput]);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update local state when prop value changes
  useEffect(() => {
    setSearchInput(value);
  }, [value]);

  // Ensure dropdown closes when component unmounts
  useEffect(() => {
    return () => {
      setShowSuggestions(false);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchInput(newValue);
    setIsSearchSelected(false); // Reset the selected state when typing
    onChange(newValue);
  };

  const handleSearchClear = () => {
    setSearchInput('');
    setIsSearchSelected(false);
    setShowSuggestions(false); // Explicitly close dropdown when clearing
    onChange('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Force the dropdown to close immediately using requestAnimationFrame
    requestAnimationFrame(() => {
      setShowSuggestions(false);
      
      // Shift focus to the dummy element to ensure dropdown is dismissed
      if (dummyFocusRef.current) {
        dummyFocusRef.current.focus();
        dummyFocusRef.current.blur();
      }
    });
    
    // Set the flags and update input
    setIsSearchSelected(true);
    setSearchInput(suggestion);
    
    // Then update the parent
    onChange(suggestion);
  };

  return (
    <div className={`relative ${className}`} ref={searchInputRef}>
      {/* Hidden button for focus management */}
      <button 
        ref={dummyFocusRef} 
        className="sr-only" 
        aria-hidden="true"
        tabIndex={-1}
      />
      
      <div className="flex items-center">
        <div className="text-gray-400 mr-2">
          <FiSearch size={18} className="text-white"/>
        </div>
        <input 
          type="text" 
          placeholder={placeholder}
          className="bg-transparent text-white w-full focus:outline-none" 
          value={searchInput}
          onChange={handleSearchChange}
          onFocus={() => {
            // Only show suggestions if we're actively typing (not when a suggestion is selected)
            if (searchInput.trim() && suggestions.length > 0 && !isSearchSelected) {
              setShowSuggestions(true);
            }
          }}
          onBlur={(e) => {
            // Don't close suggestions if we're clicking on a suggestion
            if (!e.relatedTarget || !searchInputRef.current?.contains(e.relatedTarget as Node)) {
              // Delay hiding to allow click to register first
              setTimeout(() => {
                setShowSuggestions(false);
              }, 150);
            }
          }}
        />
        {searchInput && (
          <button 
            className={`${isSearchSelected ? 'bg-gray-700 rounded-full p-1.5' : ''} text-gray-400 hover:text-white flex items-center justify-center`}
            onClick={handleSearchClear}
            aria-label="Clear search"
          >
            <FiX size={isSearchSelected ? 14 : 18} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute left-0 top-full mt-2 z-[100]">
          <SearchSuggestions 
            suggestions={suggestions} 
            onSelect={handleSuggestionClick} 
          />
        </div>
      )}
    </div>
  );
};

export default SearchInput; 