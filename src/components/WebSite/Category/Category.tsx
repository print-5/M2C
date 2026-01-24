'use client';

import Link from 'next/link';
import Image from 'next/image';

const categories = [
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

];

export default function Category() {
  const categoryCount = categories.length;
  const maxColumns = Math.min(categoryCount, 4); // Maximum 4 columns, but adjust if fewer categories
  
  // Dynamic grid class based on category count
  const getGridClass = () => {
    if (maxColumns <= 2) return "grid-cols-1 md:grid-cols-2 items-center justify-center mx-auto";
    if (maxColumns === 3) return "grid-cols-2 md:grid-cols-3 items-center justify-center mx-auto";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-3";
  };

  return (
    <section className="py-16 bg-white font-sans">
      <div className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div className="text-start flex-1">
            <h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-[#313131] mb-2 md:mb-3">Shop by Category</h2>
            <p className="text-sm sm:text-sm md:text-base lg:text-lg text-gray-500 max-w-full lg:max-w-2xl xl:max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              Explore our carefully curated collection of traditional textiles, organized by category
            </p>
          </div>

          {/* View All Categories Button */}
          <div className="ml-8">
            <Link 
              href="/categories"
              className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold whitespace-nowrap"
            >
              View All Categories
            </Link>
          </div>
        </div>

        <div className={`grid ${getGridClass()} gap-6 items-center justify-center mx-auto`}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group text-center"
            >
              {/* Category Image */}
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-md">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Name */}
              <h3 className="text-base font-semibold text-gray-700 group-hover:text-[#696a6c] transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
