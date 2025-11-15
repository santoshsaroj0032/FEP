export interface Variant {
  id: string
  color: string
  storage: string
  price: number
}

export interface Product {
  _id: string
  name: string
  brand: string
  basePrice: number
  image: string
  category: string
  description: string
  variants: Variant[]
  createdAt: Date
}

export interface EMIPlan {
  _id: string
  months: number
  interestRate: number
  cashback?: number
  fundType?: string
}

export interface Order {
  _id: string
  productId: string
  variantId: string
  price: number
  emiPlanId: string
  emiMonths: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
