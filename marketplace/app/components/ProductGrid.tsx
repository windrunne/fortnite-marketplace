import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { FiChevronDown } from 'react-icons/fi';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  isLoading, 
  sortBy, 
  onSortChange 
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="text-white">
          <span className="text-gray-400 text-sm">{products.length} accounts</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-gray-400 mr-2 text-sm">Sort by:</span>
          <div className="relative">
            <button className="bg-transparent text-white flex items-center text-sm font-medium">
              <span className="mr-1">{sortBy}</span>
              <FiChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 