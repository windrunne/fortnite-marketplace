import { mockProducts } from '@/app/data/mockProducts';
import { Product } from '../../types';

// Simulated database or API service
// In a real app, this would connect to your database
let productsData: Product[] = [...mockProducts];

// Get all products with error handling
export async function getProducts() {
  try {
    // In a real app, you would fetch from a database or external API
    // Simulate network delay for demonstration
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { 
      products: productsData,
      error: null
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { 
      products: null, 
      error: 'Failed to fetch products. Please try again later.' 
    };
  }
}

// Get a single product by ID
export async function getProductById(id: string) {
  try {
    // In a real app, you would fetch from a database or external API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const product = productsData.find(p => p.id === id);
    
    if (!product) {
      return { 
        product: null, 
        error: 'Product not found' 
      };
    }
    
    return { 
      product, 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { 
      product: null, 
      error: 'Failed to fetch product. Please try again later.' 
    };
  }
}

// Add a new product with validation
export async function addProduct(productData: Omit<Product, 'id'>) {
  try {
    // Server-side validation
    if (!productData.title || !productData.description) {
      return { 
        product: null, 
        error: 'Title and description are required' 
      };
    }
    
    if (!productData.originalPrice || !productData.discountedPrice) {
      return { 
        product: null, 
        error: 'Price information is required' 
      };
    }
    
    if (productData.originalPrice < 0 || productData.discountedPrice < 0) {
      return { 
        product: null, 
        error: 'Prices cannot be negative' 
      };
    }
    
    // Generate ID - in a real app, this would be done by the database
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    
    // Add to our "database"
    productsData.push(newProduct);
    
    return { 
      product: newProduct, 
      error: null 
    };
  } catch (error) {
    console.error('Error adding product:', error);
    return { 
      product: null, 
      error: 'Failed to add product. Please try again later.' 
    };
  }
} 