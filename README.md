# 🏎️ Aurelia Motors — Luxury Automotive Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-10.4.15-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4.1-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A full-stack, enterprise-grade digital showroom and administrative management system engineered for luxury and high-performance automotive dealerships. Built with **Next.js 15**, **React 19**, **NestJS**, **Prisma ORM**, and **PostgreSQL**.

---

## 🌟 Key Features

### 🏛️ Public Showroom & Experience
- **Hero & Curated Showcase**: Premium dark-luxury design system, responsive animations powered by Framer Motion, and high-resolution automotive imagery.
- **Dynamic Vehicle Catalog**: Real-time multi-criteria filtering by brand, category, fuel type, transmission, price range, and stock availability.
- **Comprehensive Vehicle Detail Pages**: Rich specification breakdowns, high-resolution galleries, engine & transmission dynamics, warranty info, and financing calculators.
- **Side-by-Side Comparison Engine**: Compare technical specs, power, performance, dimensions, and pricing of up to 3 vehicles simultaneously.
- **Interactive Customer Engagement**:
  - 📅 **Test Drive Booking**: Real-time slot selection with preferred dealership branch mapping.
  - 📩 **Enquiry & Consultation Modals**: Direct lead capture for prospective buyers.
  - 🏷️ **Promotional Offers & Exclusives**: Active seasonal campaigns with countdown timers and instant enquiry triggers.
- **Branch Locator**: Interactive showroom directory with Google Maps integration, operating hours, and direct contact details.

### 🛡️ Administrative Portal (`/admin`)
- **Role-Based Access Control (RBAC)**: Fine-grained security supporting `SUPER_ADMIN`, `ADMIN`, `MANAGER`, `SALES_STAFF`, and `CUSTOMER`.
- **Real-Time Analytics Dashboard**: Visual metrics on fleet status, enquiry volumes, quotation conversion, and test drive schedules using Recharts.
- **Fleet & Inventory Management**: Full CRUD operations for vehicles, brands, categories, high-res galleries, and technical specifications.
- **Dealership Branch Management**: Multi-location showroom management, manager assignments, and operational tracking.
- **Lead & Customer Request Pipelines**:
  - Manage and qualify customer **Enquiries**.
  - Review and confirm **Test Drive Appointments**.
  - Generate, review, and track customized **Quotations** and discounts.
  - Manage marketing **Offers & Promotions**.

---

## 🏗️ Architecture & Tech Stack

```
AURELIA MOTORS/
├── frontend/                 # Next.js 15 (App Router, React 19, Tailwind CSS, TanStack Query)
│   ├── app/
│   │   ├── (public)/         # Public routes: Home, Vehicles, Brands, Compare, Offers, About, Contact
│   │   └── admin/            # Protected Admin Dashboard routes
│   ├── components/           # UI components, form modals, vehicle cards, layout
│   ├── lib/                  # API client, utility functions, constants
│   └── types/                # TypeScript interfaces & enums
└── backend/                  # NestJS modular architecture with Prisma ORM
    ├── prisma/               # Database schema and comprehensive seed data
    └── src/
        ├── common/           # Guards, interceptors, decorators, filters
        ├── modules/          # Auth, Users, Vehicles, Brands, Categories, Branches,
        │                     # Enquiries, Test-Drives, Quotations, Offers, Dashboard
        └── prisma/           # Prisma service and connection lifecycle
```

### 💻 Technology Breakdown

| Domain | Technologies |
|---|---|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Recharts, React Hook Form, Zod, TanStack React Query |
| **Backend** | NestJS, TypeScript, Passport.js, JWT Authentication, Bcrypt, Class Validator, Helmet, Swagger / OpenAPI |
| **Database & ORM** | PostgreSQL, Prisma ORM |

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** >= 18.x (v20+ recommended)
- **npm** >= 9.x
- **PostgreSQL** instance running locally or hosted (e.g. Supabase, Neon, Railway)

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/puvanakopis/aurelia-motors.git
cd aurelia-motors
```

---

### 2️⃣ Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file inside `backend/`:
   ```env
   # PostgreSQL Database Connection
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/aurelia_motors?schema=public"

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Security
   JWT_SECRET="aurelia-luxury-motors-secret-key-change-in-prod"
   JWT_EXPIRES_IN="7d"

   # CORS Configuration
   FRONTEND_URL="http://localhost:3000"
   ```

3. **Run Prisma Migrations & Seed Initial Fleet Data**:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Start the Backend Server**:
   ```bash
   npm run dev
   ```
   > 🚀 Backend API will be live at: `http://localhost:5000`  
   > 📖 Swagger API Docs: `http://localhost:5000/api/docs`

---

### 3️⃣ Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd ../frontend
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file inside `frontend/`:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```

3. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```
   > 🌐 Frontend Application will be live at: `http://localhost:3000`

---

## 🔐 Default Admin Credentials

Upon running `npx prisma db seed`, default user accounts are automatically created:

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@aureliamotors.com` | `Admin@123` |
| **Sales Manager** | `manager@aureliamotors.com` | `Manager@123` |
| **Sales Staff** | `sales@aureliamotors.com` | `Sales@123` |

---

## 📡 REST API Summary

| Endpoint Group | Description |
|---|---|
| `/api/auth/*` | Login, registration, token refresh, and profile retrieval |
| `/api/vehicles/*` | Vehicle listing, advanced filters, specs, and stock management |
| `/api/brands/*` | Brand catalog and associated models |
| `/api/categories/*` | Category classifications (Sports, SUV, Electric, Sedan, etc.) |
| `/api/branches/*` | Dealership branches, operational details, and contacts |
| `/api/enquiries/*` | Customer general enquiries and lead lifecycle tracking |
| `/api/test-drives/*` | Test drive scheduling, time-slots, and confirmation |
| `/api/quotations/*` | Price quotes, financing breakdown, and status management |
| `/api/offers/*` | Special promotional campaigns and limited-time deals |
| `/api/dashboard/*` | Real-time analytics, KPIs, and revenue metrics for managers |

---

## 🛠️ Available Scripts

### Backend (`/backend`)
- `npm run dev` — Run development server with hot reload
- `npm run build` — Build production application
- `npm run start:prod` — Run compiled production build
- `npx prisma studio` — Open visual database browser

### Frontend (`/frontend`)
- `npm run dev` — Start Next.js development server
- `npm run build` — Create optimized production bundle
- `npm run start` — Start production server
- `npm run lint` — Run ESLint code checks

---

## 📄 License
This project is proprietary and maintained by the **Aurelia Motors** development team.
