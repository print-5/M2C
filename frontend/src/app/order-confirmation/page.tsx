import Header from "@/components/WebSite/Header/Header"
import Footer from "@/components/WebSite/Footer/Footer"
import OrderConfirmation from "@/components/WebSite/Order/OrderConfirmation"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <OrderConfirmation />
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Order Confirmed - Thank You!",
  description: "Your order has been successfully placed. Track your order and download your receipt.",
}