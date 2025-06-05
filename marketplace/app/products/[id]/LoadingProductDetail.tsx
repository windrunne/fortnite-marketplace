import React from 'react';

const LoadingProductDetail: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      {/* Product Image Skeleton */}
      <div className="aspect-square bg-gray-800 rounded-lg"></div>
      
      {/* Product Info Skeleton */}
      <div>
        <div className="h-4 bg-gray-800 rounded w-1/4 mb-2"></div>
        <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-2/3 mb-6"></div>
        
        <div className="h-10 bg-gray-800 rounded w-1/3 mb-6"></div>
        
        <div className="border-t border-gray-800 py-4 mb-6">
          <div className="h-6 bg-gray-800 rounded w-1/4 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-4 bg-gray-800 rounded w-3/5"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
          </div>
        </div>
        
        <div className="h-12 bg-gray-800 rounded-full w-full"></div>
      </div>
    </div>
  );
};

export default LoadingProductDetail; 