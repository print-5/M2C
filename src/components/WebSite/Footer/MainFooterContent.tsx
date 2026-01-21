import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

const MainFooterContent = () => {
  return (
    <div className="bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="text-start">
            <h4 className="text-white text-center font-semibold mb-6 text-base h-6">Our Company</h4>
            <div className="space-y-4">
              <div>
                <Link href="/" className="inline-block">
                  <h1 className="text-xl font-bold text-white mb-2">
                    Nav Nit Textile
                  </h1>
                </Link>
              </div>

              <p className="text-gray-200 text-sm leading-relaxed">
                Premium home textiles manufacturer specializing in high-quality towels, kitchen aprons, table linens, and bath accessories. Crafted with finest cotton and sustainable materials for everyday comfort and durability.
              </p>

              <div className="flex justify-center space-x-4 pt-2">
                <a
                  href="#"
                  className="w-8 h-8 bg-[#3d3d3d] p-2 rounded-full flex items-center justify-center text-gray-200 hover:bg-gray-600 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#3d3d3d] p-2 rounded-full flex items-center justify-center text-gray-200 hover:bg-gray-600 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#3d3d3d] p-2 rounded-full flex items-center justify-center text-gray-200 hover:bg-gray-600 hover:text-white transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-6 text-base h-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-200 text-sm hover:text-white transition-colors block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-200 text-sm hover:text-white transition-colors block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-200 text-sm hover:text-white transition-colors block"
                >
                  Products
                </Link>
              </li>
               <li>
                <Link
                  href="/contact"
                  className="text-gray-200 text-sm hover:text-white transition-colors block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-6 text-base h-6">Categories</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/categories/towels"
                  className="text-gray-200 text-sm hover:text-white transition-colors block"
                >
                  Towels
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/kitchen-linen"
                  className="text-gray-200 text-sm hover:text-white transition-colors block"
                >
                  Kitchen Linen
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/bath-linen"
                  className="text-gray-200 text-sm hover:text-white transition-colors block"
                >
                  Bath Linen
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/table-linen"
                  className="text-gray-200 text-sm hover:text-white transition-colors block"
                >
                  Table Linen
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/cotton-jute-bags"
                  className="text-gray-200 text-sm hover:text-white transition-colors block"
                >
                  Cotton & Jute Bags
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-start">
            <h4 className="text-white text-center font-semibold mb-6 text-base h-6">Contact Info</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-200 text-sm">
                  info@navnittextiles.com
                </p>
              </div>
              <div>
                <p className="text-gray-200 text-sm">
                  Jaipur Raj 302012
                </p>
              </div>
              <div>
                <p className="text-gray-200 text-sm leading-relaxed">
                  307/A, Gumasta Marg, Pul, Jaipur Disawer, Rajasthan-Jaipur, 
                  Rajasthan, Rajasthan 302001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooterContent;