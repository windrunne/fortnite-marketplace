'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchFilter from './SearchFilter';
import FilterTags from './FilterTags';
import ProductGrid from './ProductGrid';
import AddProductModal from './AddProductModal';
import MobileFilterModal from './MobileFilterModal';
import MobileSearchButton from './MobileSearchButton';
import HeroBanner from './HeroBanner';
import ErrorDisplay from './ErrorDisplay';
import { Product, FilterState } from '../types';
import { FiChevronRight, FiPlus, FiSliders } from 'react-icons/fi';

interface ClientPageContentProps {
  initialProducts: Product[];
  serverError: string | null;
}

export default function ClientPageContent({ initialProducts, serverError }: ClientPageContentProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(serverError);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('Recommended');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: {
      min: 5,
      max: 10976
    },
    deliverySpeed: 'Select',
    certifiedVideo: false
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Refresh products when needed
  const refreshProducts = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      const response = await axios.get('/api/products');
      
      if (response.status !== 200) {
        throw new Error('Failed to fetch products');
      }
      
      setProducts(response.data);
      setIsRefreshing(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh products';
      setError(errorMessage);
      setIsRefreshing(false);
    }
  };

  // Apply filters when filters or products change
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.title.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      product => 
        product.discountedPrice >= filters.priceRange.min && 
        product.discountedPrice <= filters.priceRange.max
    );

    // Apply certified video filter
    if (filters.certifiedVideo) {
      filtered = filtered.filter(product => product.isCertified && product.hasVideo);
    }

    // Apply tag filter
    if (selectedTag) {
      const tagLower = selectedTag.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.title.toLowerCase().includes(tagLower) || 
          product.description.toLowerCase().includes(tagLower)
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products, selectedTag]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    
    let sorted = [...filteredProducts];
    
    if (newSortBy === 'Price: Low to High') {
      sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (newSortBy === 'Price: High to Low') {
      sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }
    
    setFilteredProducts(sorted);
  };

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post('/api/products', newProduct);
      
      if (response.status !== 200) {
        throw new Error(response.data.error || 'Failed to add product');
      }
      
      setProducts([...products, response.data]);
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to add product. Please try again later.';
      
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner
        title="Fortnite Accounts"
        description="Get a premium Fortnite account featuring rare original skins."
        reviewCount={1299}
        rating={4.5}
      />
      
      <div className="px-4 py-8">
        <div className="mt-6">
          {/* Desktop Search Filter */}
          <div className="hidden md:block">
            <SearchFilter onFilterChange={handleFilterChange} initialFilters={filters} />
          </div>
          
          {/* Mobile Search Button */}
          <div className="md:hidden">
            <MobileSearchButton onClick={() => setIsMobileFilterOpen(true)} />
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex-1 overflow-x-auto">
            <FilterTags onTagSelect={handleTagSelect} selectedTag={selectedTag} />
          </div>

          <button 
            className="flex-shrink-0 hidden md:flex border border-gray-600 text-white rounded-full p-2 flex items-center justify-center shadow-lg shadow-purple-600/20"
            onClick={refreshProducts}
            disabled={isRefreshing}
          >
            <FiChevronRight size={20} className={isRefreshing ? "animate-spin" : ""} />
          </button>
          
          <button className="whitespace-nowrap hidden md:flex border border-gray-600 px-4 py-2 rounded-full text-white hover:bg-gray-700 flex items-center transition-all duration-200">
            <FiSliders className="mr-1.5" size={14} />
            <span className="text-sm font-medium">Filters</span>
          </button>
          
          <button 
            className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 flex items-center justify-center shadow-lg shadow-purple-600/20"
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus size={20} />
          </button>
        </div>
        
        <div className="mt-8">
          {error ? (
            <ErrorDisplay 
              message={error} 
              onRetry={refreshProducts}
            />
          ) : (
            <ProductGrid 
              products={filteredProducts} 
              isLoading={isLoading || isRefreshing} 
              sortBy={sortBy} 
              onSortChange={handleSortChange} 
            />
          )}
        </div>
      </div>
      
      {/* Modals */}
      <AddProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
      
      <MobileFilterModal 
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        initialFilters={filters}
        onApplyFilters={handleFilterChange}
        totalItems={filteredProducts.length}
      />
    </>
  );
} 