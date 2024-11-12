[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/4O8cgR-D)

# International Payment Portal

![International Payment Portal Banner](https://via.placeholder.com/1200x300?text=International+Payment+Portal)

Welcome to the **International Payment Portal**, a secure and efficient platform designed for seamless international transactions between users. This web application allows customers to register, authenticate, and manage their international payments, while administrators can oversee and approve transactions, as well as manage employee accounts.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Default Admin Account](#default-admin-account)
- [Security Measures](#security-measures)
- [Local SSL Setup](#local-ssl-setup)
- [Usage](#usage)
  - [User Functionalities](#user-functionalities)
  - [Admin Functionalities](#admin-functionalities)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### User Functionalities

- **User Registration & Authentication:**
  - Secure registration with personal and account details.
  - Login functionality with JWT-based authentication.
  
- **International Payments:**
  - Send payments internationally using SWIFT codes.
  - View transaction history and account balance.
  
- **Secure Data Handling:**
  - All sensitive information is encrypted and securely stored.
  
### Admin Functionalities

- **Payment Management:**
  - View pending international payments.
  - Approve or reject transactions.
  
- **Employee Management:**
  - Add new employees with secure credentials.
  - Manage existing employee accounts.
  
- **System Oversight:**
  - Monitor all transactions and ensure compliance with banking standards.

## Demo

Watch our demo video to see the **International Payment Portal** in action:

[![Demo Video](https://img.youtube.com/vi/pwen7eRoE7c/0.jpg)](https://youtu.be/pwen7eRoE7c)

## Technologies Used

### Frontend

- **React.js:** Building dynamic user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **React Router:** Client-side routing.
- **Lucide-React:** Icon library for UI enhancement.

### Backend

- **Node.js & Express.js:** Server-side runtime and framework.
- **MongoDB:** NoSQL database for data storage.
- **Mongoose:** ODM for MongoDB.
- **JWT (JSON Web Tokens):** Authentication and authorization.
- **Bcrypt:** Password hashing for security.

### Additional Tools

- **ESLint:** Code linting for maintaining code quality.
- **Prettier:** Code formatting.
- **Webpack:** Module bundler.
- **Local SSL Certificates:** Secure local development environment.

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js & npm:** [Download and Install](https://nodejs.org/)
- **MongoDB:** [Download and Install](https://www.mongodb.com/try/download/community)
- **Git:** [Download and Install](https://git-scm.com/downloads)

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/international-payment-portal.git
   cd international-payment-portal/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `backend` directory and add the following:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/international_payment_portal
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start MongoDB:**

   Ensure MongoDB is running. You can start it using:

   ```bash
   mongod
   ```

5. **Seed the Database with Default Admin:**

   The application comes with a default admin account. To seed the database, run:

   ```bash
   npm run seed
   ```

### Frontend Setup

1. **Navigate to Frontend Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Running the Application

### Backend

1. **Start the Backend Server:**

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`.

### Frontend

1. **Start the Frontend Development Server:**

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

2. **Access the Application:**

   Open your browser and navigate to `http://localhost:3000` to access the **International Payment Portal**.

## Default Admin Account

For initial access, use the following default admin credentials:

- **Email:** `dummy@admin.com`
- **Password:** `Admin123`

**Note:** It is highly recommended to change the default admin password immediately after the first login to maintain system security.

## Security Measures

The **International Payment Portal** incorporates multiple security measures to ensure data integrity and protect user information:

1. **Authentication & Authorization:**
   - **JWT-Based Authentication:** Secure user sessions with JSON Web Tokens.
   - **Role-Based Access Control:** Differentiate access levels between users and admins.

2. **Data Protection:**
   - **Password Hashing:** User passwords are hashed using `bcrypt` before storage.
   - **Input Validation:** All inputs are validated to prevent SQL injection and XSS attacks.
   - **HTTPS:** All data transmission is secured using SSL/TLS.

3. **Database Security:**
   - **MongoDB Security:** Configured with authentication and authorization mechanisms.
   - **Data Encryption:** Sensitive data is encrypted at rest and in transit.

4. **Error Handling:**
   - **Graceful Error Responses:** Avoid exposing sensitive information through error messages.
   - **Logging:** Server-side logging for monitoring and auditing purposes.

5. **Environment Variables:**
   - **Secure Configuration:** Sensitive information such as database URIs and JWT secrets are stored in environment variables.

## Local SSL Setup

To ensure secure local development, the application uses locally signed SSL certificates. Follow the steps below to set up SSL for your local environment:

1. **Generate SSL Certificates:**

   Use OpenSSL to generate a self-signed certificate:

   ```bash
   openssl req -nodes -new -x509 -keyout server.key -out server.cert
   ```

   Fill in the required information when prompted.

2. **Configure Express to Use SSL:**

   Update your `server.js` or `app.js` file in the backend to use HTTPS:

   ```javascript
   const fs = require('fs');
   const https = require('https');
   const express = require('express');
   const app = express();

   // Middleware and routes setup

   const PORT = process.env.PORT || 5000;

   const sslOptions = {
     key: fs.readFileSync('path/to/server.key'),
     cert: fs.readFileSync('path/to/server.cert'),
   };

   https.createServer(sslOptions, app).listen(PORT, () => {
     console.log(`Server is running on https://localhost:${PORT}`);
   });
   ```

3. **Trust the Certificate in Your Browser:**

   Since the certificate is self-signed, your browser will warn you about the connection. Proceed to trust the certificate for local development.

**Note:** Self-signed certificates are **not** recommended for production environments. Use certificates issued by trusted Certificate Authorities (CAs) for live applications.

## Usage

### User Functionalities

1. **Register:**
   - Navigate to the registration page.
   - Complete the multi-step form with your personal and account details.
   - Submit the form to create a new account.

2. **Login:**
   - Navigate to the login page.
   - Enter your registered email and password.
   - Access your dashboard upon successful authentication.

3. **Make International Payments:**
   - Access the "Make a Payment" section in your dashboard.
   - Enter the recipient's account details and SWIFT code.
   - Confirm and send the payment.

4. **View Statements:**
   - Access the "View Statements" section to review your transaction history.

### Admin Functionalities

1. **Login as Admin:**
   - Use the default admin credentials or your own admin account to log in.

2. **Approve or Reject Payments:**
   - Navigate to the admin dashboard.
   - View pending payments and approve or reject them accordingly.

3. **Add New Employees:**
   - Use the "Add Admin" section to create new employee accounts.
   - Provide necessary details such as name, email, and secure passwords.

4. **Manage Employees:**
   - Oversee and manage existing employee accounts and permissions.

## Contributing

Contributions are welcome! If you'd like to contribute to the **International Payment Portal**, please follow these steps:

1. **Fork the Repository:**

   Click the "Fork" button at the top-right corner of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/yourusername/international-payment-portal.git
   cd international-payment-portal
   ```

3. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Commit Your Changes:**

   ```bash
   git commit -m "Add Your Feature"
   ```

5. **Push to Your Fork:**

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Open a Pull Request:**

   Navigate to the original repository and click "Compare & pull request."

## License

This project is licensed under the [MIT License](LICENSE).



