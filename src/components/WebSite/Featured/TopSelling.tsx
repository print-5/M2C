'use client';
import Link from 'next/link';
import ProductCard from '@/components/WebSite/ProductCard/ProductCard';
import { products } from '@/components/mockData/products';

export default function TopSelling() {
  // Sort by number of reviews (descending) to get top selling products
  const topSellingProducts = products
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 4);

  return (
    <section className="bg-gray-50 py-16 font-sans">
      <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-12">
          <div className="text-start flex-1">
            <h2 className="text-3xl font-bold text-[#1A2830]">Top Selling Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Most popular items loved by our customers, proven by sales and reviews
            </p>
          </div>
          <div className="ml-8">
            <Link 
              href="/products"
              className="inline-block bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold whitespace-nowrap"
            >
              View All Products
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
