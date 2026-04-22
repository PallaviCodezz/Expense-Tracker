# Expense-Tracker

A full-stack expense tracking application with separate backend and frontend services.

## About the project

Expense-Tracker helps users manage personal finances in one place.  
You can create an account, log income and expenses, view dashboard summaries, and manage profile details securely using JWT-based authentication.

## Features

- User signup and login with JWT authentication
- Add, edit, delete, and view income records
- Add, edit, delete, and view expense records
- Dashboard overview for financial tracking
- Profile management and password update support
- Frontend and backend separated for clean project structure

## Tech stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas + Mongoose
- Authentication: JWT + bcrypt

## Project structure

```text
ExpenseTracker/
  backend/    # Express API, MongoDB models, routes, controllers
  frontend/   # React application (Vite)
```

## Setup

Install dependencies in both apps:

```bash
cd ExpenseTracker/backend
npm install

cd ../frontend
npm install
```

## Run the project

Open two terminals from the project root.

### Terminal 1

```bash
cd ExpenseTracker/backend
npm run dev
```

### Terminal 2

```bash
cd ExpenseTracker/frontend
npm run dev
```

## API base URL (development)

- Backend API: `http://localhost:4000/api`
- Frontend app: `http://localhost:5173` (or the next available Vite port)
