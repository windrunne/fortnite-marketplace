// Implement server component with client components for interactive parts
import { Suspense } from 'react';
import Header from './components/Header';
import ClientPageContent from './components/ClientPageContent';
import { getProducts } from './api/products/service';
import LoadingProductGrid from './components/LoadingProductGrid';

// This page uses SSR by default in Next.js App Router
export default async function Home() {
  // Fetch products server-side
  const { products, error } = await getProducts();
  
  return (
    <main className="min-h-screen bg-black max-w-[1400px] mx-auto">
      <Header />
      
      <Suspense fallback={<LoadingProductGrid />}>
        <ClientPageContent initialProducts={products || []} serverError={error} />
      </Suspense>
    </main>
  );
}
