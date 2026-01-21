'use client';
import Link from 'next/link';
import ProductCard from '@/components/WebSite/ProductCard/ProductCard';
import { products } from '@/components/mockData/products';

export default function BestSeller() {
  // Sort by rating (descending) to get best seller products
  const bestSellerProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="bg-white py-16 font-sans">
      <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-12">
          <div className="text-start flex-1">
            <h2 className="text-3xl font-bold text-[#1A2830]">Best Seller Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Highest rated products that have earned our customers' trust and satisfaction
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
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
