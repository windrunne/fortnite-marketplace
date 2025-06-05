import React from 'react';

const tags = [
  'Most Skins',
  'Under $50',
  'Renegade Raider',
  'Travis Scott',
  'Black Knight',
  'Take The L',
  'Omega',
  'Elite Agent',
  'Blue Squire',
  'Floss',
  'IKONIK',
  'Galaxy'
];

interface FilterTagsProps {
  onTagSelect: (tag: string) => void;
  selectedTag: string | null;
}

const FilterTags: React.FC<FilterTagsProps> = ({ onTagSelect, selectedTag }) => {
  return (
    <div className="w-full overflow-x-auto py-2 custom-scrollbar">
      <div className="flex items-center space-x-3 min-w-max">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTag === tag
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTags; 