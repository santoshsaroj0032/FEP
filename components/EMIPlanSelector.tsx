"use client"

import { Card } from "@/components/ui/card"
import { EMIPlan } from "@/types"

interface EMIPlanSelectorProps {
  plans: EMIPlan[]
  selectedPlan: EMIPlan | null
  onSelectPlan: (plan: EMIPlan) => void
  productPrice: number
}

export default function EMIPlanSelector({
  plans,
  selectedPlan,
  onSelectPlan,
  productPrice
}: EMIPlanSelectorProps) {
  const calculateMonthlyEMI = (months: number, interestRate?: number) => {
    if (!interestRate) return productPrice / months
    
    const monthlyRate = interestRate / 100
    const emi = (productPrice * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1)
    return emi
  }

  const calculateTotalAmount = (months: number, interestRate?: number) => {
    if (!interestRate) return productPrice
    return calculateMonthlyEMI(months, interestRate) * months
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {plans.map((plan) => {
        const monthlyEMI = calculateMonthlyEMI(plan.months, plan.interestRate)
        const totalAmount = calculateTotalAmount(plan.months, plan.interestRate)
        
        return (
          <Card
            key={plan._id}
            className={`p-4 cursor-pointer border-2 transition-all ${
              selectedPlan?._id === plan._id 
                ? "border-blue-600 bg-blue-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onSelectPlan(plan)}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                ₹{Math.round(monthlyEMI).toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 mb-1">
                x {plan.months} months
              </div>
              <div className="text-xs font-medium text-gray-900">
                ₹{Math.round(totalAmount).toLocaleString()}
              </div>
              {plan.interestRate && (
                <div className="text-xs text-green-600 mt-1">
                  ({plan.interestRate}% per month)
                </div>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}