
# ClickMart 🛒

ClickMart is a modern, full-stack E-commerce web application built with Next.js App Router, Prisma ORM, and Redux Toolkit. It features secure authentication, dynamic product browsing, category filtering, cart management, and a user dashboard.

🔗 **Live Demo:** [https://click-mart-bd.vercel.app/](https://click-mart-bd.vercel.app/)

---

## ✨ Features

- **User Authentication:** 
  - Standard Credentials Signup & Login.
  - OAuth integration via NextAuth (Google Login).
  - JWT Access & Refresh Token authorization workflow.
- **Product & Category Showcase:**
  - Hero banner with special offers and hot deals.
  - Category-based product filtering.
  - Dynamic popular products section with discount tags.
- **Cart & Checkout Management:**
  - Seamless cart updating and checkout process powered by Redux.
- **User Dashboard & Profile:**
  - Dedicated dashboard with custom sidebar navigation.
  - Profile overview and device tracking via internal API endpoints.
- **Responsive UI/UX:**
  - Clean layout optimized for Mobile, Tablet, and Desktop screens.

---

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js (App Router with TypeScript)
- **State Management:** Redux Toolkit & React-Redux
- **Authentication:** NextAuth.js & Custom JWT Management
- **Database & ORM:** PostgreSQL / MySQL with Prisma ORM
- **Styling:** Tailwind CSS & Lucide Icons
- **Deployment:** Vercel

---

## 📁 Project Structure

```text
public/                     # Static assets (SVGs, Icons)
src/
├── app/                    # Next.js App Router structure
│   ├── (auth)/             # Login and Registration routes
│   ├── (HomePage)/         # Hero, Popular Products, Banner components
│   ├── (ProductsPage)/     # Product listing pages
│   ├── api/                # API routes (Auth, Users, Device Info)
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout page
│   ├── dashboard/          # User Dashboard & Profile
│   └── layout.tsx          # Global Root Layout
├── components/             # Reusable UI & Layout Components
├── generated/prisma/       # Generated Prisma Client & Typings
├── Hooks/                  # Axios Instances & Custom Hooks
├── lib/                    # Prisma client, JWT, and Auth Helpers
├── Provider/               # NextAuth, Redux, and Auth Providers
└── redux/                  # Redux Store & Auth Slices

```

---

## 🚀 Getting Started

Follow these steps to set up and run ClickMart locally on your machine:

### 1. Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A running PostgreSQL or MySQL database instance

### 2. Clone the Repository

```bash
git clone [https://github.com/mahialamDev/click-mart.git](https://github.com/mahialamDev/click-mart.git)
cd click-mart

```

### 3. Install Dependencies

```bash
npm install

```

### 4. Environment Setup

Create a `.env` file in the root directory and configure the environment variables:

```env
DATABASE_URL="your_database_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

```

### 5. Setup Prisma ORM

Run migrations and generate the Prisma client:

```bash
npx prisma generate
npx prisma db push

```

### 6. Run Development Server

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🌐 API Routes Overview

* `POST /api/auth/register` — Handles user registration.
* `POST /api/auth/login` — Authenticates user credentials.
* `GET /api/auth/me` — Fetches active logged-in user profile.
* `POST /api/auth/refresh` — Refreshes expired access tokens.
* `GET /api/users` — Fetches user list (Admin access).
* `GET /api/device-info` — Logs device connection parameters.

---

## 📄 License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```
