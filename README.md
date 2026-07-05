# NexusAI - AI-Powered E-Commerce Platform

**Full-Stack Commerce Application with Modern Tech Stack**

## 🚀 Project Overview

NexusAI is a cutting-edge AI-powered e-commerce platform built with the latest web technologies. It provides a seamless shopping experience with intelligent recommendations, secure payments, and real-time order tracking.

## 📦 Project Structure

```
PaymentApp/
├── frontend/                 # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI Components
│   │   ├── pages/           # Page Components
│   │   ├── config/          # Configuration Files
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/                  # Node.js + Express Backend
│   ├── src/
│   │   ├── config/          # Database Configuration
│   │   ├── controllers/     # Route Controllers
│   │   ├── middleware/      # Custom Middleware
│   │   ├── models/          # Database Models
│   │   ├── routes/          # API Routes
│   │   ├── utils/           # Utility Functions
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── README.md
```

## ✨ Features

### Phase 1 - Foundation (Complete) ✅

**Authentication & Authorization**
- User Registration with role-based access
- JWT-based Authentication
- Secure Password Hashing with bcrypt
- Role-based Access Control (Customer, Seller, Admin)

**Product Management**
- Browse all products with search & filtering
- Category-based filtering
- Real-time product inventory tracking
- Seller dashboard for product creation

**Shopping Experience**
- Add/Remove items from cart
- Cart persistence with localStorage
- Quantity management
- Smooth checkout flow

**Order System**
- Create and track orders
- Order status updates (pending, confirmed, shipped, delivered, cancelled)
- Payment status tracking
- Order history

**User Profiles**
- View and edit user information
- Save shipping addresses
- Order history
- Profile settings

### Phase 2 - Enhancements (Coming Soon) 🔄
- 💳 Payment Gateway Integration (Stripe/PayPal)
- 🤖 AI-Powered Recommendations
- 📊 Advanced Analytics Dashboard
- 📧 Email Notifications
- 💬 Real-time Chat Support
- 🔍 Advanced Search Algorithms
- ⭐ Product Reviews & Ratings

## 🛠 Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP Client
- **PostCSS & Autoprefixer** - CSS Processing

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **TypeScript** - Type Safety
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM (Object Document Mapper)
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment Management
- **Express Validator** - Data Validation

## 📋 Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (Local or Atlas)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ch39-cyber/PaymentApp.git
cd PaymentApp
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Example:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/nexusai
# JWT_SECRET=your-secret-key-change-in-production
# NODE_ENV=development

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo 'VITE_API_URL=http://localhost:5000/api' > .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

**Register User**
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer" // or "seller"
}

Response: 201
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    }
  }
}
```

**Login User**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {...}
  }
}
```

### Product Endpoints

**Get All Products**
```http
GET /products?category=Electronics&search=laptop&limit=20&skip=0

Response: 200
{
  "success": true,
  "message": "Products fetched successfully",
  "data": {
    "products": [...],
    "total": 150,
    "limit": 20,
    "skip": 0
  }
}
```

**Get Product by ID**
```http
GET /products/:id
```

**Create Product (Seller Only)**
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category": "Electronics",
  "stock": 10,
  "image": "url"
}
```

### Order Endpoints

**Create Order**
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    { "productId": "...", "quantity": 2 }
  ],
  "shippingAddress": "123 Main St, City, State 12345"
}
```

**Get All Orders**
```http
GET /orders
Authorization: Bearer <token>
```

**Get Order by ID**
```http
GET /orders/:id
Authorization: Bearer <token>
```

### User Endpoints

**Get User Profile**
```http
GET /users/profile
Authorization: Bearer <token>
```

**Update User Profile**
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "profile": {
    "bio": "I love shopping!",
    "phone": "123-456-7890",
    "address": "..."
  }
}
```

## 🔐 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nexusai

# Authentication
JWT_SECRET=your-super-secret-key-change-in-production-env

# Optional - For future features
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist folder to Vercel/Netlify
```

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "customer" | "seller" | "admin",
  profile: {
    avatar: String,
    bio: String,
    phone: String,
    address: String
  },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  seller: ObjectId (ref: User),
  image: String,
  stock: Number,
  rating: Number,
  reviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  orderId: String (unique),
  customer: ObjectId (ref: User),
  items: [
    {
      productId: ObjectId (ref: Product),
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
  shippingAddress: String,
  paymentStatus: "pending" | "completed" | "failed",
  createdAt: Date,
  updatedAt: Date
}
```

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify network access for MongoDB Atlas

**Port Already in Use**
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

**CORS Error**
- Backend CORS is configured for `http://localhost:3000`
- Update backend CORS settings if frontend runs on different port

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Chandan Kumar Yadav**
- GitHub: [@ch39-cyber](https://github.com/ch39-cyber)
- Email: chandan2004sep@gmail.com

## 🙏 Acknowledgments

- React Documentation
- Express.js Guide
- MongoDB Official Docs
- Tailwind CSS
- Open-source community

## 📞 Support

For support, email chandan2004sep@gmail.com or create an issue on GitHub.

---

**Status**: Phase 1 Foundation Complete ✅  
**Last Updated**: July 5, 2026  
**Version**: 1.0.0