# 🐦 X Clone - Twitter Full Stack Clone (MERN)

A full-featured **Twitter clone** built from scratch using the powerful **MERN stack**, with modern UI components and advanced features like authentication, posting (text/image), real-time notifications, follow users, image uploads, and full responsiveness.

---

## ✨ Overview

X Clone is a personal full-stack project that replicates core Twitter functionality using the **MERN stack**. The project includes a beautifully designed UI with a mobile-first approach, real-time features, secure authentication, and a clean modular architecture. It demonstrates practical skills in scalable frontend design, backend API development, cloud-based image storage, and reactive data handling.

---

## 🚀 Live Demo

> 🔗 _Deployment links will be added soon_

---

## 🛠️ Tech Stack

### 🌐 Frontend

- ⚛️ **React.js**
- ⚡ **Vite**
- 🧭 **React Router DOM v7**
- 🎨 **Tailwind CSS + DaisyUI**
- 🔄 **React Query (TanStack v5)**
- 🪝 **React Hook Form**
- 🎭 **React Icons & Lucide React**
- 🍞 **React Hot Toast**

### 🧠 Backend

- 🟢 **Node.js**
- 🚂 **Express.js v5**
- 🍃 **MongoDB (Mongoose)**
- 🔐 **JWT (Authentication)**
- ☁️ **Cloudinary (Image Storage)**
- ⚙️ **Dotenv for configuration**
- 🍪 **Cookie Parser**
- 🌍 **CORS**

---

## 📁 Project Structure

```
x-clone/
├── backend/
│   └── src/
│       ├── controllers/    # Route logic (auth, posts, users, etc.)
│       ├── errors/         # Custom error classes and handlers
│       ├── lib/            # Shared modules (e.g., db connection, Cloudinary)
│       ├── middleware/     # Auth & error handling middleware
│       ├── models/         # Mongoose models
│       ├── routes/         # API endpoints
│       ├── utils/          # Utility functions (JWT, catchAsync, etc.)
│       └── server.js       # Main server entry point
├── frontend/
│   └── src/
│       ├── components/     # Reusable UI components (Post, Button, etc.)
│       ├── hooks/          # Custom React hooks (useFollow, useAuthUser)
│       ├── pages/          # React Router pages (Home, Profile, Auth)
│       ├── utils/          # Utility functions and helpers
│       │   ├── date/       # Date formatting logic
│       │   └── services/   # API service calls
│       ├── app.jsx         # App wrapper with routing/layout
│       ├── main.jsx        # Entry point for React
│       └── index.css       # Global styles (Tailwind + DaisyUI)
├── .env
├── package.json
└── README.md
```

---

## ✨ Features

### 🧑‍💻 General

- ✅ Clean and modular project architecture
- 📱 Full responsiveness across all devices
- ⚠️ Error handling and secure routes
- ♻️ Reusable custom components & hooks

### 🔐 Authentication

- 🔐 Register / Login / Logout
- 🍪 JWT-based access tokens (with cookies)
- 🔁 Password change with current password verification

### 📝 Posts

- ✏️ Create posts (text, image, or both)
- ❌ Delete own posts
- ❤️ Like / Unlike posts
- 💬 Comment on posts
- 🔄 View user posts & liked posts separately

### 🔔 Notifications

- 🛎️ Receive real-time notifications for:
  - 👥 New followers
  - 👍 Likes on your post
- 🗑️ Delete individual or all notifications

### 👤 User System

- ➕ Follow / Unfollow users
- 📝 Update profile info: name, username, bio, link, password
- 🖼️ Upload profile picture and cover photo
- 🤝 Suggested users sidebar

---

## ⚙️ Environment Variables

### `backend/.env`

```
PORT=5002
MONODB_URI=your_mongodb_url
JWT_SECRETKEY='your_jwt_secret'
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### `frontend/.env`

```
VITE_API_URL=http://localhost:5002/api
```

---

## 📦 Installation & Development

### 🧾 Prerequisites

- 📦 Node.js 18+
- 🧩 MongoDB (local or Atlas)
- ☁️ Cloudinary Account

### 🧰 Root-Level Setup

```bash
# Install all dependencies and build frontend
npm run build

# Run backend with nodemon in development mode
npm run dev
```

### 🧠 Script Reference

| Script          | What it does                                                |
| --------------- | ----------------------------------------------------------- |
| `npm run build` | Installs dependencies (root + frontend) and builds frontend |
| `npm run dev`   | Starts backend server with nodemon (development mode)       |
| `npm start`     | Starts backend server in production mode                    |

### 🔄 Run Frontend Separately (Optional)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Security Highlights

- 🔒 Password update requires current password
- 🛡️ Route protection using middleware
- 🍪 Tokens stored in HTTP-only cookies

---

## 🧼 Clean Code Highlights

- 🔁 Reusable hooks: e.g., `useFollow`, `useAuthUser`
- 📦 Shared Post component reused in multiple tabs
- 🤝 Shared Follow Button logic (Right panel + Profile page)
- 🧩 Clean, reusable components with compound component pattern

---

## 🤝 Contribution

1. 🍴 Fork the project
2. 👨‍💻 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. ✅ Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔁 Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Mostafa Adly**  
GitHub: [@Mostafa-36](https://github.com/Mostafa-36)  
LinkedIn: [@mostafa-adly](https://www.linkedin.com/in/mostafa-adly-a10726274/)


> ⭐️ Star this project if you like it — it motivates open-source development!
