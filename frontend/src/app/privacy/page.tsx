import Privacy from '@/components/WebSite/Privacy/Privacy';
import Header from '@/components/WebSite/Header/Header';
import Footer from '@/components/WebSite/Footer/Footer';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';

function PrivacyPage() {
  const breadcrumbItems = [
    { label: 'Privacy Policy' }
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Privacy />
      <Footer />
    </>
  );
}

export default PrivacyPage;
