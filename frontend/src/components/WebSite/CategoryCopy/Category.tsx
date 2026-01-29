'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Type definitions
interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
   {
    id: 'towels',
    name: 'Towels',
    image: '/assets/images/categories/cs5.jpg'
  },
  {
    id: 'kitchen-linen',
    name: 'Kitchen Linen',
    image: '/assets/images/categories/cs1.jpg'
  },
  {
    id: 'bath-linen',
    name: 'Bath Linen',
    image: '/assets/images/categories/cs7.jpg'
  },
  {
    id: 'table-linen',
    name: 'Table Linen',
    image: '/assets/images/categories/cs3.jpg'
  },
  {
    id: 'cotton-jute-bags',
    name: 'Cotton & Jute Bags',
    image: '/assets/images/categories/cs9.webp'
  },
  {
    id: 'pillow-covers',
    name: 'Pillow & Covers',
    image: '/assets/images/categories/cs4.jpg'
  },
  {
    id: 'bed-linen',
    name: 'Bed Linen',
    image: '/assets/images/categories/cs12.webp'
  },
  {
    id: 'shopping-bags',
    name: 'Shopping Bags',
    image: '/assets/images/categories/cs8.webp'
  },
  {
    id: 'curtains',
    name: 'Curtains',
    image: '/assets/images/categories/cs11.webp'
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    image: '/assets/images/categories/cs10.webp'
  }
];

export default function Category() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Handle image load errors
  const handleImageError = (imageSrc: string) => {
    setImageErrors((prev) => new Set(prev).add(imageSrc));
  };

  // Handle swiper events
  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (swiperRef.current) {
          swiperRef.current.slidePrev();
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (swiperRef.current) {
          swiperRef.current.slideNext();
        }
        break;
      case 'Home':
        event.preventDefault();
        if (swiperRef.current) {
          swiperRef.current.slideTo(0);
        }
        break;
      case 'End':
        event.preventDefault();
        if (swiperRef.current) {
          swiperRef.current.slideTo(categories.length - 1);
        }
        break;
    }
  };

  return (
    <section 
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white font-sans overflow-hidden"
      aria-labelledby="category-heading"
    >
      <div className="max-w-7xl 2xl:max-w-420 mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="text-center lg:text-left flex-1">
            <h2 
              id="category-heading"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#313131] mb-2 sm:mb-3 md:mb-4"
            >
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 max-w-full lg:max-w-3xl xl:max-w-4xl mx-auto lg:mx-0 leading-relaxed">
              Explore our carefully curated collection of traditional textiles, organized by category
            </p>
          </div>

          {/* View All Categories Button */}
          <div className="flex justify-center lg:justify-end lg:ml-8 shrink-0">
            <Link 
              href="/categories"
              className="inline-block bg-gray-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap transform hover:scale-105 active:scale-95 duration-200"
              aria-label="View all categories"
            >
              <span className="hidden sm:inline">View All Categories</span>
              <span className="sm:hidden">View All</span>
            </Link>
          </div>
        </div>

        {/* Categories Swiper */}
        <div className="relative" onKeyDown={handleKeyDown} tabIndex={0} role="region" aria-label="Categories navigation">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={2}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index, className) => {
                return `<span class="${className}" data-index="${index}" aria-label="Go to slide ${index + 1}"></span>`;
              },
            }}
            loop={false}
            watchSlidesProgress={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 7,
                spaceBetween: 32,
              },
              1536: {
                slidesPerView: 8,
                spaceBetween: 36,
              },
            }}
            className="categories-swiper pb-12! sm:pb-16!"
            aria-label="Product categories carousel"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={`${category.id}-${index}`}>
                <Link
                  href={`/categories/${category.id}`}
                  className="group text-center block w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 rounded-xl"
                  aria-label={`Browse ${category.name} category`}
                >
                  {/* Category Image */}
                  <div className="relative w-full aspect-square mb-3 sm:mb-4 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 group-hover:shadow-2xl group-focus:shadow-2xl">
                    {!imageErrors.has(category.image) ? (
                      <Image
                        src={category.image}
                        alt={`${category.name} category image`}
                        fill
                        sizes="(max-width: 480px) 50vw, (max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, (max-width: 1536px) 14vw, 12vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={() => handleImageError(category.image)}
                        loading={index < 4 ? 'eager' : 'lazy'}
                        priority={index < 4}
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-sm font-medium">{category.name}</span>
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded-xl" aria-hidden="true"></div>
                    
                    {/* Hover Effect Ring */}
                    <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-gray-300 group-focus:ring-gray-300 transition-all duration-300" aria-hidden="true"></div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 group-hover:text-[#313131] group-focus:text-[#313131] transition-colors duration-200 px-1 leading-tight line-clamp-2">
                    {category.name}
                  </h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile View All Button (Bottom) */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 lg:hidden">
          <Link 
            href="/categories"
            className="inline-block bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all font-semibold text-sm sm:text-base transform hover:scale-105 active:scale-95 duration-200"
            aria-label="View all categories"
          >
            View All Categories
          </Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .categories-swiper .swiper-pagination {
          bottom: 0 !important;
          position: absolute !important;
        }
        
        .categories-swiper .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          background-color: rgb(209, 213, 219) !important;
          opacity: 0.5 !important;
        }
        
        .categories-swiper .swiper-pagination-bullet:hover {
          opacity: 0.8 !important;
          transform: scale(1.1) !important;
        }
        
        .categories-swiper .swiper-pagination-bullet-active {
          transform: scale(1.2) !important;
          background-color: rgb(31, 41, 55) !important;
          opacity: 1 !important;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Smooth scroll behavior */
        .categories-swiper {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar for touch devices */
        .categories-swiper .swiper-wrapper {
          scroll-snap-type: x mandatory;
        }
        
        .categories-swiper .swiper-slide {
          scroll-snap-align: start;
        }
      `}</style>
    </section>
  );
}
