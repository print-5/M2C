import Header from '@/components/WebSite/Header/Header';
import Footer from '@/components/WebSite/Footer/Footer';
import Products from '@/components/WebSite/Products/Products';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={[{ label: 'Products' }]} />
      <Products />
      <Footer />
    </div>
  );
}
