export interface CheckoutFormData {
  // Shipping Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Payment Information
  paymentMethod: "card" | "upi"
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  upiId: string
  
  // Options
  saveInfo: boolean
  sameAsBilling: boolean
  shippingMethod: string
}
