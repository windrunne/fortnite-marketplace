import React, { useId } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating?: number;  // Rating out of 5
  showText?: boolean;
  reviewCount?: number;
  className?: string;
  size?: 'sm' | 'md';
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 4.5,
  showText = true,
  reviewCount = 1299,
  className = '',
  size = 'md'
}) => {
  // Calculate full and partial stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Determine star size based on prop
  const starSize = size === 'sm' ? 12 : 16;
  const starGap = size === 'sm' ? 'gap-0.5' : 'gap-1';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  
  // Star styling
  const fullStarBg = 'bg-[#00b67a]'; // Trustpilot green
  const emptyStarBg = 'bg-gray-400';
  
  return (
    <div className={`flex items-center ${className}`}>
      {showText && (
        <span className={`text-white font-medium mr-2 ${textSize}`}>Excellent</span>
      )}
      
      <div className={`flex items-center ${starGap}`}>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <div 
            key={`full-${i}`} 
            className={`relative rounded ${fullStarBg} p-1`}
            style={{ width: starSize, height: starSize }}
          >
            <FaStar className="text-white absolute inset-0 m-auto" size={starSize * 0.7} />
          </div>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div 
            key="half-star"
            className="relative flex rounded"
            style={{ width: starSize, height: starSize }}
          >
            <div className={`w-1/2 h-full ${fullStarBg} rounded-l`}></div>
            <div className={`w-1/2 h-full ${emptyStarBg} rounded-r`}></div>
            <FaStar className="text-white absolute inset-0 m-auto" size={starSize * 0.7} />
          </div>
        )}
        
        {/* Empty stars */}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <div 
            key={`empty-${i}`} 
            className={`relative rounded ${emptyStarBg} p-1`}
            style={{ width: starSize, height: starSize }}
          >
            <FaStar className="text-white absolute inset-0 m-auto" size={starSize * 0.7} />
          </div>
        ))}
      </div>
      
      {showText && reviewCount && (
        <>
          <span className={`ml-2 text-gray-300 ${textSize}`}>{reviewCount.toLocaleString()} reviews</span>
          <span className='md:block hidden'>{' '}on</span>
          <span className={`ml-1 md:block hidden text-white font-medium ${textSize}`}>Trustpilot</span>
        </>
      )}
    </div>
  );
};

export default StarRating; 