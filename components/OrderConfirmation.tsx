"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Product, Variant, EMIPlan } from "@/types"

interface OrderConfirmationProps {
  orderId: string
  product: Product
  variant: Variant
  plan: EMIPlan
}

export default function OrderConfirmation({ orderId, product, variant, plan }: OrderConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <div className="mb-4 text-5xl">✓</div>
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your order has been placed successfully</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-3">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-semibold">{orderId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Product</p>
              <p className="font-semibold">{product.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Variant</p>
              <p className="font-semibold">
                {variant.color} - {variant.storage}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">EMI Plan</p>
              <p className="font-semibold">{plan.months} months</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Continue Shopping
              </Button>
            </Link>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = "/"}
            >
              Done
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}