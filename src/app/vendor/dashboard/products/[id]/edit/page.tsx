'use client';

import { useParams } from 'next/navigation';
import AddProduct from '@/components/VendorDashboard/Catalog/AddProduct/AddProduct';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return <AddProduct editId={params.id} />;
}

export const metadata = {
  title: 'Edit Product - Vendor Dashboard',
  description: 'Edit product details',
};