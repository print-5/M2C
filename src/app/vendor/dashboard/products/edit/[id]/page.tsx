'use client';

import { useParams } from 'next/navigation';
import AddProduct from '@/components/VendorDashboard/Products/AddEditProduct';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return <AddProduct productId={params.id} isEdit={true} />;
}

