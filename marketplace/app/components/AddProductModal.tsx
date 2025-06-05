import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Product } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: '',
    description: '',
    originalPrice: 99.99,
    discountedPrice: 89.99,
    discountPercentage: 13,
    imageUrl: '/images/product-placeholder.png',
    vendorName: 'VENDORNAME',
    features: {
      instant: true,
      rare: true,
      platforms: ['All Platforms']
    },
    isCertified: true,
    hasVideo: true,
    isInstant: true,
    rarity: 'Rare',
    platforms: ['All Platforms']
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.originalPrice || formData.originalPrice <= 0) {
      newErrors.originalPrice = 'Valid price is required';
    }
    
    if (!formData.discountedPrice || formData.discountedPrice <= 0) {
      newErrors.discountedPrice = 'Valid discounted price is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    onAddProduct(formData);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      originalPrice: 99.99,
      discountedPrice: 89.99,
      discountPercentage: 13,
      imageUrl: '/images/product-placeholder.png',
      vendorName: 'VENDORNAME',
      features: {
        instant: true,
        rare: true,
        platforms: ['All Platforms']
      },
      isCertified: true,
      hasVideo: true,
      isInstant: true,
      rarity: 'Rare',
      platforms: ['All Platforms']
    });
    setErrors({});
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-white text-xl font-bold">Add New Product</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={3}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-400 mb-1">Original Price ($)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
            </div>
            
            <div>
              <label className="block text-gray-400 mb-1">Discounted Price ($)</label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {errors.discountedPrice && <p className="text-red-500 text-sm mt-1">{errors.discountedPrice}</p>}
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-800 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal; 