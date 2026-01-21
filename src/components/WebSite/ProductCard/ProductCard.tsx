'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/components/mockData/products';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white font-sans rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-sm font-semibold">
            {product.discount}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-sm">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium">{product.category}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p> */}
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>
        
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                {product.discount && (
                  <span className="text-xs bg-[#1A2830] text-white px-2 py-1 rounded-md font-semibold">
                    Save {product.discount}%
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 font-medium bg-gray-100 text-gray-600 text-base rounded-md"
            >
              {tag}
            </span>
          ))}
        </div> */}
        
        <div className="flex flex-row space-x-2 mt-auto">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-linear-to-r from-gray-800 to-gray-700 text-white py-2 px-4 rounded hover:bg-amber-700 transition-colors text-center text-sm font-medium"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
