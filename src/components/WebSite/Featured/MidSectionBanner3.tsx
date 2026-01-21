'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function MidSectionBanner3() {
  return (
    <section className="relative py-16 font-sans">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/banner/mb7.jpg"
          alt="Mid Section Banner 3 Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-35"></div> */}
      </div>

      {/* Content - Center aligned */}
      <div className="relative z-10 max-w-xl p-2 md:ml-32 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="text-left text-white space-y-6 max-w-2xl">
          <h2 className="text-4xl text-[#75aadb] md:text-5xl font-bold leading-tight">
            Premium Quality
            <span className="block text-[#3a75c4]">Guaranteed</span>
          </h2>
          <p className="text-xl text-gray-100 leading-relaxed">
            Experience excellence with our carefully curated selection of premium products. Quality you can trust, service you can rely on.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Link 
              href="/products?filter=premium"
              className="inline-block bg-linear-to-r from-blue-400 to-blue-500  text-white px-8 py-4 rounded-lg transition-colors font-semibold text-center"
            >
              Premium Products
            </Link>
            <Link 
              href="/about"
              className="inline-block bg-white text-[#75aadb] px-8 py-4 rounded-lg hover:bg-[#3a75c4] hover:text-white transition-colors font-semibold text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
