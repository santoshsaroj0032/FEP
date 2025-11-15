import { getDatabase } from "@/lib/mongodb"

export async function GET(req) {
  try {
    const db = await getDatabase()

    // Test database connectivity
    const adminDb = db.admin()
    await adminDb.ping()

    return Response.json(
      {
        success: true,
        status: "healthy",
        database: "connected",
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[API] Health check failed:", error.message)
    return Response.json(
      {
        success: false,
        status: "unhealthy",
        error: "Database connection failed",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    )
  }
}
