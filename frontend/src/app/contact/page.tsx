import Header from '@/components/WebSite/Header/Header';
import Footer from '@/components/WebSite/Footer/Footer';
import Contact from '@/components/WebSite/Contact/Contact';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
