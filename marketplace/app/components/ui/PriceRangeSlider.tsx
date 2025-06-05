import React, { useState, useRef, useEffect } from 'react';
import { formatPrice, calculatePriceFromSliderPosition } from '../../utils/filterUtils';
import { MIN_PRICE, MAX_PRICE } from '../../constants/filterConstants';

interface PriceRangeSliderProps {
  minValue: number;
  maxValue: number;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  minLimit?: number;
  maxLimit?: number;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minLimit = MIN_PRICE,
  maxLimit = MAX_PRICE
}) => {
  const [sliderPosition, setSliderPosition] = useState({ 
    left: ((minValue - minLimit) / (maxLimit - minLimit)) * 100, 
    right: ((maxValue - minLimit) / (maxLimit - minLimit)) * 100 
  });
  const [isDragging, setIsDragging] = useState<'left' | 'right' | null>(null);
  
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  
  // Handle slider drag events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderTrackRef.current) return;
      
      const trackRect = sliderTrackRef.current.getBoundingClientRect();
      const trackWidth = trackRect.width;
      const relativeX = Math.max(0, Math.min(e.clientX - trackRect.left, trackWidth));
      const percentage = Math.round((relativeX / trackWidth) * 100);
      
      if (isDragging === 'left') {
        // Ensure left thumb doesn't pass right thumb
        const newLeft = Math.min(percentage, sliderPosition.right - 5);
        setSliderPosition(prev => ({ ...prev, left: newLeft }));
        
        // Update min price
        const min = calculatePriceFromSliderPosition(newLeft, minLimit, maxLimit);
        onMinChange(formatPrice(min));
      } else if (isDragging === 'right') {
        // Ensure right thumb doesn't pass left thumb
        const newRight = Math.max(percentage, sliderPosition.left + 5);
        setSliderPosition(prev => ({ ...prev, right: newRight }));
        
        // Update max price
        const max = calculatePriceFromSliderPosition(newRight, minLimit, maxLimit);
        onMaxChange(formatPrice(max));
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(null);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, sliderPosition, onMinChange, onMaxChange, minLimit, maxLimit]);
  
  // Update slider positions when min/max values change externally
  useEffect(() => {
    const leftPos = ((minValue - minLimit) / (maxLimit - minLimit)) * 100;
    const rightPos = ((maxValue - minLimit) / (maxLimit - minLimit)) * 100;
    
    setSliderPosition({
      left: Math.max(0, Math.min(leftPos, 100)),
      right: Math.max(0, Math.min(rightPos, 100))
    });
  }, [minValue, maxValue, minLimit, maxLimit]);
  
  return (
    <div 
      className="relative h-2 rounded-full mb-8"
      ref={sliderTrackRef}
    >
      {/* Slider Track Background */}
      <div className="absolute inset-0 rounded-full bg-gray-700"></div>
      
      {/* Active Slider Track */}
      <div 
        className="absolute h-full bg-purple-500 rounded-full"
        style={{ 
          left: `${sliderPosition.left}%`, 
          right: `${100 - sliderPosition.right}%` 
        }}
      ></div>
      
      {/* Left Thumb */}
      <div 
        className="absolute w-6 h-6 bg-white rounded-full -mt-2 -ml-3 cursor-pointer shadow-lg"
        style={{ left: `${sliderPosition.left}%` }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDragging('left');
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsDragging('left');
        }}
      ></div>
      
      {/* Right Thumb */}
      <div 
        className="absolute w-6 h-6 bg-white rounded-full -mt-2 -ml-3 cursor-pointer shadow-lg"
        style={{ left: `${sliderPosition.right}%` }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDragging('right');
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsDragging('right');
        }}
      ></div>
    </div>
  );
};

export default PriceRangeSlider; 