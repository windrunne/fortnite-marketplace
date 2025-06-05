import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getProducts, getProductById, addProduct } from './service';
import { Product } from '../../types';

// Schema for product validation
const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  originalPrice: z.number().positive("Original price must be positive"),
  discountedPrice: z.number().positive("Discounted price must be positive"),
  discountPercentage: z.number().min(0, "Discount percentage cannot be negative"),
  imageUrl: z.string().url("Image URL must be valid"),
  vendorName: z.string().min(1, "Vendor name is required"),
  features: z.object({
    instant: z.boolean(),
    rare: z.boolean(),
    platforms: z.array(z.string())
  }),
  isCertified: z.boolean(),
  hasVideo: z.boolean(),
  isInstant: z.boolean(),
  rarity: z.string(),
  platforms: z.array(z.string())
});

// GET handler for fetching all products
export async function GET() {
  try {
    const { products, error } = await getProducts();
    
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

// POST handler for adding a new product with validation
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the input
    const validationResult = productSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Return validation errors
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors 
        }, 
        { status: 400 }
      );
    }
    
    // Add the product using our service
    const { product, error } = await addProduct(validationResult.data);
    
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error in POST /api/products:', error);
    
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

// GET handler for a specific product by ID
export async function getProductRoute(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' }, 
        { status: 400 }
      );
    }
    
    const { product, error } = await getProductById(id);
    
    if (error) {
      return NextResponse.json(
        { error }, 
        { status: error === 'Product not found' ? 404 : 500 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error(`Error in GET /api/products/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
} 