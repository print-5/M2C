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
    }, 180000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

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
    <section className="relative bg-blue-50 font-sans overflow-hidden">
      <div className="max-w-full">
        {/* Hero Content */}
        <div className="relative min-h-190 flex items-center overflow-hidden">
          {/* Background Images */}
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Navigation Controls */}
          {/* Left Navigation Arrow - Hidden on first slide */}
          <button
            onClick={prevSlide}
            className={`absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 text-gray-800 hover:bg-white hover:text-gray-700 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm ${
              currentSlide === 0 ? 'hidden' : 'block'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow - Hidden on last slide */}
          <button
            onClick={nextSlide}
            className={`absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 text-gray-800 hover:bg-white hover:text-gray-700 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm ${
              currentSlide === heroSlides.length - 1 ? 'hidden' : 'block'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-amber-400 scale-125' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
