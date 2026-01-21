'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className='bg-white'>
      <div className="bg-white max-w-7xl xl:max-w-420 mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="flex items-center space-x-2 text-sm text-[#330b03] py-4">
        <Link href="/" className="flex items-center hover:text-[#5b2616] transition-colors">
          <Home className="w-5 h-5" />
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-[#330b03]" />
            {item.href ? (
              <Link href={item.href} className="text-[#3c2415] hover:text-[#5b2616] font-sans text-base font-bold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#330b03] font-sans text-base font-bold">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </div>
</div>
  );
};

export default Breadcrumb;
