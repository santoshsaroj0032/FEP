import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your environment variables")
}

let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, db: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  const conn = await MongoClient.connect(MONGODB_URI)
  const db = conn.db("emi_products_db")

  cached.conn = conn
  cached.db = db

  return conn
}

export async function getDatabase() {
  await connectToDatabase()
  return cached.db
}
