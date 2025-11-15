import { getDatabase } from "@/lib/mongodb"

export async function GET(req) {
  try {
    const db = await getDatabase()
    const products = await db.collection("products").find({}).sort({ createdAt: -1 }).toArray()

    if (!products || products.length === 0) {
      return Response.json(
        {
          success: true,
          data: [],
          message: "No products found",
        },
        { status: 200 },
      )
    }

    return Response.json(
      {
        success: true,
        data: products,
        count: products.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[API] Error fetching products:", error.message)
    return Response.json(
      {
        success: false,
        error: "Failed to fetch products. Please try again later.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
