# CSE Department Website

A full-stack web application for the Computer Science & Engineering department, featuring a robust Node.js/Express backend and a modern React + Vite frontend.

---

## 🚀 Project Overview

- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** React, Vite, TailwindCSS
- **Features:** Faculty, Alumni, Achievements, Events, News, Research, Syllabus, Study Materials, Testimonials, Authentication (JWT), Admin Dashboard

---

## 🏗️ Folder Structure

```
Backend/   # Node.js/Express API, MongoDB models, REST endpoints
Frontend/  # React + Vite app, API integration, UI components
```

---

## 🗄️ Backend: Data Models (Mongoose Schemas)

- **User:** email, password (hashed), role (user/admin)
- **Achievement:** title, category, date, description, badge
- **Alumni:** name, position, company, image
- **Event:** title, category, date, description, image
- **Faculty:** name, designation, department, email, specialization, image
- **Guide:** name, domain, projects[]
- **Material:** semester, subjects[{ name, resources[{ title, link }] }]
- **News:** title, date, description
- **Publication:** title, authors[], venue, year
- **ResearchArea:** title, description
- **Syllabus:** subject, category, pdfUrl
- **Testimonial:** name, role, quote

---

## 🌐 Backend: API Endpoints

All endpoints are prefixed with `/api`. Example endpoints:

| Endpoint                | Method | Description                        |
|-------------------------|--------|------------------------------------|
| /api/auth/register      | POST   | Register user                      |
| /api/auth/login         | POST   | Login, returns JWT                 |
| /api/achievements       | GET    | List achievements                  |
| /api/faculty            | GET    | List faculty                       |
| /api/alumni             | GET    | List alumni                        |
| /api/events             | GET    | List events                        |
| /api/materials          | GET    | List study materials               |
| /api/news               | GET    | List news                          |
| /api/project-guides     | GET    | List project guides                |
| /api/publications       | GET    | List publications                  |
| /api/research-areas     | GET    | List research areas                |
| /api/syllabus           | GET    | List syllabus PDFs                 |
| /api/testimonials       | GET    | List testimonials                  |

Admin routes support POST, PUT, DELETE for CRUD operations.

---

## 💻 Frontend: Key Pages & Components

- **Pages:** Home, About, Admissions, Faculty, Students, Alumni, Achievements, News, Research, Syllabus, Study Materials, Contact, Admin Dashboard
- **Components:** Navbar, Footer, Card, FacultyPreview, EventPreview, AchievementPreview, NewsSection, TestimonialsSection, etc.
- **API Integration:** Uses Axios with JWT authentication, environment-based API URL.

---

## 🔗 Connecting Frontend & Backend

1. **Set API URL:**  
   In `Frontend/.env`:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

2. **Fetching Data Example:**
   ```js
   import axios from 'axios';
   useEffect(() => {
     axios.get(`${import.meta.env.VITE_API_BASE_URL}/faculty`)
       .then(res => setFaculty(res.data));
   }, []);
   ```

3. **Authentication:**  
   - Login via `/api/auth/login`, store JWT in localStorage.
   - Send JWT as `Authorization: Bearer <token>` for protected routes.

---

## ⚠️ Notes & Best Practices

- Use `_id` (MongoDB) instead of `id` in React keys.
- For images/PDFs, prepend backend URL if served locally.
- Ensure CORS is enabled for frontend dev URL.
- Add pagination/filtering as data grows.

---

## 👥 Contributors

- [Vivek Saini (GitHub)](https://github.com/VivekSaini2005)
- [Abhinav (GitHub)](https://github.com/Abhinav8899)
- [Ayush Singh (GitHub)](https://github.com/thakuraayush1710-create)
- [Aditya Singh (GitHub)](https://github.com/sageaditya)
---

## 🌍 Live Project

- [Live Demo Link](https://cse-website-ten.vercel.app/)

---

Let us know if you have any questions or want to contribute!
