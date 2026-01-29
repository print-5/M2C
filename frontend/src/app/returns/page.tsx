import Returns from '@/components/WebSite/Returns/Returns';
import Header from '@/components/WebSite/Header/Header';
import Footer from '@/components/WebSite/Footer/Footer';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';

export default function ReturnsPage() {
  const breadcrumbItems = [
    { label: 'Returns & Exchanges' }
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Returns />
      <Footer />
    </>
  );
}
