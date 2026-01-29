import Categories from '@/components/WebSite/Categories/Categories';
import Header from '@/components/WebSite/Header/Header';
import Footer from '@/components/WebSite/Footer/Footer';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';

export default function CategoriesPage() {
  const breadcrumbItems = [
    { label: 'Categories' }
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Categories />
      <Footer />
    </>
  );
}

export const metadata = {
  title: 'Categories - M2C E-commerce',
  description: 'Browse our wide range of product categories on M2C E-commerce.',
};
