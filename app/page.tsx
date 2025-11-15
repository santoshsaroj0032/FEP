import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Premium Smartphones on <span className="text-blue-600">Easy EMI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Flexible payment plans with 0% interest options. Buy the phone you love without breaking the bank.
        </p>
        <Link href="/products">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
            Explore Products
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Flexible EMI Plans</h3>
            <p className="text-gray-600">Choose from multiple tenure options with 0% interest or up to 24 months</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
            <p className="text-gray-600">Latest flagship smartphones from top brands at competitive prices</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Cashback & Rewards</h3>
            <p className="text-gray-600">Earn cashback on long-term EMI plans backed by mutual funds</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Dream Phone?</h2>
          <p className="text-lg mb-8 opacity-90">Check out our collection of premium smartphones available on EMI</p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
