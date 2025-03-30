# Backend API Documentation

This document provides details about the API endpoints available in the backend of the E-Commerce application.

---

## Base URL
```
http://<your-server-domain>:<port>/api
```

---

## Endpoints

### User Routes (`/api/user`)
- **Description**: Handles user-related operations.
- **Endpoints**: Not provided in the current codebase. Add documentation here if available.

---

### Product Routes (`/api/product`)
- **Description**: Handles product-related operations.
- **Endpoints**: Not provided in the current codebase. Add documentation here if available.

---

### Cart Routes (`/api/cart`)
- **Description**: Handles cart-related operations.
- **Endpoints**: Not provided in the current codebase. Add documentation here if available.

---

### Order Routes (`/api/order`)

#### **Admin Routes**
1. **POST `/list`**
   - **Description**: Fetches all orders (Admin only).
   - **Required Data**: None.
   - **Status Codes**:
     - `200`: Success.
     - `401`: Unauthorized (if AdminAuth fails).

2. **POST `/status`**
   - **Description**: Updates the status of an order (Admin only).
   - **Required Data**:
     ```json
     {
       "orderId": "string",
       "status": "string"
     }
     ```
   - **Status Codes**:
     - `200`: Success.
     - `400`: Bad Request.
     - `401`: Unauthorized (if AdminAuth fails).

#### **Payment Routes**
3. **POST `/place`**
   - **Description**: Places an order using Cash on Delivery (COD).
   - **Required Data**:
     ```json
     {
       "cartId": "string",
       "address": "string"
     }
     ```
   - **Status Codes**:
     - `201`: Order placed successfully.
     - `400`: Bad Request.
     - `401`: Unauthorized (if authUser fails).

4. **POST `/stripe`**
   - **Description**: Places an order using Stripe payment.
   - **Required Data**:
     ```json
     {
       "cartId": "string",
       "address": "string",
       "paymentIntentId": "string"
     }
     ```
   - **Status Codes**:
     - `201`: Order placed successfully.
     - `400`: Bad Request.
     - `401`: Unauthorized (if authUser fails).

5. **POST `/razorpay`**
   - **Description**: Places an order using Razorpay payment.
   - **Required Data**:
     ```json
     {
       "cartId": "string",
       "address": "string",
       "paymentId": "string"
     }
     ```
   - **Status Codes**:
     - `201`: Order placed successfully.
     - `400`: Bad Request.
     - `401`: Unauthorized (if authUser fails).

#### **User Features**
6. **POST `/userorders`**
   - **Description**: Fetches all orders of the authenticated user.
   - **Required Data**: None.
   - **Status Codes**:
     - `200`: Success.
     - `401`: Unauthorized (if authUser fails).

#### **Verification Payment**
7. **POST `/verifyStripe`**
   - **Description**: Verifies Stripe payment.
   - **Required Data**:
     ```json
     {
       "paymentIntentId": "string"
     }
     ```
   - **Status Codes**:
     - `200`: Payment verified successfully.
     - `400`: Bad Request.
     - `401`: Unauthorized (if authUser fails).

---

## Notes
- Ensure to replace `<your-server-domain>` and `<port>` with the actual server details.
- Authentication middleware (`AdminAuth` and `authUser`) is required for protected routes.
