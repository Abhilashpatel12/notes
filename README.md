# Full-Stack Note-Taking Application

A secure, feature-rich, and modern full-stack note-taking application built with React, TypeScript, and Node.js. This project features a robust authentication system, a Markdown-enabled note editor, and a comprehensive, multi-layered security implementation designed to protect against a wide range of web vulnerabilities.

### 🚀 Live Demo

**[YOUR_DEPLOYED_FRONTEND_URL]**

### 📸 Screenshot: Dashboard

Below is a screenshot of the main application dashboard where users can manage their notes.

*(Note: Replace this link with a publicly accessible URL of your screenshot, like one uploaded to Imgur)*

### ✨ Core Features

* **Complete Authentication Suite:**
    * Secure user signup with email and password.
    * **OTP Verification** via email for new account activation.
    * Seamless **Sign in with Google** (OAuth 2.0).
    * JWT-based session management for secure API access.
* **Dynamic Note Management:**
    * Create, view, and delete personal notes.
    * **Markdown Editor** with a live preview for creating rich, formatted notes.
* **User-Friendly Interface:**
    * A clean, responsive, and mobile-first design replicated from Figma mockups.
    * Protected routes to ensure only authenticated users can access the dashboard.
    * Clear error messaging and a smooth, multi-step authentication flow.

### 💻 Technology Stack

| Category     | Technology                               |
|--------------|------------------------------------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS    |
| **Backend** | Node.js, Express.js, TypeScript          |
| **Database** | MongoDB with Mongoose                    |
| **Auth** | JWT, Passport.js, Google OAuth, bcryptjs |
| **Deployment**| Frontend on Vercel, Backend on Render    |

### 🛡️ Comprehensive Security Implementation

This application was built with a security-first mindset, incorporating multiple layers of protection against common web vulnerabilities.

#### 1. Rate Limiting

* **General Routes:** 100 requests per 15 minutes per IP.
* **Authentication Routes:** Stricter limit of 20 requests per 15 minutes per IP.
* **Configurable:** Settings are managed via environment variables.

#### 2. HTTP Security Headers (Helmet)

* **Content Security Policy (CSP):** Controls which resources can be loaded to prevent XSS attacks.
* **HTTP Strict Transport Security (HSTS):** Enforces the use of HTTPS.
* **X-Frame-Options & X-Content-Type-Options:** Protects against clickjacking and MIME-sniffing.

#### 3. Input Protection & Sanitization

* **NoSQL Injection Prevention:** Uses `express-mongo-sanitize` to strip malicious characters from user input.
* **HTTP Parameter Pollution (HPP):** Prevents parameter pollution attacks.
* **Request Size Limits:** Imposes a 10MB limit on request payloads.

#### 4. CORS (Cross-Origin Resource Sharing)

* **Origin Control:** The API is strictly configured to only accept requests from the deployed frontend URL.
* **Credentials Support:** Allows secure transmission of authentication headers.

#### 5. Authentication & Authorization

* **JWT-based Authentication:** Secure, stateless token system with a 1-day expiration.
* **Password Hashing:** Uses `bcryptjs` with a salt round of 10.
* **Protected Routes:** Server-side middleware ensures only authenticated users can access note data.

#### 6. Request Logging & Monitoring

* **Development & Production Logging:** Provides detailed request logging tailored for different environments.
* **Error & 404 Tracking:** Logs all failed requests and errors for monitoring.

#### 7. Secure Error Handling

* **No Information Disclosure:** Production error messages are generic and do not leak sensitive stack traces or system information.

#### 8. Data Protection

* **Password Security:** Passwords are never stored in plain text and are excluded from all API responses.
* **OTP Security:** One-Time Passwords are used for verification and are cleared from the database after use.

#### 9. Server Hardening

* **Graceful Shutdown:** The server is configured to shut down gracefully, preventing data corruption.
* **Error Handling:** Catches and handles unhandled promise rejections and uncaught exceptions.

### 🔧 How to Run Locally

To get a local copy up and running, follow these simple steps.

**Prerequisites:**

* Node.js (v18+)
* npm or yarn
* Git
* A MongoDB database instance (local or on Atlas)

#### **1. Clone the repository:**

```sh
git clone [YOUR_REPOSITORY_URL]
cd [REPOSITORY_NAME]
