# EMI Products Platform

A full-stack web application for purchasing premium smartphones with flexible EMI plans backed by mutual funds.

## Features

- **Dynamic Product Catalog**: Browse smartphones with multiple variants (color, storage)
- **Flexible EMI Plans**: Choose from 5 different EMI tenure options (3M, 6M, 12M, 18M, 24M)
- **Interest Rate Transparency**: Clear breakdown of interest rates and total amounts
- **Cashback Rewards**: Earn cashback on longer tenure plans
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Order Placement**: Place orders with selected variants and EMI plans

## Tech Stack

### Frontend
- **React** - UI library
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library

### Backend
- **Next.js API Routes** - Serverless backend
- **Node.js** - Runtime environment

### Database
- **MongoDB** - NoSQL database for storing products, EMI plans, and orders
- **MongoDB Atlas** - Cloud database hosting

## Database Schema

### Collections

#### 1. **products**
\`\`\`javascript
{
  _id: String (product slug),
  name: String,
  brand: String,
  basePrice: Number,
  image: String (URL),
  category: String,
  description: String,
  variants: [
    {
      id: String,
      color: String,
      storage: String,
      price: Number
    }
  ],
  createdAt: Date
}
\`\`\`

#### 2. **emi_plans**
\`\`\`javascript
{
  _id: String,
  months: Number,
  interestRate: Number,
  cashback: Number,
  fundType: String
}
\`\`\`

#### 3. **orders**
\`\`\`javascript
{
  _id: ObjectId,
  productId: String,
  variantId: String,
  price: Number,
  emiPlanId: String,
  emiMonths: Number,
  status: String,
  createdAt: Date
}
\`\`\`

## Project Structure

\`\`\`
.
├── app/
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.js           # GET all products
│   │   │   └── [id]/route.js      # GET product by ID
│   │   ├── emi-plans/
│   │   │   └── route.js           # GET all EMI plans
│   │   └── orders/
│   │       └── route.js           # POST new order
│   ├── products/
│   │   ├── page.tsx               # Products listing page
│   │   └── [id]/
│   │       └── page.tsx           # Product detail page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   └── globals.css                # Global styles
├── components/
│   ├── Navigation.tsx             # Navigation bar
│   ├── VariantSelector.tsx        # Product variant selection
│   ├── EMIPlanSelector.tsx        # EMI plan comparison
│   └── ui/                        # shadcn/ui components
├── lib/
│   └── mongodb.js                 # MongoDB connection
├── scripts/
│   └── seed-mongodb.js            # Database seeding script
├── .env.local                     # Environment variables
└── README.md                      # This file
\`\`\`

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB Atlas account (free tier available)

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd emi-products-platform
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

**To get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string and add it to `.env.local`

### 4. Seed the Database

Run the seed script to populate the database with sample data:

\`\`\`bash
node scripts/seed-mongodb.js
\`\`\`

This will create:
- 3 smartphone products (iPhone 15 Pro, Samsung S24 Ultra, OnePlus 12)
- Each product with 4 variants (2 colors × 2 storage options)
- 5 EMI plans with varying tenures and interest rates

### 5. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Get All Products
- **Endpoint**: `GET /api/products`
- **Response**:
\`\`\`json
{
  "success": true,
  "data": [
    {
      "_id": "iphone-15-pro",
      "name": "iPhone 15 Pro",
      "brand": "Apple",
      "basePrice": 129999,
      "image": "...",
      "variants": [...]
    }
  ]
}
\`\`\`

### Get Product by ID
- **Endpoint**: `GET /api/products/:id`
- **Example**: `GET /api/products/iphone-15-pro`
- **Response**:
\`\`\`json
{
  "success": true,
  "data": {
    "_id": "iphone-15-pro",
    "name": "iPhone 15 Pro",
    ...
  }
}
\`\`\`

### Get All EMI Plans
- **Endpoint**: `GET /api/emi-plans`
- **Response**:
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
    }
  ]
}
\`\`\`

### Create Order
- **Endpoint**: `POST /api/orders`
- **Request Body**:
\`\`\`json
{
  "productId": "iphone-15-pro",
  "variantId": "iphone-15-pro-black-256",
  "price": 129999,
  "emiPlanId": "plan-6-8",
  "emiMonths": 6
}
\`\`\`
- **Response**:
\`\`\`json
{
  "success": true,
  "data": {
    "orderId": "...",
    "productId": "iphone-15-pro",
    "status": "pending",
    "createdAt": "..."
  }
}
\`\`\`

## Product Data

The platform comes with 3 pre-loaded smartphone products:

### 1. iPhone 15 Pro
- **Base Price**: ₹129,999
- **Variants**: Black & Gold (256GB & 512GB each)
- **Available**: 4 variants

### 2. Samsung Galaxy S24 Ultra
- **Base Price**: ₹129,999
- **Variants**: Phantom Black & Pearl White (256GB & 512GB each)
- **Available**: 4 variants

### 3. OnePlus 12
- **Base Price**: ₹64,999
- **Variants**: Midnight Black & Emerald Green (256GB & 512GB each)
- **Available**: 4 variants

## EMI Plans

| Plan ID | Duration | Interest Rate | Monthly Payment | Cashback | Fund Type |
|---------|----------|---------------|-----------------|----------|-----------|
| plan-0-3 | 3 months | 0% | Calculated | None | Liquid Fund |
| plan-6-8 | 6 months | 8.5% | Calculated | ₹500 | Debt Fund |
| plan-12-10 | 12 months | 10.5% | Calculated | ₹2,000 | Balanced Fund |
| plan-18-12 | 18 months | 12% | Calculated | ₹3,500 | Equity Fund |
| plan-24-14 | 24 months | 14% | Calculated | ₹5,000 | Equity Fund |

## Features Implemented

✅ Dynamic product catalog with multiple variants
✅ Responsive design for all devices
✅ Product detail pages with unique URLs
✅ EMI plan comparison and selection
✅ Order placement functionality
✅ MongoDB database integration
✅ RESTful API endpoints
✅ Server-side data fetching
✅ Error handling and validation
✅ Professional UI with Tailwind CSS

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import repository
4. Add environment variables:
   - `MONGODB_URI`: Your production MongoDB URI
5. Deploy

### Deploy to Render

1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Set build command: `npm install && npm run build`
6. Set start command: `npm run start`
7. Add environment variables

## Troubleshooting

### Database Connection Issues
- Verify MongoDB URI in `.env.local`
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for development)
- Ensure database user has read/write permissions

### Products Not Loading
- Check if seeding script ran successfully
- Verify MongoDB connection
- Check browser console for errors

### API Errors
- Check server logs with `npm run dev`
- Verify API endpoint URLs
- Check request/response format

## Contributing

Feel free to fork and submit pull requests!

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
