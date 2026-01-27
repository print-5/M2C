'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: "/assets/images/hero/hs1.webp",
    alt: "Hero slide 1"
  },
  {
    id: 2,
    image: "/assets/images/hero/hs2.webp",
    alt: "Hero slide 2"
  },
  {
    id: 3,
    image: "/assets/images/hero/hs3.webp",
    alt: "Hero slide 3"
  },
  {
    id: 4,
    image: "/assets/images/hero/hs4.webp",
    alt: "Hero slide 4"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Changed from 180000 (3 minutes) to 5000 (5 seconds)

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && currentSlide > 0) {
        prevSlide();
      } else if (event.key === 'ArrowRight' && currentSlide < heroSlides.length - 1) {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isAutoPlaying]);

  // Pause auto-play on hover (desktop only)
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section 
      className="relative bg-blue-50 font-sans overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Hero image carousel"
    >
      <div className="w-full">
        {/* Hero Content */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] flex items-center overflow-hidden">
          {/* Background Images */}
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={index !== currentSlide}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}

          {/* Navigation Controls */}
          {/* Left Navigation Arrow - Hidden on first slide */}
          <button
            onClick={prevSlide}
            className={`absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 text-gray-800 hover:bg-white hover:text-gray-700 p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${
              currentSlide === 0 ? 'hidden' : 'block'
            }`}
            aria-label="Previous slide"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Right Navigation Arrow - Hidden on last slide */}
          <button
            onClick={nextSlide}
            className={`absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 text-gray-800 hover:bg-white hover:text-gray-700 p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${
              currentSlide === heroSlides.length - 1 ? 'hidden' : 'block'
            }`}
            aria-label="Next slide"
            disabled={currentSlide === heroSlides.length - 1}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Slide Indicators */}
          {/* <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${
                  index === currentSlide 
                    ? 'bg-amber-400 scale-125' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? 'true' : 'false'}
              />
            ))}
          </div> */}

          {/* Auto-play control button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 z-20 bg-white/90 text-gray-800 hover:bg-white hover:text-gray-700 p-2 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 hidden sm:block"
            aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isAutoPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Touch/Swipe Area for Mobile */}
          <div 
            className="absolute inset-0 z-10 md:hidden"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const startX = touch.clientX;
              
              const handleTouchEnd = (endEvent: TouchEvent) => {
                const endTouch = endEvent.changedTouches[0];
                const endX = endTouch.clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Minimum swipe distance
                  if (diff > 0 && currentSlide < heroSlides.length - 1) {
                    nextSlide();
                  } else if (diff < 0 && currentSlide > 0) {
                    prevSlide();
                  }
                }
                
                document.removeEventListener('touchend', handleTouchEnd);
              };
              
              document.addEventListener('touchend', handleTouchEnd);
            }}
          />

          {/* Screen reader announcements */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Slide {currentSlide + 1} of {heroSlides.length}
          </div>
        </div>
      </div>
    </section>
  );
}
