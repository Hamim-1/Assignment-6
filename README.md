# 📦 Parcel Delivery System - Frontend

🌐 **Live Link**: https://assignment-6-snuv.onrender.com/

## 🎯 Overview
A role-based parcel delivery management system built with React, Redux Toolkit, and RTK Query. Senders can create parcels, Receivers can confirm deliveries, and Admins can manage everything.

## 🚀 Tech Stack
- React + TypeScript
- Redux Toolkit + RTK Query
- React Router
- Tailwind CSS
- React Hot Toast (notifications)

## ⚙️ Setup & Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Hamim-1/Assignment-6.git
cd Assignment-6
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup environment variables
```bash
cp .env.example .env
```

**.env file example:**
```env
VITE_BASE_URL=http://localhost:5000/api/v1
```

### 4️⃣ Run the development server
```bash
npm run dev
```
Server will run on: 👉 **http://localhost:5173**

### 5️⃣ Build for production
```bash
npm run build
```

## 👥 User Roles & Features

| Role | Features |
|------|----------|
| **Admin** | Manage users (block/unblock), view all parcels, update delivery status |
| **Sender** | Create parcels, cancel if not dispatched, view own parcels & tracking |
| **Receiver** | View incoming parcels, confirm delivery, view delivery history |

## 🔑 Test Credentials

**Admin:**
```
Email: admin@gmail.com
Password: Pass123!
```

**Sender:**
```
Email: sender@gmail.com
Password: Pass123!
```

**Receiver:**
```
Email: receiver@gmail.com
Password: Pass123!
```

## 📦 Key Features
- ✅ JWT-based authentication with role-based access
- ✅ Real-time parcel tracking with status timeline
- ✅ Dashboard with statistics and analytics
- ✅ Advanced search and filtering
- ✅ Pagination for large datasets
- ✅ Toast notifications for user feedback
- ✅ Global error handling
- ✅ Fully responsive design

## 📜 Parcel Status Flow
```
REQUESTED → PICKED → IN_TRANSIT → DELIVERED
           ↘ CANCELED (if not dispatched)
```

## 🔗 Backend Repository
[Backend API Link](https://github.com/Hamim-1/Assignment-5)

---
