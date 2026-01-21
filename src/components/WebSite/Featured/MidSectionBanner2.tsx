'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function MidSectionBanner2() {
  return (
    <section className="relative py-16 font-sans flex items-end justify-end">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/banner/mb5.jpg"
          alt="Mid Section Banner 2 Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
      </div>

      {/* Content - Right aligned */}
      <div className="relative z-10 max-w-xl p-2 mr-32 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="text-right text-white space-y-6 max-w-2xl ">
          <h2 className="text-4xl md:text-5xl text-[#00653a] font-bold leading-tight">
            New Collection
            <span className="block text-[#00b272]">Fresh Arrivals</span>
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            Discover the latest trends and must-have items. Be the first to explore our newest collection of premium products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link 
              href="/products?filter=new"
              className="inline-block bg-linear-to-r from-green-400 to-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold text-center"
            >
              Explore New
            </Link>
            <Link 
              href="/categories"
              className="inline-block bg-white text-[#00b272] px-8 py-4 rounded-lg  hover:bg-[#00653a] hover:text-white transition-colors font-semibold text-center"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
