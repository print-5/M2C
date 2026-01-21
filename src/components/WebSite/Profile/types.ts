export interface Address {
  addressLine1: string
  addressLine2: string
  landmark: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  address: Address
  avatar: string
  joinDate: string
  preferences: {
    newsletter: boolean
    smsNotifications: boolean
    emailNotifications: boolean
  }
}
