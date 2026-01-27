import Header from "@/components/WebSite/Header/Header"
import Footer from "@/components/WebSite/Footer/Footer"
import OrderConfirmation from "@/components/WebSite/Order/OrderConfirmation"

export default function OrderConfirmationPage() {
  // Example: You can customize the order items here
  // This could come from URL params, database, or state management
  const customOrderItems = [
    { productId: '1', quantity: 2 }, // Handwoven Cotton Kitchen Towel Set
    { productId: '2', quantity: 1 }, // Organic Bath Towel Set
    { productId: '4', quantity: 1 }  // Premium Cotton T-Shirt
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <OrderConfirmation 
        isConfirmed={true}
        orderItems={customOrderItems}
      />
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Order Confirmed - Thank You!",
  description: "Your order has been successfully placed. Track your order and download your receipt.",
}