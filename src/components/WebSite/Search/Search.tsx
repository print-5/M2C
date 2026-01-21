'use client';

import { useState, useEffect, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { products, categories } from '@/components/mockData/products';
import { Search as SearchIcon, Filter, X, Loader, ChevronDown } from 'lucide-react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
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

  // Simulate search delay
  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      const matchesPrice = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseFloat(priceRange.max));
      
      return matchesSearch && matchesCategory && matchesPrice;
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
          return a.name.localeCompare(b.name);
        case 'relevance':
        default:
          // Simple relevance: prioritize name matches over description matches
          const aNameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
          const bNameMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          return a.name.localeCompare(b.name);
      }
    });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange({ min: '', max: '' });
    setSortBy('relevance');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || priceRange.min || priceRange.max;

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#3a75c4] mb-6">
              Search Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find the perfect handcrafted textiles from our collection of authentic artisan products.
            </p>
            
            {/* Main Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for products or materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
              {isLoading && (
                <Loader className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 animate-spin" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <Filter className="w-5 h-5" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-amber-600 text-white text-xs rounded-full px-2 py-1">
                    Active
                  </span>
                )}
              </button>
            </div>

            {/* Desktop Filters */}
            <div className={`flex flex-col lg:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              {/* Category Filter */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="inline-flex items-center justify-between w-48 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSelectedCategory('All');
                          setShowCategoryDropdown(false);
                        }}
                        className={`block w-full px-4 py-2 text-sm text-left ${selectedCategory === 'All' ? 'bg-amber-50 text-amber-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        All Categories
                      </button>
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryDropdown(false);
                          }}
                          className={`block w-full px-4 py-2 text-sm text-left ${selectedCategory === category ? 'bg-amber-50 text-amber-800' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Price:</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-20 border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-20 border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Sort */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="inline-flex items-center justify-between w-48 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {sortBy === 'relevance' && 'Relevance'}
                  {sortBy === 'name' && 'Name'}
                  {sortBy === 'price-low' && 'Price: Low to High'}
                  {sortBy === 'price-high' && 'Price: High to Low'}
                  {sortBy === 'rating' && 'Highest Rated'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showSortDropdown && (
                  <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="py-1">
                      {[
                        { value: 'relevance', label: 'Relevance' },
                        { value: 'name', label: 'Name' },
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
                          className={`block w-full px-4 py-2 text-sm text-left ${sortBy === option.value ? 'bg-amber-50 text-amber-800' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              {isLoading ? (
                'Searching...'
              ) : (
                `${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} found`
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-amber-600" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <SearchIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? `No results found for "${searchTerm}"` : 'No products found'}
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Search Summary */}
              {searchTerm && (
                <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                  <p className="text-amber-800">
                    Showing results for <span className="font-semibold">"{searchTerm}"</span>
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  </p>
                </div>
              )}

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Popular Searches */}
      {!searchTerm && (
        <section className="py-16 bg-white">
          <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Searches</h2>
              <p className="text-gray-600">Discover what others are looking for</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {['handwoven', 'cotton', 'kitchen towels', 'organic', 'traditional', 'bamboo', 'linen', 'artisan'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;
