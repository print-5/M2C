'use client';

import { useParams } from 'next/navigation';
import OrderDetail from "@/components/WebSite/Order/OrderDetail";
import Header from "@/components/WebSite/Header/Header";
import Footer from "@/components/WebSite/Footer/Footer";

const OrderDetailPage = () => {
  const params = useParams();
  const orderId = params.id as string;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <OrderDetail orderId={orderId} />
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
