# Mini E-Commerce Platform

A simple e-commerce web application with two main tabs — one for submitting products, and one for viewing submitted products with a search feature.

## Features

- Add products with name, price, description, and optional image URL
- View all submitted products in a clean card layout
- Search products by name or description
- Real-time updates after product submission
- Responsive design that works on all devices

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Backend Setup

1. Clone this repository
2. Copy `.env.example` to `.env` and update the database credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=ecommerce
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm run server
   ```
   The server runs on http://localhost:3000 by default

### Frontend Setup

1. In a new terminal window, start the frontend development server:
   ```
   npm run dev
   ```
2. Open http://localhost:5173 in your browser

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product

## Project Structure

```
/
├── src/                  # Frontend code
│   ├── components/       # React components
│   ├── context/          # Context providers
│   ├── services/         # API service functions
│   └── types/            # TypeScript interfaces
├── server/               # Backend code
│   └── index.js          # Express server & API routes
└── README.md
```

## What's Working

- ✅ Two-tab interface
- ✅ Product submission form with validation
- ✅ Product gallery with responsive card layout
- ✅ Backend API with Express and PostgreSQL
- ✅ Search functionality for products
- ✅ Modern, responsive design
- ✅ Form validation and error handling