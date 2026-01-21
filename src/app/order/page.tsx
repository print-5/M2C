import Order from "@/components/WebSite/Order/Order"
import Header from "@/components/WebSite/Header/Header"
import Footer from "@/components/WebSite/Footer/Footer"

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Order />
      <Footer />
    </div>
  )
}
export const metadata = {
  title: "Shopping Cart - Your Order",
  description: "Review your items and proceed to checkout. Secure shopping with fast delivery and easy returns.",
}