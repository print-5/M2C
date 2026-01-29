'use client';

import ProductCard from '../ProductCard/ProductCard';
import Category from '@/components/WebSite/CategoryCopy/Category';
import { products } from '@/components/mockData/products';
import { Search, Filter, Grid, List, ChevronDown, X, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  
  // Filter states
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [selectedNewArrivals, setSelectedNewArrivals] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState('');
  
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Extract unique values for filters
  const availableColors = ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Black', 'Multi'];
  const maxPrice = Math.max(...products.map(p => p.price));

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedColors([]);
    setPriceRange({ min: 0, max: 100 });
    setSelectedNewArrivals('');
    setSelectedRating(0);
    setSelectedDiscount('');
    setSelectedCategory('All');
    setSearchTerm('');
  };

  // Check if product is new arrival
  const isNewArrival = (days: number) => {
    // For demo purposes, we'll consider products with higher ratings as newer
    // In real app, you'd have a createdDate field
    return true; // Simplified for demo
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // Color filter (simplified - in real app you'd have color field)
      const matchesColor = selectedColors.length === 0 || selectedColors.some(color => 
        product.tags.some(tag => tag.toLowerCase().includes(color.toLowerCase()))
      );
      
      // Price filter
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      // New arrivals filter
      const matchesNewArrivals = !selectedNewArrivals || 
        (selectedNewArrivals === '30' && isNewArrival(30)) ||
        (selectedNewArrivals === '90' && isNewArrival(90));
      
      // Rating filter
      const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
      
      // Discount filter
      const matchesDiscount = !selectedDiscount || 
        (selectedDiscount === '10' && product.discount && product.discount >= 10) ||
        (selectedDiscount === '20' && product.discount && product.discount >= 20) ||
        (selectedDiscount === '30' && product.discount && product.discount >= 30) ||
        (selectedDiscount === 'any' && product.discount && product.discount > 0);
      
      return matchesSearch && matchesCategory && matchesColor && matchesPrice && 
             matchesNewArrivals && matchesRating && matchesDiscount;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const activeFiltersCount = selectedColors.length + 
    (selectedNewArrivals ? 1 : 0) + (selectedRating > 0 ? 1 : 0) + (selectedDiscount ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < 100 ? 1 : 0);

  return (
    <div className='font-sans'>
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-8 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Our Product Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover authentic, handcrafted textiles made by skilled artisans using traditional techniques 
              passed down through generations.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white">
        <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>

              {/* Category Filter */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="inline-flex items-center justify-between w-45 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute z-10 w-45 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {['All', 'Kitchen Towels', 'Hand Towels', 'Bath Towels', 'Aprons', 'Table Linens', 'Decorative Textiles'].map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryDropdown(false);
                          }}
                          className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        >
                          {category === 'All' ? 'All Categories' : category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="inline-flex items-center justify-between w-45 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {sortBy === 'name' && 'Sort by Name'}
                  {sortBy === 'price-low' && 'Price: Low to High'}
                  {sortBy === 'price-high' && 'Price: High to Low'}
                  {sortBy === 'rating' && 'Highest Rated'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showSortDropdown && (
                  <div className="absolute z-10 w-45 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {[
                        { value: 'name', label: 'Sort by Name' },
                        { value: 'price-low', label: 'Price: Low to High' },
                        { value: 'price-high', label: 'Price: High to Low' },
                        { value: 'rating', label: 'Highest Rated' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortDropdown(false);
                          }}
                          className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="bg-white py-12">
        <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Left Sidebar Filters */}
            {showFilters && (
              <div className="w-80 shrink-0">
                <div className="bg-gray-100 rounded-lg p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Color Filter */}
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-3">Color</h4>
                      <div className="space-y-2">
                        {availableColors.map((color) => (
                          <label key={color} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedColors.includes(color)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedColors([...selectedColors, color]);
                                } else {
                                  setSelectedColors(selectedColors.filter(c => c !== color));
                                }
                              }}
                              className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{color}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-3">Price Range</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={maxPrice}
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* New Arrivals Filter */}
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-3">New Arrivals</h4>
                      <div className="space-y-2">
                        {[
                          { value: '', label: 'All Products' },
                          { value: '30', label: 'Last 30 days' },
                          { value: '90', label: 'Last 90 days' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center">
                            <input
                              type="radio"
                              name="newArrivals"
                              value={option.value}
                              checked={selectedNewArrivals === option.value}
                              onChange={(e) => setSelectedNewArrivals(e.target.value)}
                              className="border-gray-300 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Review Rating Filter */}
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-3">Customer Reviews</h4>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <label key={rating} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="rating"
                              value={rating}
                              checked={selectedRating === rating}
                              onChange={(e) => setSelectedRating(Number(e.target.value))}
                              className="border-gray-300 text-amber-600 focus:ring-amber-500"
                            />
                            <div className="ml-2 flex items-center">
                              <div className="flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-1 text-sm text-gray-700">& Up</span>
                            </div>
                          </label>
                        ))}
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            value={0}
                            checked={selectedRating === 0}
                            onChange={(e) => setSelectedRating(Number(e.target.value))}
                            className="border-gray-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">All Ratings</span>
                        </label>
                      </div>
                    </div>

                    {/* Discount Filter */}
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-3">Discount</h4>
                      <div className="space-y-2">
                        {[
                          { value: '', label: 'All Products' },
                          { value: 'any', label: 'Any Discount' },
                          { value: '10', label: '10% Off or More' },
                          { value: '20', label: '20% Off or More' },
                          { value: '30', label: '30% Off or More' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="discount"
                              value={option.value}
                              checked={selectedDiscount === option.value}
                              onChange={(e) => setSelectedDiscount(e.target.value)}
                              className="border-gray-300 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                            {option.value && option.value !== 'any' && (
                              <span className="ml-auto text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {option.value}%+
                              </span>
                            )}
                            {option.value === 'any' && (
                              <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Sale
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                    : 'space-y-4'
                }`}>
                  {viewMode === 'grid' ? (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    filteredProducts.map((product) => (
                      <div key={product.id} className="bg-white border-2 border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex gap-4 p-4">
                        {/* Left: Product Image */}
                        <div className="w-64 h-56 shrink-0">
                          <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center group cursor-pointer relative rounded-lg">
                            <img
                              src={Array.isArray(product.images) ? product.images[0] : product.images}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {product.discount && (
                              <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1.5 rounded text-sm font-semibold">
                                {product.discount}% OFF
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Center: Product Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          {/* Header */}
                          <div>
                            <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                            
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-gray-800 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                              {product.description}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">({product.rating})</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.discount && (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                  </span>
                                  <span className="text-xs bg-[#1A2830] text-white font-semibold px-2 py-1 rounded-md">
                                    Save {product.discount}%
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons (Vertical Stack) */}
                        <div className="flex flex-col gap-3 justify-center w-40 shrink-0">
                          <button className="w-full bg-linear-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-semibold py-3 rounded transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                            View Details
                          </button>
                          <button className="w-full bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3 rounded transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <Category />
    </div>
  );
};

export default Products;
