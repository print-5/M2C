import Link from 'next/link';
import Image from 'next/image';
import { Grid } from 'lucide-react';

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

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Banner Section */}
      <div className="relative h-52 md:h-60 lg:h-80 overflow-hidden">
        <Image
          src="/assets/images/categories/cb5.jpg"
          alt="Categories Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans mb-4">
              Shop by Categories
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Discover our wide range of traditional textile products organized by categories
            </p>
          </div>
        </div>
      </div>

      {/* Categories Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-start mb-12">
            <h2 className="text-2xl font-bold font-sans text-gray-700">Browse Our Collections</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Find exactly what you're looking for in our carefully curated categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Category Name */}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Use our search feature or contact our support team for assistance finding specific products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Search Products
              </Link>
              <Link
                href="/contact"
                className="border-2 border-gray-700 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition-colors font-medium"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
