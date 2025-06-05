import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { getProductById } from '../../api/products/service';
import Header from '../../components/Header';
import ErrorDisplay from '../../components/ErrorDisplay';
import LoadingProductDetail from './LoadingProductDetail';

// Define the props for the page component
interface ProductPageProps {
  params: {
    id: string;
  };
}

// Static metadata for the page
export const metadata = {
  title: 'Product Details | Marketplace',
  description: 'View detailed information about this product',
};

// This page uses SSR by default in Next.js App Router
export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch the product data server-side
  const { product, error } = await getProductById(params.id);
  
  // If the product is not found, return a 404 page
  if (error === 'Product not found') {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-white hover:text-purple-400 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to products
        </Link>
        
        <Suspense fallback={<LoadingProductDetail />}>
          {error ? (
            <ErrorDisplay message={error} />
          ) : product ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
                {product.imageUrl && (
                  <Image 
                    src={product.imageUrl} 
                    alt={product.title} 
                    fill
                    priority
                    className="object-cover"
                  />
                )}
                
                {product.isCertified && (
                  <div className="absolute top-4 left-4 bg-cyan-accent text-black font-medium text-xs px-3 py-1 rounded-full">
                    Certified
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div>
                <div className="text-purple-400 text-sm uppercase font-medium mb-2">
                  {product.vendorName}
                </div>
                
                <h1 className="text-white text-3xl font-bold mb-4">
                  {product.title}
                </h1>
                
                <p className="text-gray-300 mb-6">
                  {product.description}
                </p>
                
                <div className="flex items-center mb-6">
                  {product.originalPrice > product.discountedPrice && (
                    <span className="text-gray-400 line-through text-lg mr-3">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-green-accent font-bold text-3xl">
                    ${product.discountedPrice.toFixed(2)}
                  </span>
                  
                  {product.discountPercentage > 0 && (
                    <span className="ml-3 bg-green-accent text-black font-medium text-sm px-3 py-1 rounded-full">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                </div>
                
                <div className="border-t border-gray-800 py-4 mb-6">
                  <h3 className="text-white font-medium mb-3">Features</h3>
                  <ul className="space-y-2">
                    {product.isInstant && (
                      <li className="text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Instant Delivery
                      </li>
                    )}
                    <li className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Rarity: {product.rarity}
                    </li>
                    <li className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Platforms: {product.platforms.join(', ')}
                    </li>
                    {product.hasVideo && (
                      <li className="text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Video Preview Available
                      </li>
                    )}
                  </ul>
                </div>
                
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-purple-600/20 flex items-center justify-center">
                  <FiShoppingCart className="mr-2" size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              Loading product data...
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
} 