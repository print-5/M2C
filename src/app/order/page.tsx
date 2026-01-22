// import Order from "@/components/WebSite/Order/Order"
import Header from "@/components/WebSite/Header/Header"
import Footer from "@/components/WebSite/Footer/Footer"
import Order from "@/components/WebSite/Order/Order"

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
  title: "Order Page - M2C E-commerce",
  description: "View and manage your orders on M2C E-commerce.",
}