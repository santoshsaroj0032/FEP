import { getDatabase } from "@/lib/mongodb"

export async function GET(req, context) {
  try {
    const { id } = await context.params

    if (!id) {
      return Response.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const product = await db.collection("products").findOne({ _id: id })

    if (!product) {
      return Response.json(
        {
          success: false,
          error: `Product with ID "${id}" not found`,
        },
        { status: 404 }
      )
    }

    return Response.json(
      {
        success: true,
        data: product,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[API] Error fetching product:", error.message)
    return Response.json(
      {
        success: false,
        error: "Failed to fetch product",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      { status: 500 }
    )
  }
}
