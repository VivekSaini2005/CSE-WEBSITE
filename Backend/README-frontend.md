# Frontend Integration Guide for CSE Website Backend

Welcome to the Frontend Integration Guide! This document provides all the necessary details for frontend developers to connect the React application to the Node.js backend. It outlines the API endpoints, data models, and instructions for replacing mock data with real database calls.

## 🚀 1. Setup & Configuration

1. **Environment Variables**:
   In the root of your frontend React (Vite) project, create or update your `.env` file to point to the backend server.
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   *(Note: The backend routes are prefixed with `/api`, rather than `/api/v1`)*.

2. **Starting the Backend**:
   Ensure the backend server is running while you develop:
   ```bash
   cd Backend
   npm install
   npm run dev
   ```

## 🌐 2. API Endpoints

Based on the actual routes in `src/app.js`, the backend exposes the following RESTful API endpoints. They default to returning JSON arrays of the requested documents.

| Endpoint | Method | Data Provided | Recommended Page |
| :--- | :--- | :--- | :--- |
| `/api/health` | GET | Server API status | None (Debugging) |
| `/api/auth/register` | POST | Register a new user | Login / Register Modals |
| `/api/auth/login` | POST | Login and receive JWT token | Login Modal |
| `/api/achievements` | GET | List of all achievements | `Achievements.jsx` |
| `/api/faculty` | GET | List of all faculty members | `Faculty.jsx` |
| `/api/alumni` | GET | List of all alumni | `Alumni.jsx` |
| `/api/events` | GET | List of all events | `Students.jsx` / `Home.jsx` |
| `/api/semesters` | GET | List of all semesters | `CuratedStudyMaterials.jsx` |
| `/api/subjects` | GET | Subjects (linked to semesters) | `CuratedStudyMaterials.jsx` |
| `/api/resources` | GET | Resources/Materials for subjects | `CuratedStudyMaterials.jsx` |
| `/api/news` | GET | Latest news updates | `News.jsx` / `NewsSection.jsx` |
| `/api/project-guides` | GET | Faculty project guides | `Research.jsx` / `Students.jsx` |
| `/api/projects` | GET | Student projects list | `Research.jsx` |
| `/api/publications` | GET | Research publications | `Research.jsx` |
| `/api/research-areas` | GET | Core research areas | `Research.jsx` |
| `/api/syllabus` | GET | Syllabus PDFs | `Syllabus.jsx` |
| `/api/testimonials` | GET | Student/Alumni testimonials | `Home.jsx` / `Alumni.jsx` |

*(Note: Most of these endpoints support `POST`, `PUT`, `DELETE` operations for Admin usage).*

## 🗄️ 3. Expected Data Models (Response Structure)

When making a `GET` request, expect an array of objects structured by MongoDB. The fields correlate directly with the mock data, but **MongoDB uses `_id` instead of `id`**. Here are key schemas to expect:

### **Faculty** (`/api/faculty`)
```json
[
  {
    "_id": "60d0fe4f...",
    "name": "Dr. John Doe",
    "designation": "Professor",
    "specialization": "Machine Learning",
    "image": "https://url-to-image.jpg"
  }
]
```

### **Events** (`/api/events`)
```json
[
  {
    "_id": "60d0fe4f...",
    "title": "Tech Symposium",
    "category": "Technical Events",
    "date": "2024-04-20T00:00:00.000Z",
    "description": "Annual tech symposium details.",
    "image": "https://url-to-image.jpg"
  }
]
```

### **Study Materials (Relational)**
The backend connects study materials using Mongo ObjectIDs:
1. **Semesters** contain the semester name.
2. **Subjects** have a reference to `semester`.
3. **Resources** have a reference to the `subject`.

## 🧩 4. How to Integrate Data in React Component

Replace static mock data with fetch/axios calls using `useEffect` and `useState`.

### Example: Fetching Faculty Data
```javascript
// Remove mock data import
// import facultyData from '../data/facultyData';

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/faculty`);
        // Assuming response.data is the array of faculty
        setFaculty(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="faculty-grid">
      {faculty.map((member) => (
        // IMPORTANT: Use _id instead of id for MongoDB documents
        <div key={member._id} className="faculty-card">
          <img src={member.image} alt={member.name} />
          <h3>{member.name}</h3>
          <p>{member.designation}</p>
        </div>
      ))}
    </div>
  );
};

export default FacultyList;
```

## 🔒 5. Authentication (JWT)

For actions requiring Admin access:
1. Make a `POST` request to `/api/auth/login`.
2. Save the returned `token` in `localStorage`.
3. Send it in the headers for protected requests:
   ```javascript
   axios.post(`${import.meta.env.VITE_API_BASE_URL}/faculty`, newFacultyData, {
     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
   });
   ```

## ⚠️ 6. Common Pitfalls for Frontend Devs

- **Unique Keys & IDs**: MongoDB generates keys as `_id`, not `id`. Make sure to update your `key={item._id}` maps!
- **Image/PDF URLs**: If images or PDFs are served directly from the server rather than Cloudinary/S3, you might need to prepend the backend base URL (e.g. `<img src={'http://localhost:5000' + member.image} />`). Ensure you verify the structure returned.
- **CORS Handling**: If Vite (`http://localhost:5173`) runs into CORS blocks, you must ensure the backend `.env` variables or server CORS policy has correctly whitelisted your frontend URL.
