'use client';

import { useParams } from 'next/navigation';
import SubCategories from '@/components/WebSite/SubCategories/SubCategories';
import Header from '@/components/WebSite/Header/Header';
import Footer from '@/components/WebSite/Footer/Footer';
import Breadcrumb from '@/components/WebSite/Navigation/Breadcrumb';

export default function SubCategoriesPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const breadcrumbItems = [
    { label: 'Categories', href: '/categories' },
    { label: `Category ${categoryId}` }
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <SubCategories categoryId={categoryId} />
      <Footer />
    </>
  );
}
