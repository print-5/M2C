import Checkout from "@/components/WebSite/CheckOut/Checkout"
import Header from "@/components/WebSite/Header/Header"
import Footer from "@/components/WebSite/Footer/Footer"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Checkout />
      <Footer />
    </div>

)
}

export const metadata = {
  title: "Checkout - Complete Your Order",
  description: "Secure checkout process with multiple payment options and fast delivery.",
}