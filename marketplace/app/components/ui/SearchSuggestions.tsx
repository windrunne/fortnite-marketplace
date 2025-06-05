import React from 'react';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  className?: string;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ 
  suggestions, 
  onSelect,
  className = ''
}) => {
  if (suggestions.length === 0) return null;
  
  return (
    <div className={`bg-gray-800 rounded-lg p-1 w-full shadow-lg overflow-visible ${className}`}>
      <div className="text-xs text-gray-400 mb-1 px-3 pt-2">Suggestions</div>
      {suggestions.map((suggestion, index) => (
        <div 
          key={index}
          className="px-3 py-2 text-white hover:bg-gray-700 rounded cursor-pointer"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions; 