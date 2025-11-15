export function calculateMonthlyPayment(price: number, interestRate: number, months: number): number {
  const totalAmount = price * (1 + interestRate / 100)
  return Math.round(totalAmount / months)
}

export function calculateTotalAmount(price: number, interestRate: number): number {
  return Math.round(price * (1 + interestRate / 100))
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export function calculateEffectivePrice(price: number, cashback: number): number {
  return price - cashback
}

export function calculateSavings(
  monthlyPaymentWithInterest: number,
  monthlyPaymentWithoutInterest: number,
  months: number,
): number {
  return monthlyPaymentWithoutInterest * months - monthlyPaymentWithInterest * months
}
