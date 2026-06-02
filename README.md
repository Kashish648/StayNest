# 🏡 StayNest

> A full-stack Airbnb-style property listing and booking platform built with Node.js, Express, and MongoDB.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://staynest-ayro.onrender.com/listings)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.x-black?style=for-the-badge&logo=express)](https://expressjs.com/)

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Author](#author)

---

## 🧐 About the Project

**StayNest** is a full-stack web application inspired by Airbnb. Users can browse property listings across locations, view listing details with an interactive map, create their own listings with image uploads, and manage bookings — all behind a secure authentication system.

This project was built to demonstrate real-world backend development skills including RESTful routing, user authentication, cloud-based image storage, and third-party API integrations.

---

## 🚀 Live Demo

🔗 **[https://staynest-ayro.onrender.com/listings](https://staynest-ayro.onrender.com/listings)**

> Note: Hosted on Render free tier — may take 30–60 seconds to spin up on first load.

---

## ✨ Features

- 🔐 **User Authentication** — Register, login, logout using Passport.js (Local Strategy)
- 🏠 **Listing Management** — Create, Read, Update, Delete property listings (full CRUD)
- 📸 **Image Uploads** — Upload and store property images via Cloudinary + Multer
- 🗺️ **Interactive Maps** — Property location displayed using Mapbox SDK
- ✅ **Input Validation** — Server-side validation using Joi schemas
- 💬 **Flash Messages** — User-friendly success/error feedback using connect-flash
- 🛡️ **Authorization** — Only listing owners can edit or delete their listings
- 📱 **Responsive UI** — Mobile-friendly design using Bootstrap

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js v5 | Web framework |
| MongoDB + Mongoose | Database & ODM |
| Passport.js | Authentication middleware |
| Joi | Request validation |
| Multer + Cloudinary | Image upload & storage |
| Mapbox SDK | Interactive property maps |
| connect-mongo | Session store in MongoDB |
| dotenv | Environment variable management |

### Frontend
| Technology | Purpose |
|---|---|
| EJS + EJS-Mate | Server-side templating |
| Bootstrap 5 | Responsive styling |
| Custom CSS | Additional UI styling |

---

## 📁 Project Structure

```
StayNest/
├── controllers/        # Route handler logic (MVC pattern)
├── models/             # Mongoose schemas (Listing, User, Review)
├── routes/             # Express route definitions
├── views/              # EJS templates
│   ├── listings/       # Listing pages (index, show, new, edit)
│   ├── users/          # Login & signup pages
│   └── layouts/        # Shared layout templates
├── public/             # Static assets (CSS, JS, images)
├── utils/              # Helper utilities (ExpressError, wrapAsync)
├── init/               # Database seeding scripts
├── middleware.js        # Custom middleware (auth, validation)
├── schema.js           # Joi validation schemas
├── cloudconfig.js      # Cloudinary configuration
├── app.js              # Main Express app entry point
└── package.json
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Mapbox account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kashish648/StayNest.git
   cd StayNest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see below)

4. **(Optional) Seed the database**
   ```bash
   node init/index.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. **Open in browser**
   ```
   http://localhost:8080/listings
   ```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB
ATLASDB_URL=your_mongodb_atlas_connection_string

# Session Secret
SECRET=your_session_secret_key

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox
MAP_TOKEN=your_mapbox_public_token
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

---

## 📸 Screenshots

> *(Add screenshots of your app here)*
>
> Tip: Take screenshots of the listings page, individual listing with map, login page, and create listing form — then upload them to your repo and reference them like:
> ```md
> ![Listings Page](./public/screenshots/listings.png)
> ```

---

## 🔮 Future Improvements

- [ ] Migrate frontend to React.js for a modern SPA experience
- [ ] Add booking/reservation system with date picker
- [ ] Implement search and filter by location, price, and category
- [ ] Add review and rating system
- [ ] Email notifications on signup / booking confirmation
- [ ] Add Google OAuth login

---

## 👨‍💻 Author

**Kashish**
- GitHub: [@Kashish648](https://github.com/Kashish648)
- Live Project: [staynest-ayro.onrender.com](https://staynest-ayro.onrender.com/listings)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
