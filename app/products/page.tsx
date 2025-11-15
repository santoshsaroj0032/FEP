"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

// --- Types ---
type Product = {
  _id: string
  name: string
  brand: string
  description: string
  image?: string
  basePrice: number
  variants: { id: string; color: string; storage: string }[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch("/api/products")
        const { data } = await res.json()
        setProducts(data || [])
      } catch (err) {
        setError("Failed to load products. Please try refreshing.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </Card>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Smartphones on EMI</h1>
        <p className="text-gray-600 mb-12">
          Choose from our premium collection of smartphones with flexible EMI plans
        </p>

        {products.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">No products available at the moment.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              // <Link key={product._id} href={`/product/${product._id}`} className="group">
              <Link key={product._id} href={`/products/${product._id}`} className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col border-0 shadow-sm">
                  <div className="p-6 pb-4">
                    <p className="text-sm text-gray-500 font-medium mb-2">{product.brand}</p>
                    <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="relative h-48 bg-gray-50 overflow-hidden shrink-0 px-6">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  <div className="p-6 pt-4 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">₹{product.basePrice.toLocaleString()}</span>
                      <span className="text-sm text-blue-600 font-medium">{product.variants.length} variants</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}