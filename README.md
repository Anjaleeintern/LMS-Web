# 🎓 LMS App (Learning Management System)

A full-stack Learning Management System built using MERN-style architecture (React + Node.js + SQLite).

---

## 🚀 Features

### 👨‍🎓 Student

* Browse courses
* Enroll with full name
* Watch lessons (video + text)
* Mark lessons as completed
* Real-time progress tracking (0–100%)
* Continue learning flow

### 👨‍🏫 Instructor

* Create, update, delete courses
* Add lessons (video + text)
* View student enrollments
* Track student progress (course-wise)

---

## 📊 Key Highlights

* ✅ Real progress calculation (lesson-based)
* ✅ Secure authentication (JWT)
* ✅ Course enrollment system
* ✅ Instructor analytics dashboard
* ✅ Clean UI with responsive design

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* SQLite

---

## 📂 Project Structure

```
LMS-App/
 ├── backend/
 ├── frontend/
 ├── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```
git clone https://github.com/YOUR_USERNAME/lms-app.git
cd lms-app
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` in backend:

```
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 🌐 API Endpoints

* POST /api/auth/register
* POST /api/auth/login
* GET /api/courses
* POST /api/enrollments
* GET /api/progress

---

## 📈 Future Enhancements

* Quiz generation (AI-based)
* Certificate generation
* Payment integration
* Leaderboard system

---

## 👩‍💻 Author

**Anjalee Bisen**

---

## ⭐ If you like this project, give it a star!
