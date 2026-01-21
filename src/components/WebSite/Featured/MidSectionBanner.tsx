'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function MidSectionBanner() {
  return (
    <section className="relative py-16 font-sans">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/banner/mb2.jpg"
          alt="Mid Section Banner Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl md:ml-32 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="text-left text-white space-y-6 max-w-2xl">
          <h2 className="text-4xl md:text-5xl text-[#75aadb] font-bold leading-tight">
            Special Offer
            <span className="block text-[#3a75c4]">Up to 50% Off</span>
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            Don't miss out on our biggest sale of the season! Get amazing discounts on premium products from top brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/products"
              className="inline-block bg-linear-to-r from-blue-400 to-blue-500 text-white px-8 py-4 rounded-lg transition-colors font-semibold text-center"
            >
              Shop Now
            </Link>
            <Link 
              href="/categories"
              className="inline-block bg-white text-[#75aadb] px-8 py-4 rounded-lg hover:bg-[#3a75c4] hover:text-white transition-colors font-semibold text-center"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
