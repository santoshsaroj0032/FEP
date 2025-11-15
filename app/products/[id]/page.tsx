"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import VariantSelector from "@/components/VariantSelector"
import EMIPlanSelector from "@/components/EMIPlanSelector"
import { Product, Variant, EMIPlan } from "@/types"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [emiPlans, setEmiPlans] = useState<EMIPlan[]>([])
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ordering, setOrdering] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  // --- Fetch product & EMI plans ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [productRes, plansRes] = await Promise.all([
          fetch(`/api/products/${productId}`),
          fetch("/api/emi-plans")
        ])

        if (!productRes.ok) throw new Error("Product not found")
        if (!plansRes.ok) throw new Error("Failed to fetch EMI plans")

        const { data: productData }: { data: Product } = await productRes.json()
        const { data: plansData }: { data: EMIPlan[] } = await plansRes.json()

        setProduct(productData)
        setEmiPlans(plansData)
        setSelectedVariant(productData.variants[0] || null)
        setSelectedPlan(plansData[0] || null)
      } catch (err) {
        console.error(err)
        setError("Failed to load product details")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [productId])

  // --- Handle order ---
  const handleProceed = async () => {
    if (!product || !selectedVariant || !selectedPlan) {
      alert("Please select a variant and EMI plan")
      return
    }

    try {
      setOrdering(true)
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          variantId: selectedVariant.id,
          price: selectedVariant.price,
          emiPlanId: selectedPlan._id,
          emiMonths: selectedPlan.months
        })
      })

      const { data, success }: { data: { orderId: string }, success: boolean } = await res.json()

      if (!success) throw new Error("Failed to place order")

      setOrderId(data.orderId)
      setOrderSuccess(true)
    } catch (err) {
      console.error(err)
      alert("Failed to place order. Please try again.")
    } finally {
      setOrdering(false)
    }
  }

  // --- Loading & Error states ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading product details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go Back
          </button>
        </Card>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Product not found</p>
      </div>
    )
  }

  // --- Order success view ---
  if (orderSuccess && orderId && selectedVariant && selectedPlan) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="max-w-md w-full p-8 mx-4">
          <div className="text-center">
            <div className="mb-4 text-6xl">✓</div>
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your order has been placed successfully</p>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left space-y-3">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-mono font-semibold text-sm break-all">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Product</p>
                <p className="font-semibold">{product.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Variant</p>
                <p className="font-semibold">
                  {selectedVariant.color} - {selectedVariant.storage}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">EMI Plan</p>
                <p className="font-semibold">{selectedPlan.months} months</p>
              </div>
            </div>

            <div className="flex gap-3 flex-col">
              <Button
                onClick={() => (window.location.href = "/products")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Continue Shopping
              </Button>
              <Button onClick={() => (window.location.href = "/")} variant="outline" className="w-full">
                Back to Home
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // --- Main Product Page ---
  return (
    <main className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden h-96 p-8 border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={320}
              height={320}
              className="object-contain"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 text-sm mb-4">
                {selectedVariant && `Storage: ${selectedVariant.storage}, Color: ${selectedVariant.color}`}
              </p>
              
              {/* Price Display */}
              {selectedVariant && (
                <div className="mb-6">
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{selectedVariant.price.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Variant Selector */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <VariantSelector
                  variants={product.variants}
                  selectedVariant={selectedVariant}
                  onSelectVariant={setSelectedVariant}
                />
              </div>
            </div>

            {/* EMI Section */}
            {selectedVariant && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Choose EMI Tenure</h3>
                <EMIPlanSelector
                  plans={emiPlans}
                  selectedPlan={selectedPlan}
                  onSelectPlan={setSelectedPlan}
                  productPrice={selectedVariant.price}
                />
              </div>
            )}

            {/* Additional Info */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>EMIs starting 3°/Dec</p>
              <p>*Total data summet ear month order value*</p>
            </div>

            {/* Proceed Button - DYNAMIC TEXT BASED ON SELECTED PLAN */}
            <Button
              onClick={handleProceed}
              disabled={ordering}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base font-medium disabled:opacity-50"
            >
              {ordering ? "Placing Order..." : `Buy on ${selectedPlan?.months || 3} months EMI`}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}