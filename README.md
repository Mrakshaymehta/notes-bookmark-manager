# 📚 Personal Notes & Bookmark Manager

A full-stack web application that allows users to manage their personal notes and bookmarks in one place. The app is designed to be lightweight, clean, and easy to use — with support for filtering by tags, text search, marking favorites, and viewing saved data with a responsive UI.

It’s perfect for organizing your thoughts, saving useful links, and staying productive without clutter. Built with a modern tech stack — Next.js, Express, and MongoDB — it demonstrates clean architecture, full CRUD APIs, responsive UI design, and good state/data handling practices.

---

## 🚀 Features

### 📝 Notes
- Create, read, update, and delete notes
- Add multiple tags to each note
- Filter notes by text or tags
- Toggle favorite ★ for important notes
- Real-time updates on UI

### 🔖 Bookmarks
- Save bookmarks with a URL, title, and optional description
- Filter bookmarks by text or tags
- Automatically fetches metadata like title if left empty (optional enhancement)
- Toggle favorite ★ for important bookmarks
- View links in a new tab

---

## 🧱 Tech Stack

- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (via Mongoose)
- **Other:** REST API, dotenv, nodemon, CORS

---

## 📂 Folder Structure

notes-bookmark-manager/  
├── backend/         → Express REST API  
│   ├── models/      → Mongoose schemas  
│   ├── controllers/ → Route logic  
│   ├── routes/      → Route definitions  
│   └── server.js    → API entry point  
├── frontend/        → Next.js frontend app  
│   └── app/         
│       ├── notes/       → /notes route  
│       └── bookmarks/   → /bookmarks route  
├── .env             → Environment variables  
└── README.md        → You're reading it

---

## ⚙️ Getting Started

1. Clone the repo
git clone https://github.com/Mrakshaymehta/notes-bookmark-manager.git
cd notes-bookmark-manager

2. Backend Setup
cd backend
npm install

Create a `.env` file in the backend folder:
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes_bookmarks

Start the backend:
npm run dev
Runs at: http://localhost:5000

3. Frontend Setup
Open a new terminal:
cd frontend
npm install
npm run dev
Runs at: http://localhost:3000

## 🧪 API Endpoints

### Notes
GET     /api/notes  
POST    /api/notes  
GET     /api/notes/:id  
PUT     /api/notes/:id  
DELETE  /api/notes/:id  
PATCH   /api/notes/:id/favorite  

### Bookmarks
GET     /api/bookmarks  
POST    /api/bookmarks  
GET     /api/bookmarks/:id  
PUT     /api/bookmarks/:id  
DELETE  /api/bookmarks/:id  
PATCH   /api/bookmarks/:id/favorite  

Filters:
- ?q=searchText
- ?tags=tag1,tag2

## ✅ Status
✅ Notes CRUD  
✅ Bookmarks CRUD  
✅ Favorites  
✅ Filtering  
✅ Search  
✅ MongoDB integration  
✅ Responsive UI

## ✍️ Author
Akshay Mehta  
https://github.com/Mrakshaymehta

## 📌 License
This project is open-source and free to use.
