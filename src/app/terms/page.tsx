import Terms from '@/components/WebSite/Terms/Terms';
import Header from '@/components/WebSite/Header/Header';
import Footer from '@/components/WebSite/Footer/Footer';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';

export default function TermsPage() {
  const breadcrumbItems = [
    { label: 'Terms of Service' }
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Terms />
      <Footer />
    </>
  );
}
