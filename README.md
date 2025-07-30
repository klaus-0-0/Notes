# 📝 Notes App

A full-stack note-taking app built with **React + TypeScript** on the frontend and **Node.js + Express + Prisma + PostgreSQL** on the backend.

Users can sign up, create and view their personal notes, and securely store them in a cloud database — all with a responsive, modern UI.

---

## 🔗 Live Demo

- 🌐 **Frontend**: [https://notes-frontend-c3jx.onrender.com](https://notes-frontend-c3jx.onrender.com)
- 🛠️ **Backend API**: [https://notes-1v6a.onrender.com](https://notes-1v6a.onrender.com)
- 📁 **GitHub Repo**: [https://github.com/klaus-0-0/Notes](https://github.com/klaus-0-0/Notes)

---

## ✨ Features

- 🔐 User Signup/Login (email + password)
- ✍️ Create, read, and view detailed notes
- ☁️ Backend with PostgreSQL + Prisma ORM
- 🎨 Clean, responsive UI with Tailwind CSS
- 🔄 Persistent login using `localStorage`

---

## ⚙️ Tech Stack

### 🖥️ Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### 🧠 Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Render](https://render.com/)

---

## 🛠️ Run Locally

### 🔽 Clone the repo
git clone https://github.com/klaus-0-0/Notes
cd Notes

📦 Backend Setup
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

💻 Frontend Setup
cd frontend
npm install
npm run dev

✅ TODOs
 Google OAuth
 Delete notes
 Signup / SignIn failed there is no warning sign that you failed authorization !


