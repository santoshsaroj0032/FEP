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


### 2. Install Dependencies
\`\`\`bash
`npm install`
\`\`\`

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

### 4. Seed the Database

Run the seed script to populate the database with sample data:

\`\`\`bash
`node scripts/seed-mongodb.js`
\`\`\`

This will create:
- `3 smartphone products (iPhone 15 Pro, Samsung S24 Ultra, OnePlus 12)`
- `Each product with 4 variants (2 colors × 2 storage options)`
- `5 EMI plans with varying tenures and interest rates`

### 5. Run the Development Server

\`\`\`bash
`npm run dev`
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Feel free to fork and submit pull requests!  

## License  
MIT

## Support  

For issues and questions, please open an issue on GitHub.
