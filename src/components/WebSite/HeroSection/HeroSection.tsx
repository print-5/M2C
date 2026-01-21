'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: "Luxurious Bath Towels,",
    subtitle: " Ultimate Comfort",
    description: "Experience unparalleled softness and absorbency with our premium cotton bath towels. Crafted for durability and designed for everyday luxury in your bathroom.",
    image: "/assets/images/hero/nhs01.jpg",
    alt: "Premium cotton bath towels",
    primaryButton: { text: "Shop Bath Towels", href: "/products?category=bath-towels" },
    secondaryButton: { text: "View Collection", href: "/categories/bath-linen" }
  },
  {
    id: 2,
    title: "Kitchen Aprons,",
    subtitle: " Style & Protection",
    description: "Protect your clothes in style with our beautifully crafted kitchen aprons. Perfect for cooking enthusiasts who value both functionality and fashion in their culinary adventures.",
    image: "/assets/images/hero/hs3.jpg",
    alt: "Stylish kitchen aprons for cooking",
    primaryButton: { text: "Shop Aprons", href: "/products?category=kitchen-aprons" },
    secondaryButton: { text: "Custom Orders", href: "/contact" }
  },
  {
    id: 3,
    title: "Kitchen Towels,",
    subtitle: " Absorbent & Durable",
    description: "Discover our premium kitchen towels designed for superior absorbency and long-lasting performance. Made from high-quality materials for all your kitchen cleaning needs.",
    image: "/assets/images/hero/nhs03.webp",
    alt: "Premium kitchen towels for cooking",
    primaryButton: { text: "Shop Kitchen Towels", href: "/products?category=kitchen-towels" },
    secondaryButton: { text: "View All Towels", href: "/categories/kitchen-linen" }
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

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative bg-blue-50 font-sans overflow-hidden">
      <div className="max-w-480">
        {/* Hero Content */}
        <div className="relative min-h-190 flex items-center rounded-sm shadow-md border-2 border-white overflow-hidden">
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
                className="object-contain rounded-sm"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-lg"></div>

          {/* Content Container */}
          <div className="relative z-10 w-full flex items-center px-16">
            {/* All slides: Text on left side */}
            <div className="w-1/2 h-96 p-8 ml-4 rounded-2xl backdrop-blur-md bg-black/20 border border-white/20">
              <h1 className="text-4xl lg:text-6xl font-sans font-bold text-white mb-6 leading-tight">
                {currentSlideData.title}
                <span className="text-amber-400 block">{currentSlideData.subtitle}</span> 
              </h1>
              <p className="text-lg font-medium text-gray-100 mb-8 leading-relaxed">
                {currentSlideData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={currentSlideData.primaryButton.href}
                  className="bg-linear-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold text-center shadow-xl transform hover:scale-105"
                >
                  {currentSlideData.primaryButton.text}
                </Link>
                <Link 
                  href={currentSlideData.secondaryButton.href}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-center backdrop-blur-sm transform hover:scale-105"
                >
                  {currentSlideData.secondaryButton.text}
                </Link>
              </div>
            </div>
            {/* Right side space for image visibility */}
            <div className="flex-1">
              {/* This space allows the background image to be visible */}
            </div>
          </div>

          {/* Navigation Controls - On the Slide */}
          {/* Left Navigation Arrow - Hidden on first slide */}
          <button
            onClick={prevSlide}
            className={`absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 text-gray-800 hover:bg-white hover:text-amber-600 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm ${
              currentSlide === 0 ? 'hidden' : 'block'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow - Hidden on last slide */}
          <button
            onClick={nextSlide}
            className={`absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 text-gray-800 hover:bg-white hover:text-amber-600 p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm ${
              currentSlide === heroSlides.length - 1 ? 'hidden' : 'block'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
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
          </div>
        
        </div>
      </div>
    </section>
  );
}
