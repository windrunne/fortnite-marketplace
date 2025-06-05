import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBolt, FaPlay } from 'react-icons/fa';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer">
        {/* Product Image */}
        <div className="relative aspect-[4/3] bg-gradient-to-r from-blue-500 to-purple-500">
          {product.imageUrl && (
            <Image 
              src={product.imageUrl} 
              alt={product.title} 
              fill
              className="object-cover opacity-90"
            />
          )}
          <div className="absolute top-2.5 left-2.5 w-10 h-10 flex items-center justify-center rounded-full bg-black/50">
            <FaPlay className="text-white" size={12} />
          </div>
          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {product.discountPercentage > 0 && (
              <div className="bg-green-accent text-black font-medium text-xs px-3 py-1 rounded-full">
                Save {product.discountPercentage}%
              </div>
            )}
            
            {product.hasVideo && (
              <div className="bg-yellow-accent text-black font-medium text-xs px-3 py-1 rounded-full">
                Video
              </div>
            )}
            
            {product.isCertified && (
              <div className="bg-cyan-accent text-black font-medium text-xs px-3 py-1 rounded-full">
                Certified
              </div>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="text-purple-400 text-xs uppercase font-medium mb-1">{product.vendorName}</div>
          
          <h3 className="text-white font-medium mb-2 truncate">{product.title}</h3>
          
          <div className="flex items-center mb-3">
            {product.originalPrice > product.discountedPrice && (
              <span className="text-gray-400 line-through text-sm mr-2">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-green-accent font-medium text-xl">${product.discountedPrice.toFixed(2)}</span>
          </div>
          
          <div className="text-gray-500 text-xs uppercase mb-3">ACCOUNT</div>
          
          <div className="flex flex-wrap gap-2">
            {product.isInstant && (
              <div className="bg-gray-800 px-3 py-1 rounded-full flex items-center">
                <FaBolt className="text-purple-400 mr-1" size={10} />
                <span className="text-white text-xs">Instant</span>
              </div>
            )}
            
            {product.rarity && (
              <div className="bg-gray-800 px-3 py-1 rounded-full flex items-center">
                <div className={`w-2 h-2 rounded-full ${getRarityColor(product.rarity)} mr-1`}></div>
                <span className="text-white text-xs">{product.rarity}</span>
              </div>
            )}
            
            {product.platforms && product.platforms.length > 0 && (
              <div className="bg-gray-800 px-3 py-1 rounded-full">
                <span className="text-white text-xs">
                  {product.platforms.length > 2 ? 'All Platforms' : product.platforms.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Helper function to get the appropriate color for rarity
function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'common':
      return 'bg-gray-400';
    case 'uncommon':
      return 'bg-green-400';
    case 'rare':
      return 'bg-blue-400';
    case 'epic':
      return 'bg-purple-400';
    case 'legendary':
      return 'bg-yellow-400';
    default:
      return 'bg-gray-400';
  }
}

export default ProductCard; 