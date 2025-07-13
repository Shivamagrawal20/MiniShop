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
- PostgreSQL database (running and accessible)

### Backend Setup (in `server/` directory)

1. **Install dependencies:**
   ```
   cd server
   npm install
   ```
2. **Create a `.env` file** in the `server/` directory with the following variables (edit as needed):
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=ecommerce
   PORT=3000
   ```
   > **Note:** There is no `.env.example` file provided. You must create `.env` manually.
3. **Start the backend server:**
   - For development (with auto-reload):
     ```
     npm run dev
     ```
   - For production:
     ```
     npm start
     ```
   The server runs on [http://localhost:3000](http://localhost:3000) by default.
4. **Database Initialization:**
   - On first run, the server will automatically create the `products` table if it does not exist.
   - Ensure your PostgreSQL instance is running and accessible with the credentials you provided.

**Troubleshooting:**
- If you see database connection errors, double-check your `.env` credentials and that PostgreSQL is running.
- The backend logs errors to the console for easier debugging.

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
