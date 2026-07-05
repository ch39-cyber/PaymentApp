# NexusAI Commerce Cloud

**AI-Powered E-Commerce Platform - Phase 1 Foundation**

Welcome to NexusAI, the next generation of AI-driven e-commerce solutions. This repository contains the foundational code for a full-stack payment and commerce platform.

## 📋 Project Structure

```
PaymentApp/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Node.js + Express backend
│   ├── src/
│   │   ├── config/      # Configuration
│   │   ├── controllers/ # Route handlers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # Database schemas
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🚀 Features (Phase 1)

- **User Authentication**: Register, Login with JWT
- **Product Management**: Create, Read products
- **Shopping Cart**: Add/Remove items, manage quantities
- **Order System**: Create orders, track order status
- **User Profiles**: View and update user information
- **Role-Based Access**: Customer, Seller, Admin roles

## 🛠 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for fast builds
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Node.js + Express
- MongoDB for database
- TypeScript for type safety
- JWT for authentication
- bcrypt for password hashing

## 📦 Installation

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (seller only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexusai
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Next Steps (Phase 2)

- Payment Integration (Stripe/PayPal)
- AI-Powered Recommendations
- Advanced Search & Filtering
- Admin Dashboard
- Real-time Notifications
- Email Integration
- Deployment Setup

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributors

- Chandan Kumar Yadav (@ch39-cyber)

---

**Status**: Phase 1 - Foundation Complete ✅

**Last Updated**: July 5, 2026