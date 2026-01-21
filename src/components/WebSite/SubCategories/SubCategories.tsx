import Link from 'next/link';
import Image from 'next/image';
import { Package, ArrowRight, Grid3X3 } from 'lucide-react';

// Mock data for subcategories based on category
const getSubCategories = (categoryId: string) => {
  const subcategoriesData: Record<string, { categoryName: string; subcategories: any[] }> = {
    towels: {
      categoryName: 'Towels',
      subcategories: [
        { id: 'terry-one-side-printed', name: 'Terry One Side Printed Towels', description: 'Premium printed terry towels with vibrant designs on one side', productCount: 45, image: '/assets/images/categories/towels/t1.jpeg' },
        { id: 'terry-mono-checked', name: 'Terry Mono Checked Towels', description: 'Classic monochrome checked pattern terry towels', productCount: 38, image: '/assets/images/categories/towels/t2.jpg' },
        { id: 'terry-hand-towels', name: 'Terry Hand Towels', description: 'Soft and absorbent hand-sized terry towels', productCount: 52, image: '/assets/images/categories/towels/t3.jpg' },
        { id: 'terry-bath-towels', name: 'Terry Bath Towels', description: 'Luxurious full-size terry bath towels for ultimate comfort', productCount: 48, image: '/assets/images/categories/towels/t4.jpeg' },
        { id: 'non-terry-honey-comb', name: 'Non Terry Honey Comb Towels', description: 'Lightweight honey comb textured towels', productCount: 35, image: '/assets/images/categories/towels/t5.jpg' },
        { id: 'dish-cloth', name: 'Dish Cloth', description: 'Practical and durable dish cloths for kitchen use', productCount: 42, image: '/assets/images/categories/towels/t6.jpg' },
        { id: 'checked-terry-towels', name: 'Checked Terry Towels', description: 'Elegant checked pattern terry towels', productCount: 40, image: '/assets/images/categories/towels/t7.jpeg' },
        { id: 'border-terry-towels', name: 'Border Terry Towels', description: 'Premium terry towels with decorative borders', productCount: 47, image: '/assets/images/categories/towels/t8.jpg' }
      ]
    },
    'kitchen-linen': {
      categoryName: 'Kitchen Linen',
      subcategories: [
        { id: 'kitchen-towels', name: 'Kitchen Towels', description: 'Absorbent kitchen towels for everyday use', productCount: 156, image: '/assets/images/categories/c1.jpg' },
        { id: 'aprons', name: 'Aprons', description: 'Functional and stylish kitchen aprons', productCount: 98, image: '/assets/images/categories/c2.jpg' },
        { id: 'table-runners', name: 'Table Runners', description: 'Decorative table runners for dining', productCount: 67, image: '/assets/images/categories/c3.jpg' }
      ]
    },
    'bath-linen': {
      categoryName: 'Bath Linen',
      subcategories: [
        { id: 'bath-mats', name: 'Bath Mats', description: 'Soft and absorbent bathroom mats', productCount: 89, image: '/assets/images/categories/c4.jpg' },
        { id: 'shower-curtains', name: 'Shower Curtains', description: 'Water-resistant shower curtains', productCount: 56, image: '/assets/images/categories/c5.jpg' },
        { id: 'bath-sheets', name: 'Bath Sheets', description: 'Large and luxurious bath sheets', productCount: 73, image: '/assets/images/categories/c6.jpg' }
      ]
    },
    'table-linen': {
      categoryName: 'Table Linen',
      subcategories: [
        { id: 'tablecloths', name: 'Tablecloths', description: 'Premium quality tablecloths', productCount: 102, image: '/assets/images/categories/c7.jpg' },
        { id: 'napkins', name: 'Napkins', description: 'Soft and durable table napkins', productCount: 87, image: '/assets/images/categories/cb1.jpg' },
        { id: 'placemats', name: 'Placemats', description: 'Decorative placemats for dining table', productCount: 65, image: '/assets/images/categories/cb3.jpg' }
      ]
    },
    'cotton-jute-bags': {
      categoryName: 'Cotton & Jute Bags',
      subcategories: [
        { id: 'cotton-bags', name: 'Cotton Bags', description: 'Eco-friendly cotton carry bags', productCount: 112, image: '/assets/images/categories/cb5.jpg' },
        { id: 'jute-bags', name: 'Jute Bags', description: 'Sustainable jute shopping bags', productCount: 95, image: '/assets/images/categories/cb7.png' },
        { id: 'canvas-bags', name: 'Canvas Bags', description: 'Durable canvas utility bags', productCount: 78, image: '/assets/images/categories/c1.jpg' }
      ]
    },
    'pillow-covers': {
      categoryName: 'Pillow & Covers',
      subcategories: [
        { id: 'pillow-covers', name: 'Pillow Covers', description: 'Comfortable and stylish pillow covers', productCount: 134, image: '/assets/images/categories/towels/t1.jpeg' },
        { id: 'cushion-covers', name: 'Cushion Covers', description: 'Decorative cushion covers for sofa and bed', productCount: 98, image: '/assets/images/categories/towels/t2.jpg' },
        { id: 'pillow-cases', name: 'Pillow Cases', description: 'Soft pillowcases for everyday use', productCount: 87, image: '/assets/images/categories/towels/t3.jpg' }
      ]
    },
    'non-terry-towels': {
      categoryName: 'Non Terry Towels',
      subcategories: [
        { id: 'waffle-towels', name: 'Waffle Towels', description: 'Lightweight waffle weave towels', productCount: 76, image: '/assets/images/categories/towels/t5.jpg' },
        { id: 'linen-towels', name: 'Linen Towels', description: 'Natural linen blend towels', productCount: 65, image: '/assets/images/categories/towels/t6.jpg' },
        { id: 'jacquard-towels', name: 'Jacquard Towels', description: 'Patterned jacquard design towels', productCount: 82, image: '/assets/images/categories/towels/t7.jpeg' }
      ]
    }

  };

  return subcategoriesData[categoryId] || {
    categoryName: 'Category',
    subcategories: [
      { id: 'general', name: 'General Products', description: 'Various products in this category', productCount: 50 }
    ]
  };
};

