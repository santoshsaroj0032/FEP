import { getDatabase } from "@/lib/mongodb"

export async function GET(req) {
  try {
    const db = await getDatabase()
    const plans = await db.collection("emi_plans").find({}).sort({ months: 1 }).toArray()

    if (!plans || plans.length === 0) {
      return Response.json(
        {
          success: true,
          data: [],
          message: "No EMI plans found",
        },
        { status: 200 },
      )
    }

    return Response.json(
      {
        success: true,
        data: plans,
        count: plans.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[API] Error fetching EMI plans:", error.message)
    return Response.json(
      {
        success: false,
        error: "Failed to fetch EMI plans",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
