'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/WebSite/Header/Header';
import Footer from '@/components/WebSite/Footer/Footer';
import ProductDetail from '@/components/WebSite/ProductDetail/ProductDetail';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id as string;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductDetail productId={productId} />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
