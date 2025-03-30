# E-Commerce Application

This is a full-stack E-Commerce application built with a **React.js** frontend, **Node.js** backend, and **MongoDB** as the database. The project is divided into three main parts: **Frontend**, **Backend**, and **Admin Panel**.

---

## Features

### User Features
- Browse products by category or search.
- View product details.
- Add products to the cart.
- Place orders using multiple payment methods (Cash on Delivery, Stripe, Razorpay).
- View order history.

### Admin Features
- Add, update, and delete products.
- View all orders and update their status.
- Manage the product catalog.

---

## Project Structure

### 1. **Frontend**
- **Path**: `frontend/`
- **Tech Stack**: React.js, TailwindCSS, React Router, React Toastify.
- **Description**: 
  - Provides the user interface for customers.
  - Includes pages like Home, Product Details, Cart, Login, and Order Placement.
  - Uses `react-router-dom` for navigation and `react-toastify` for notifications.

### 2. **Backend**
- **Path**: `backend/`
- **Tech Stack**: Node.js, Express.js, MongoDB, Cloudinary.
- **Description**:
  - Handles API endpoints for user authentication, product management, cart operations, and order processing.
  - Includes middleware for authentication and file uploads.
  - Integrates payment gateways like Stripe and Razorpay.

### 3. **Admin Panel**
- **Path**: `admin/`
- **Tech Stack**: React.js, TailwindCSS, React Router, React Toastify.
- **Description**:
  - Provides an interface for administrators to manage the application.
  - Includes features like product management, order management, and admin authentication.

---

## Installation and Setup

### Prerequisites
- Node.js installed on your system.
- MongoDB database setup.
- Stripe and Razorpay accounts for payment integration.

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd E-Commerce
   ```

2. Install dependencies for each folder:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   cd ../admin
   npm install
   ```

3. Configure environment variables:
   - Create `.env` files in the `backend` folder with the following:
     ```
     PORT=5000
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     CLOUDINARY_NAME=<your-cloudinary-name>
     CLOUDINARY_API_KEY=<your-cloudinary-api-key>
     CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
     STRIPE_SECRET_KEY=<your-stripe-secret-key>
     RAZORPAY_KEY_ID=<your-razorpay-key-id>
     RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
     ADMIN_EMAIL=<admin-email>
     ADMIN_PASSWORD=<admin-password>
     ```

4. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

5. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

6. Start the admin panel:
   ```bash
   cd admin
   npm start
   ```

---

## API Documentation
Refer to the [Backend API Documentation](./backend/readme.md) for detailed information about the available endpoints.

---

## Screenshots
- **Frontend**: User interface for browsing and purchasing products.
- **Admin Panel**: Interface for managing products and orders.

---

## License
This project is licensed under the MIT License.
