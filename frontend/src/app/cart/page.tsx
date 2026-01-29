import Header from '@/components/WebSite/Header/Header';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';
import Footer from '@/components/WebSite/Footer/Footer';
import Cart from '@/components/WebSite/Cart/Cart';

export default function CartPage() {
  const breadcrumbItems = [
    { label: 'Cart' }
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Cart />
      <Footer />
    </div>
  );
}