export default function SubCategories({ categoryId }: { categoryId: string }) {
  const { categoryName, subcategories } = getSubCategories(categoryId);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Header Section */}
      <div className="relative h-52 md:h-60 lg:h-62 overflow-hidden">
        <Image
          src="/assets/images/categories/cb3.jpg"
          alt={`${categoryName} Banner`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold">{categoryName}</h1>
            </div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Explore our curated collection of {categoryName.toLowerCase()} with premium quality and craftsmanship
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <Package className="w-4 h-4 mr-2" />
              {subcategories.length} Subcategories Available
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {subcategories.map((subcategory, index) => (
            <Link
              key={subcategory.id}
              href={`/products?category=${categoryId}&subcategory=${subcategory.id}`}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                {subcategory.image ? (
                  <Image
                    src={subcategory.image}
                    alt={subcategory.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-gray-100 to-orange-200 flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-600 opacity-50" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Product Count Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <span className="text-xs font-semibold text-gray-700">
                    {subcategory.productCount} items
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-sans font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                    {subcategory.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {subcategory.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 font-semibold text-sm group-hover:text-gray-700 transition-colors duration-300">
                    <span>Explore Collection</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-600 transition-colors duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {subcategories.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Package className="mx-auto h-20 w-20 text-gray-300 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Subcategories Found</h3>
              <p className="text-gray-600 mb-6">
                This category doesn't have any subcategories yet. Check back later for updates.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-16 bg-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 text-center text-white">
            <h2 className="text-3xl font-sans font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-gray-100 font-sans mb-8 max-w-2xl mx-auto">
              Discover more products with our advanced search or browse our complete collection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center font-sans">
              <Link
                href="/search"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
              >
                <Package className="mr-2 w-5 h-5" />
                Search Products
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-gray-600 transition-colors font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
              >
                <Grid3X3 className="mr-2 w-5 h-5" />
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

