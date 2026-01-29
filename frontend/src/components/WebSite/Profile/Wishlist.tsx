"use client"

import { Heart, ShoppingCart, Trash2, Star, Eye } from 'lucide-react'
import { products } from '@/components/mockData/products'

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
  category: string
  addedDate: string
}

export default function Wishlist() {
  const wishlistItems: WishlistItem[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.images[0],
    rating: product.rating,
    reviews: product.reviews,
    inStock: product.inStock,
    category: product.category,
    addedDate: new Date().toISOString().split('T')[0]
  }))

  const removeFromWishlist = (itemId: string) => {
    // Handle remove from wishlist
    console.log('Remove item:', itemId)
  }

  const addToCart = (itemId: string) => {
    // Handle add to cart
    console.log('Add to cart:', itemId)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-slate-300'
        }`}
      />
    ))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-gray-500" />
        <h2 className="text-xl font-bold text-slate-900">My Wishlist</h2>
        <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-1 rounded-full">
          {wishlistItems.length} items
        </span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Your wishlist is empty</h3>
          <p className="text-slate-600 mb-6">Save items you love to your wishlist</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                {item.originalPrice && (
                  <div className="absolute top-3 left-3 bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Sale
                  </div>
                )}
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{item.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-sm text-slate-600">
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-slate-900">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">${item.originalPrice}</span>
                  )}
                </div>

                {/* Added Date */}
                <p className="text-xs text-slate-500 mb-4">
                  Added on {new Date(item.addedDate).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item.id)}
                    disabled={!item.inStock}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wishlist Actions */}
      {wishlistItems.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-sm text-slate-600">
              {wishlistItems.filter(item => item.inStock).length} of {wishlistItems.length} items in stock
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                Clear Wishlist
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add All to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
