# College Management System

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

A full-stack **college management system** with three role-based portals — **Admin**, **Faculty**, and **Student** — covering attendance, internal marks, subject assignment, and printable cryptographically-verified marksheets.

> Replace `YOUR_GITHUB_USERNAME` in the clone URL below with your GitHub username before sharing.

**[📋 Features](#-features)** · [🔐 Authentication](#-authentication) · [🚀 Setup Guide](#-setup-guide) · [🏗️ Project Structure](#️-project-structure) 

---

## ✨ Features

### 🛡️ Admin Portal

| Feature | Description |
|---|---|
| **Dashboard** | College-wide stats — total students, faculty, and courses at a glance |
| **Student Management** | Add, view, edit, and delete student records with full personal details |
| **Faculty Management** | Manage faculty accounts, qualifications, experience, and subject assignments |
| **Import Students / Faculty via Excel** | Bulk-create accounts from `.xlsx` with downloadable templates |
| **Import Marks via Excel** | Bulk upload marks per subject with a downloadable pre-filled template |
| **Course Management** | Create courses supporting both semester- and year-based systems |
| **Subject Management** | Define subjects with theory and practical max marks per course and semester |
| **Assign Subjects** | Map subjects to faculty members per course and semester |
| **Take / Edit Attendance** | Mark and correct student attendance per subject and date |
| **Enter / Edit Marks** | Record and update internal theory and practical marks per subject |
| **Attendance / Marks Reports** | Subject-wise analytics with per-student percentages and averages |
| **Print Marksheet** | A4 marksheets with QR code, watermark, seal, and signature |
| **Admin Profile** | Manage college name, logo, contact details, and signature |

### 👨‍🏫 Faculty Portal

| Feature | Description |
|---|---|
| **Dashboard** | Overview of assigned students, subjects, and classes |
| **Take / Edit Attendance** | Mark and correct attendance for assigned subjects — restricted to today (server-side enforced) |
| **Enter Marks** | Enter internal marks for assigned subjects |
| **Attendance / Marks Reports** | Analytics for assigned classes |
| **Faculty Profile** | View and update personal profile and photo |

### 👨‍🎓 Student Portal

| Feature | Description |
|---|---|
| **Dashboard** | Personal info — name, roll number, course, and semester |
| **Attendance Tracker** | Subject-wise attendance with total classes, attended count, and percentage |
| **Marksheet** | View internal marks — theory, practical, and total per subject |
| **Student Profile** | Update password and date of birth |

---

## 🔐 Authentication

| Feature | Description |
|---|---|
| **Demo Login** | One-click sign-in by selecting a registered account — no password needed. Great for quick demos and evaluations. |
| **Email + Password** | JWT-based login with bcrypt password hashing (backend fully supported; use `node resetPassword.js` to set a real password for any account) |
| **Role-based Access Control** | Middleware-enforced per-role access on every API route |
| **Faculty Attendance Restriction** | Faculty can only submit attendance for today's date — enforced server-side |
| **Active / Inactive Status** | Per-user active status + last login timestamp tracked per role |
| **SHA-256 Marksheet Verification** | Every marksheet carries a cryptographic hash of the student's marks data |
| **QR Code Verification** | Scan the QR on any printed marksheet to verify its authenticity |
| **Offline Detection** | Detects when the backend is unreachable and shows a graceful retry dialog |
| **Dark / Light Mode** | System-preference aware, persisted in localStorage |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router, Vite 7, TailwindCSS 4 |
| **Backend** | Node.js, Express 5 |
| **Database** | MySQL 8 (local Docker container via `docker-compose.yml`, or any MySQL server) |
| **Authentication** | JWT + bcrypt |
| **Excel Import/Export** | SheetJS (xlsx) + ExcelJS |
| **Marksheet** | QRCode.react, SHA-256 via Web Crypto API, jsPDF, html2canvas |

---

## 🚀 Setup Guide

### Prerequisites

- **Node.js v18+**
- **Docker** (recommended) **or** a running MySQL server

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/college-management-system.git
cd college-management-system
```

---

### Step 2 — Start MySQL

**Option A — Docker (recommended):**

```bash
docker compose up -d
```

This starts a MySQL 8 container (`cms-mysql`) and automatically imports `sql/schema.sql` on first run (user `root`, password `1234`, database `collegedata`). Adjust these in `docker-compose.yml` if needed.

**Option B — Manual MySQL:**

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS collegedata;"
mysql -u root -p collegedata < sql/schema.sql
```

---

### Step 3 — Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` to match your database and a strong `JWT_SECRET`.

Start the backend:

```bash
npm run dev
```

The API runs on **http://localhost:5000**.

---

### Step 4 — Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

Start the frontend:

```bash
npm run dev
```

Open your browser at **http://localhost:5173** ✅

---

### Signing In

The schema seeds a single **admin** account (`admin@gcekjr.ac.in`) — no data or other accounts are seeded.

- **Demo Login:** on the login page, select the account from the dropdown and click **Sign in with Demo Account**. No password required.
- **Email + Password:** the login form is ready. To set a real password for any account (e.g. to enable password login once you add more users), run:

```bash
cd backend
node resetPassword.js
```

---

## 🏗️ Project Structure

```
college-management-system/
│
├── backend/                         ← Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/             ← Route handlers (login, courses, marks, attendance, ...)
│   │   ├── routes/                  ← Express routers
│   │   ├── middleware/              ← JWT auth + role-based access control
│   │   └── config/                  ← MySQL connection (mysql2)
│   ├── uploads/                     ← Profile photos, college logo, signature (defaults shipped)
│   ├── resetPassword.js             ← CLI helper to set/reset a password for any account
│   └── server.js
│
├── frontend/                        ← React + Vite SPA
│   ├── src/
│   │   ├── pages/                   ← Admin / Faculty / Student portals
│   │   ├── components/              ← Reusable UI + layout components
│   │   └── utils/                   ← Axios API client
│   └── public/                      ← Static assets (logo, PWA manifest)
│
├── sql/
│   └── schema.sql                   ← MySQL schema (seeds admin account only)
│
├── docker-compose.yml               ← MySQL 8 container
└── .gitignore
```

---

## 🔖 Marksheet Verification System

Every generated marksheet is cryptographically verifiable:

- A **SHA-256 hash** is computed from the student's marks data and printed on the marksheet.
- A **QR code** points to `/verify/marksheet/:code`.
- Scanning the QR (or opening the verification page) confirms the student's name, roll number, course, semester, and hash — proving the marksheet is authentic and unchanged.

---

