import React, { useRef, useEffect } from 'react';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  className = '', 
  children 
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute left-0 top-full mt-2 bg-gray-800 rounded-lg shadow-lg z-10 ${className}`}
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside dropdown from closing it
    >
      {title && (
        <div className="text-xs text-gray-400 mb-2 px-2 pt-2">{title}</div>
      )}
      {children}
    </div>
  );
};

export default Dropdown; 