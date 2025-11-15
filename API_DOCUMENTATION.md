# API Documentation

## Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

## Endpoints

### 1. Get All Products
Retrieve all available products with their variants.

**Endpoint:** \`GET /api/products\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "_id": "iphone-15-pro",
      "name": "iPhone 15 Pro",
      "brand": "Apple",
      "basePrice": 129999,
      "image": "https://...",
      "category": "smartphone",
      "description": "Premium flagship smartphone...",
      "variants": [
        {
          "id": "iphone-15-pro-black-256",
          "color": "Space Black",
          "storage": "256GB",
          "price": 129999
        }
      ],
      "createdAt": "2025-11-11T10:00:00.000Z"
    }
  ],
  "count": 3
}
\`\`\`

### 2. Get Product by ID
Retrieve details of a specific product.

**Endpoint:** \`GET /api/products/:id\`

**Parameters:**
- \`id\` (string) - Product ID (e.g., "iphone-15-pro")

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "_id": "iphone-15-pro",
    "name": "iPhone 15 Pro",
    "brand": "Apple",
    "basePrice": 129999,
    "image": "https://...",
    "category": "smartphone",
    "description": "Premium flagship smartphone with advanced features",
    "variants": [
      {
        "id": "iphone-15-pro-black-256",
        "color": "Space Black",
        "storage": "256GB",
        "price": 129999
      },
      {
        "id": "iphone-15-pro-black-512",
        "color": "Space Black",
        "storage": "512GB",
        "price": 139999
      }
    ],
    "createdAt": "2025-11-11T10:00:00.000Z"
  }
}
\`\`\`

### 3. Get All EMI Plans
Retrieve available EMI plan options.

**Endpoint:** \`GET /api/emi-plans\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "_id": "plan-0-3",
      "months": 3,
      "interestRate": 0,
      "cashback": 0,
      "fundType": "Liquid Fund"
    },
    {
      "_id": "plan-6-8",
      "months": 6,
      "interestRate": 8.5,
      "cashback": 500,
      "fundType": "Debt Fund"
    },
    {
      "_id": "plan-12-10",
      "months": 12,
      "interestRate": 10.5,
      "cashback": 2000,
      "fundType": "Balanced Fund"
    },
    {
      "_id": "plan-18-12",
      "months": 18,
      "interestRate": 12,
      "cashback": 3500,
      "fundType": "Equity Fund"
    },
    {
      "_id": "plan-24-14",
      "months": 24,
      "interestRate": 14,
      "cashback": 5000,
      "fundType": "Equity Fund"
    }
  ],
  "count": 5
}
\`\`\`

### 4. Create Order
Place a new order with selected product, variant, and EMI plan.

**Endpoint:** \`POST /api/orders\`

**Request Body:**
\`\`\`json
{
  "productId": "iphone-15-pro",
  "variantId": "iphone-15-pro-black-256",
  "price": 129999,
  "emiPlanId": "plan-6-8",
  "emiMonths": 6
}
\`\`\`

**Response (Success):**
\`\`\`json
{
  "success": true,
  "data": {
    "orderId": "507f1f77bcf86cd799439011",
    "productId": "iphone-15-pro",
    "variantId": "iphone-15-pro-black-256",
    "price": 129999,
    "emiPlanId": "plan-6-8",
    "emiMonths": 6,
    "status": "pending",
    "createdAt": "2025-11-11T10:30:00.000Z",
    "metadata": {
      "monthlyPayment": 18514,
      "totalAmount": 141099,
      "interestRate": 8.5,
      "cashback": 500
    }
  }
}
\`\`\`

**Response (Validation Error):**
\`\`\`json
{
  "success": false,
  "error": "Missing required fields: productId, variantId, price, emiPlanId"
}
\`\`\`

### 5. Get All Orders (Testing)
Retrieve recent orders placed (last 50).

**Endpoint:** \`GET /api/orders\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "productId": "iphone-15-pro",
      "variantId": "iphone-15-pro-black-256",
      "price": 129999,
      "emiPlanId": "plan-6-8",
      "emiMonths": 6,
      "status": "pending",
      "createdAt": "2025-11-11T10:30:00.000Z",
      "metadata": {
        "monthlyPayment": 18514,
        "totalAmount": 141099,
        "interestRate": 8.5,
        "cashback": 500
      }
    }
  ],
  "count": 1
}
\`\`\`

### 6. Health Check
Check API and database connectivity.

**Endpoint:** \`GET /api/health\`

**Response (Healthy):**
\`\`\`json
{
  "success": true,
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-11-11T10:35:00.000Z"
}
\`\`\`

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "success": false,
  "error": "Missing required fields: productId, variantId, price, emiPlanId"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "success": false,
  "error": "Product with ID \"invalid-id\" not found"
}
\`\`\`

### 500 Internal Server Error
\`\`\`json
{
  "success": false,
  "error": "Failed to fetch products. Please try again later."
}
\`\`\`

## Rate Limiting
Currently no rate limiting is implemented. For production, consider implementing rate limiting based on IP or API keys.

## Authentication
Currently no authentication is required. For production, implement JWT-based authentication for sensitive operations.

## Testing with cURL

### Get Products
\`\`\`bash
curl http://localhost:3000/api/products
\`\`\`

### Get Specific Product
\`\`\`bash
curl http://localhost:3000/api/products/iphone-15-pro
\`\`\`

### Get EMI Plans
\`\`\`bash
curl http://localhost:3000/api/emi-plans
\`\`\`

### Create Order
\`\`\`bash
curl -X POST http://localhost:3000/api/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "productId": "iphone-15-pro",
    "variantId": "iphone-15-pro-black-256",
    "price": 129999,
    "emiPlanId": "plan-6-8",
    "emiMonths": 6
  }'
\`\`\`

### Health Check
\`\`\`bash
curl http://localhost:3000/api/health
\`\`\`
\`\`\`
