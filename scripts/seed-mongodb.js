const { MongoClient } = require("mongodb")
require("dotenv").config({ path: ".env.local" })

const MONGODB_URI = process.env.MONGODB_URI
const DATABASE_NAME = "emi_products_db"

async function seedDatabase() {
  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI missing in .env.local")
  }

  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db(DATABASE_NAME)

    console.log("Connected to MongoDB")

    // Drop existing collections
    const collections = await db.listCollections().toArray()
    for (const collection of collections) {
      await db.dropCollection(collection.name)
    }

    // Create Products Collection
    const productsCollection = db.collection("products")

    const products = [
      {
        _id: "iphone-15-pro",
        name: "iPhone 15 Pro",
        brand: "Apple",
        basePrice: 129999,
        image:
          "https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "smartphone",
        description:
          "Premium flagship smartphone with advanced camera and processing power",
        variants: [
          {
            id: "iphone-15-pro-black-256",
            color: "Space Black",
            storage: "256GB",
            price: 129999,
          },
          {
            id: "iphone-15-pro-black-512",
            color: "Space Black",
            storage: "512GB",
            price: 139999,
          },
          {
            id: "iphone-15-pro-gold-256",
            color: "Gold",
            storage: "256GB",
            price: 129999,
          },
          {
            id: "iphone-15-pro-gold-512",
            color: "Gold",
            storage: "512GB",
            price: 139999,
          },
        ],
        createdAt: new Date(),
      },

      {
        _id: "samsung-s24-ultra",
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        basePrice: 129999,
        image:
          "https://images.unsplash.com/photo-1675285776817-632fb95aff51?q=80&w=733&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "smartphone",
        description:
          "Powerhouse Android flagship with exceptional display and performance",
        variants: [
          {
            id: "samsung-s24-ultra-black-256",
            color: "Phantom Black",
            storage: "256GB",
            price: 129999,
          },
          {
            id: "samsung-s24-ultra-black-512",
            color: "Phantom Black",
            storage: "512GB",
            price: 139999,
          },
          {
            id: "samsung-s24-ultra-white-256",
            color: "Pearl White",
            storage: "256GB",
            price: 129999,
          },
          {
            id: "samsung-s24-ultra-white-512",
            color: "Pearl White",
            storage: "512GB",
            price: 139999,
          },
        ],
        createdAt: new Date(),
      },

      {
        _id: "OnePlus-12",
        name: "OnePlus 12",
        brand: "OnePlus",
        basePrice: 64999,
        image:
          "https://image01-in.oneplus.net/media/202407/09/1a9ade03f4179103d62d796d2ec42b45.png",
        category: "smartphone",
        description:
          "Fast and smooth Android experience with great value",
        variants: [
          {
            id: "OnePlus-12-black-256",
            color: "Midnight Black",
            storage: "256GB",
            price: 64999,
          },
          {
            id: "OnePlus-12-black-512",
            color: "Midnight Black",
            storage: "512GB",
            price: 74999,
          },
          {
            id: "OnePlus-12-green-256",
            color: "Emerald Green",
            storage: "256GB",
            price: 64999,
          },
          {
            id: "OnePlus-12-green-512",
            color: "Emerald Green",
            storage: "512GB",
            price: 74999,
          },
        ],
        createdAt: new Date(),
      },
    ]

    await productsCollection.insertMany(products)
    console.log("✔ Products collection seeded")

    // EMI Plans (functions removed because MongoDB cannot store functions)
    const emiPlansCollection = db.collection("emi_plans")

    const emiPlans = [
      {
        _id: "plan-0-3",
        months: 3,
        interestRate: 0,
        cashback: 0,
        fundType: "Liquid Fund",
      },
      {
        _id: "plan-6-8",
        months: 6,
        interestRate: 8.5,
        cashback: 500,
        fundType: "Debt Fund",
      },
      {
        _id: "plan-12-10",
        months: 12,
        interestRate: 10.5,
        cashback: 2000,
        fundType: "Balanced Fund",
      },
      {
        _id: "plan-18-12",
        months: 18,
        interestRate: 12,
        cashback: 3500,
        fundType: "Equity Fund",
      },
      {
        _id: "plan-24-14",
        months: 24,
        interestRate: 14,
        cashback: 5000,
        fundType: "Equity Fund",
      },
    ]

    await emiPlansCollection.insertMany(emiPlans)
    console.log("✔ EMI Plans collection seeded")

    // Create Orders Collection
    const ordersCollection = db.collection("orders")
    await ordersCollection.createIndex({ createdAt: 1 })
    console.log("✔ Orders collection created")

    console.log("🎉 Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
