import Header from '@/components/WebSite/Header/Header';
import Footer from '@/components/WebSite/Footer/Footer';
import About from '@/components/WebSite/About/About';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={[{ label: 'About Us' }]} />
      <About />
      <Footer />
    </div>
  );
}
