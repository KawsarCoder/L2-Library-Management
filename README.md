# 📚 Library Management System

A RESTful API project built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)** to manage a library's book inventory and borrowing system.

## 🚀 Features

- 📘 **Create Book** – Add a new book to the library's collection.
- 📗 **Retrieve All Books** – Fetch all books with support for filtering, sorting, and pagination.
- 📙 **Get Book by ID** – Fetch detailed information of a specific book.
- 📒 **Update Book** – Modify existing book details (e.g., copies, title).
- 🗑️ **Delete Book** – Remove a book from the collection.
- 📥 **Borrow Book** – Record a borrowed book, update availability and reduce quantity.
- 📊 **Borrow Summary** – Aggregate borrow records by book with quantity, title, and ISBN.

---

## ✅ API Endpoints

| #   | Method | Endpoint           | Description                  |
| --- | ------ | ------------------ | ---------------------------- |
| 1   | POST   | `/api/books`       | Add a new book               |
| 2   | GET    | `/api/books`       | Retrieve all books           |
| 3   | GET    | `/api/books/:id`   | Retrieve a book by ID        |
| 4   | PUT    | `/api/books/:id`   | Update a book’s information  |
| 5   | DELETE | `/api/books/:id`   | Delete a book                |
| 6   | POST   | `/api/borrow`      | Borrow a book                |
| 7   | GET    | `/api/borrow`      | Get borrow summary (report)  |

---

## 📁 Project Folder Structure

```
src/
├── app/
│ ├── controller/
│ │ ├── books.controller.ts
│ │ └── borrow.controller.ts
│ ├── interface/
│ │ ├── books.interface.ts
│ │ └── borrow.interface.ts
│ ├── middlewares/
│ │ ├── notFoundHandler.ts
│ │ └── errorHandler.ts
│ ├── model/
│ │ ├── books.model.ts
│ │ └── borrow.model.ts
├── config/
│ └── index.ts
├── app.ts
└── server.ts
```


## 🛠️ Getting Started Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/library-management.git
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Environment Configuration
Create a .env file in the root directory and add:

```bash
PORT=5000
DATABASE_URL=your_mongodb_connection_string
```

Replace your_mongodb_connection_string with your actual MongoDB URI.

### 4️⃣ Run Development Server

```bash
npm run dev
```

```vbnet
Library Management Connected to MongoDB
Library Management Running on port 5000
```

## 🌐 API Base URL

```arduino
http://localhost:5000/
```

## 📦 Repository & Deployment
### 🔗 GitHub Repositories
Frontend: Your Frontend Repo

Backend: Your Backend Repo

### 🚀 Live URLs
Frontend: Live Frontend

Backend API: Live Backend