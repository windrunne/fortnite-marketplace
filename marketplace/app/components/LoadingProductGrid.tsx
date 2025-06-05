import React from 'react';

const LoadingProductGrid: React.FC = () => {
  return (
    <div className="px-4 py-8">
      {/* Hero Banner Skeleton */}
      <div className="w-full h-48 md:h-64 bg-gray-800 animate-pulse rounded-lg mb-8"></div>
      
      {/* Filter Bar Skeleton */}
      <div className="w-full h-12 bg-gray-800 animate-pulse rounded-lg mb-8"></div>
      
      {/* Tags Skeleton */}
      <div className="flex gap-2 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-800 animate-pulse rounded-full"></div>
        ))}
      </div>
      
      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
            {/* Product Image Skeleton */}
            <div className="aspect-[4/3] bg-gray-700"></div>
            
            {/* Product Info Skeleton */}
            <div className="p-4">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-2/5 mb-3"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-700 rounded-full w-16"></div>
                <div className="h-6 bg-gray-700 rounded-full w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingProductGrid; 