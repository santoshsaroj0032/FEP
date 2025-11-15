"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="font-bold text-lg">EMI Products</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`font-medium transition-colors ${
              pathname === "/" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`font-medium transition-colors ${
              pathname.startsWith("/products") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  )
}
