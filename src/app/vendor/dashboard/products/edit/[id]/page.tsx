'use client';

import { useParams } from 'next/navigation';
import AddProduct from '@/components/VendorDashboard/Catalog/AddProduct/AddProduct';

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  return <AddProduct editId={productId} />;
}
