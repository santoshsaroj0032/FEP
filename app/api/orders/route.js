import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// Helper → convert ID only if it's valid ObjectId
function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : id
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { productId, variantId, price, emiPlanId } = body

    if (!productId || !variantId || !price || !emiPlanId) {
      return Response.json(
        {
          success: false,
          error: "Missing required fields: productId, variantId, price, emiPlanId",
        },
        { status: 400 },
      )
    }

    const db = await getDatabase()

    // Product lookup: support slug OR ObjectId
    const product = await db.collection("products").findOne({
      _id: toObjectId(productId),
    })

    if (!product) {
      return Response.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // EMI plan lookup: must be ObjectId
    const plan = await db.collection("emi_plans").findOne({
      _id: toObjectId(emiPlanId),
    })

    if (!plan) {
      return Response.json({ success: false, error: "EMI plan not found" }, { status: 404 })
    }

    const order = {
      productId,
      variantId,
      price,
      emiPlanId,
      emiMonths: plan.months,
      status: "pending",
      createdAt: new Date(),
      metadata: {
        monthlyPayment: Math.round(
          (price * (1 + plan.interestRate / 100)) / plan.months,
        ),
        totalAmount: Math.round(price * (1 + plan.interestRate / 100)),
        interestRate: plan.interestRate,
        cashback: plan.cashback,
      },
    }

    const result = await db.collection("orders").insertOne(order)

    return Response.json(
      {
        success: true,
        data: {
          orderId: result.insertedId.toString(),
          ...order,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[API] Error creating order:", error.message)
    return Response.json(
      {
        success: false,
        error: "Failed to create order. Please try again.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}

export async function GET(req) {
  try {
    const db = await getDatabase()
    const orders = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()

    return Response.json(
      {
        success: true,
        data: orders,
        count: orders.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[API] Error fetching orders:", error.message)
    return Response.json(
      {
        success: false,
        error: "Failed to fetch orders",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
