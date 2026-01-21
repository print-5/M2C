'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'towels',
    name: 'Towels',
    image: '/assets/images/categories/c1.jpg'
  },
  {
    id: 'kitchen-linen',
    name: 'Kitchen Linen',
    image: '/assets/images/categories/c2.jpg'
  },
  {
    id: 'bath-linen',
    name: 'Bath Linen',
    image: '/assets/images/categories/c3.jpg'
  },
  {
    id: 'table-linen',
    name: 'Table Linen',
    image: '/assets/images/categories/c4.jpg'
  },
  {
    id: 'cotton-jute-bags',
    name: 'Cotton & Jute Bags',
    image: '/assets/images/categories/c5.jpg'
  },
  {
    id: 'pillow-covers',
    name: 'Pillow & Covers',
    image: '/assets/images/categories/c6.jpg'
  },
  {
    id: 'non-terry-towels',
    name: 'Non Terry Towels',
    image: '/assets/images/categories/c7.jpg'
  }
];

const Category = () => {
  const pathname = usePathname();

  const isActiveCategory = (categoryId: string) => {
    return pathname.includes(categoryId);
  };

  return (
    <div className="bg-white shadow-sm">

      <div className="max-w-7xl xl:max-w-420 mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="h-12 flex items-center justify-center mx-auto overflow-x-auto scrollbar-hide">
          
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 shrink-0 ${
                isActiveCategory(category.id)
                  ? 'text-white bg-[#222222] shadow-sm text-lg font-semibold transform scale-105'
                  : 'text-[#444444] hover:text-white hover:bg-[#212121] text-base'
              }`}
            >
              {category.name}
            </Link>
          ))}

          {/* <Link
            href="/categories"
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-200 shrink-0 ${
              pathname === '/categories'
                ? 'text-white bg-[#222222] shadow-sm text-lg font-semibold'
                  : 'text-[#444444] hover:text-white hover:bg-[#212121] text-sm'
            }`}
          >
            All Categories
          </Link> */}

          {categories.length > 8 && (
            <Link
              href="/categories"
              className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base text-[#330b03] hover:text-[#3c2415] hover:bg-[#ddd9ce] whitespace-nowrap transition-all duration-200 shrink-0"
            >
              More
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
