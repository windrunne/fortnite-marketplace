import React from 'react';
import Image from 'next/image';
import StarRating from './ui/StarRating';

interface HeroBannerProps {
  title?: string;
  description?: string;
  reviewCount?: number;
  gameName?: string;
  rating?: number;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "Fortnite Accounts",
  description = "Get a premium Fortnite account featuring rare original skins.",
  reviewCount = 1299,
  gameName = "Fortnite",
  rating = 4.5
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Banner Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/herobannerbg.png"
          alt="Banner Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'right center' }}
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>
      </div>
      
      {/* Desktop Banner Content */}
      <div className="relative z-10 container mx-auto px-4 py-10 md:py-12 lg:py-16">
        <div className="flex flex-row items-start">
          {/* Game Logo/Icon */}
          <div className="block mb-6 md:mb-0 md:mr-6 h-full">
            <div className="relative bg-black rounded-lg p-1.5 w-20 md:w-24 h-24 h-full">
              <img src="/images/cover.png" alt="Fortnite" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Banner Text Content */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">{title}</h1>
            <p className="text-white/80 mb-3 md:mb-4 text-base">{description}</p>
            
            {/* Desktop Star Rating */}
            <StarRating 
              rating={rating} 
              reviewCount={reviewCount} 
              size="md" 
              showText={true} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner; 