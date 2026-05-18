# Job Tracker

A full-stack job application tracking platform built with React, TypeScript, Node.js, Express, and MongoDB.

This project allows users to organize and manage their job search process through a clean dashboard interface with authentication, protected routes, and persistent job tracking.

---

# Features

## Authentication

- User registration and login
- JWT-based authentication
- Protected API routes
- Persistent login sessions
- Secure password handling

## Job Tracking

- Create job applications
- Edit existing applications
- Delete applications
- View all saved jobs
- Track company, status, and other job details

## Frontend

- Built with React + TypeScript
- Responsive UI
- Component-based architecture
- API service layer separation
- Route-based navigation

## Backend

- Express REST API
- MongoDB database integration
- Mongoose models and schemas
- Zod validation
- Middleware-based authentication
- Structured backend architecture

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router

## Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Zod

---

# Project Structure

## Frontend

```txt
src/
  components/
  services/
  routes/
  constants/
  types/
```

## Backend

```txt
src/
  controllers/
  middleware/
  models/
  routes/
  services/
  validators/
  config/
```

---

# Screenshots

## Login Page

<img width="2063" height="1178" alt="image" src="https://github.com/user-attachments/assets/73b4131c-08b8-42b8-8c9e-5eb8d83bd7be" />

## Dashboard

<img width="2164" height="1183" alt="image" src="https://github.com/user-attachments/assets/d4d79bb6-1ca1-4798-bb25-bcff07174b1d" />
<img width="2107" height="1186" alt="image" src="https://github.com/user-attachments/assets/7adb6267-537b-441b-9044-2161ebfde529" />

---

# Installation

## Clone the repositories

### Frontend

```bash
git clone https://github.com/steven0710/Job-Tracker.git
```

### Backend

```bash
git clone https://github.com/steven0710/Job-Tracker-Backend.git
```

---

# Frontend Setup

```bash
cd Job-Tracker
npm install
npm run dev
```

---

# Backend Setup

```bash
cd Job-Tracker-Backend
npm install
npm run dev
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

# API Overview

## Authentication Routes

| Method | Route                | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

## Job Routes

| Method | Route           | Description  |
| ------ | --------------- | ------------ |
| GET    | `/api/jobs`     | Get all jobs |
| POST   | `/api/jobs`     | Create job   |
| PUT    | `/api/jobs/:id` | Update job   |
| DELETE | `/api/jobs/:id` | Delete job   |

---

# Security & Validation

This project includes:

- JWT authentication middleware
- Protected routes
- Request validation using Zod
- User ownership checks for job data
- Environment variable configuration

---

# What I Learned

While building this project, I gained experience with:

- Full-stack application architecture
- REST API design
- Authentication flows
- MongoDB schema modeling
- TypeScript integration across frontend and backend
- Form validation and error handling
- Deployment considerations
- Structuring scalable applications

---

# Future Improvements

Potential future features include:

- Search and filtering
- Kanban-style job board
- Interview tracking
- Analytics dashboard
- Resume upload support
- Docker support
- CI/CD pipeline
- Automated follow-up reminders

---

# Live Demo

(Add deployed frontend link here)

---

# Author

Steven Hu

GitHub:

- [https://github.com/steven0710/Job-Tracker](https://github.com/steven0710/Job-Tracker)
- [https://github.com/steven0710/Job-Tracker-Backend](https://github.com/steven0710/Job-Tracker-Backend)
