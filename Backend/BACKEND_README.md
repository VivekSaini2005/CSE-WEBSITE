# College CSE Website - Backend Integration Guide

Welcome! This guide is created to help backend developers easily understand the structure, data models, and requirements of the React frontend for the College CSE Website. It provides all the necessary information to build the backend (schemas, relations, APIs) required to replace the existing mock data with a real database.

---

## 🏗️ 1. Project Overview & Architecture

### **Pages (`src/pages/`)**
The frontend is divided into several main pages. Each page currently relies on mock data but will eventually need API endpoints to fetch dynamic data.
- `Home.jsx` (Landing page)
- `About.jsx`
- `Admissions.jsx`
- `Faculty.jsx`
- `Students.jsx`
- `Alumni.jsx`
- `Achievements.jsx`
- `News.jsx`
- `Research.jsx`
- `Syllabus.jsx`
- `CuratedStudyMaterials.jsx`
- `Contact.jsx`

### **Components (`src/components/`)**
Reusable components used across the pages:
- `Card.jsx`, `FacultyPreview.jsx`, `Footer.jsx`, `Hero.jsx`, `Navbar.jsx`, `NewsSection.jsx`, `Stats.jsx`

---

## 🗄️ 2. Database Schemas & Relations

The frontend currently uses mock data located in the `src/data/` folder. Based on this, here are the recommended database models/schemas you need to create:

### **1. Achievement Schema**
*Data Source: `achievementData.js`*
- `id` (Primary Key)
- `title` (String)
- `category` (String: e.g., "Students", "Faculty")
- `date` (String / Date)
- `description` (Text)
- `badge` (String: e.g., "Hackathon", "Award")

### **2. Alumni Schema**
*Data Source: `alumniData.js`*
- `id` (Primary Key)
- `name` (String)
- `position` (String)
- `company` (String)
- `image` (String - URL to image)

### **3. Event Schema**
*Data Source: `eventsData.js`*
*Note: The frontend groups events by category. You might want an `EventCategory` table, or just a `category` column.*
- `id` (Primary Key)
- `title` (String)
- `category` (String: e.g., "Technical Events", "Cultural Events", "Workshops", "Hackathons")
- `date` (String / Date)
- `description` (Text)
- `image` (String - URL to image)

### **4. Faculty Schema**
*Data Source: `facultyData.js`*
- `id` (Primary Key)
- `name` (String)
- `designation` (String: e.g., "Professor", "Assistant Professor")
- `specialization` (String)
- `image` (String - URL to image)

### **5. Study Material Schema**
*Data Source: `materialsData.js`*
*Recommended Relation: A `Semester` has many `Subjects`, and a `Subject` has many `Resources`.*
- **Semester Model:** `id`, `semesterName` (e.g., "Semester 1")
- **Subject Model:** `id`, `semester_id` (Foreign Key), `name` (e.g., "Programming in C")
- **Resource Model:** `id`, `subject_id` (Foreign Key), `title` (String), `link` (String - URL or PDF path)

### **6. News Schema**
*Data Source: `newsData.js`*
- `id` (Primary Key)
- `title` (String)
- `date` (String / Date)
- `description` (Text)

### **7. Project Guide Schema**
*Data Source: `projectGuideData.js`*
*Recommended Relation: A `Guide/Faculty` has many `Projects`.*
- **Guide Model:** `id`, `name`, `domain`
- **Project Model:** `id`, `guide_id` (Foreign Key), `project_title` (String)

### **8. Publication Schema**
*Data Source: `publicationsData.js`*
- `id` (Primary Key)
- `title` (String)
- `authors` (String - or Array of Strings)
- `venue` (String: e.g., "IEEE Transactions...")
- `year` (String / Integer)

### **9. Research Area Schema**
*Data Source: `researchAreasData.js`*
- `id` (Primary Key)
- `title` (String)
- `description` (Text)

### **10. Syllabus Schema**
*Data Source: `syllabusData.js`*
- `id` (Primary Key)
- `subject` (String)
- `category` (String: e.g., "Undergraduate")
- `pdfUrl` (String - URL to PDF file)

### **11. Testimonial Schema**
*Data Source: `testimonialsData.js`*
- `id` (Primary Key)
- `name` (String)
- `role` (String)
- `quote` (Text)

---

## 🌐 3. Required API Endpoints (RESTful Guidelines)

To connect the frontend to the database, please create the following standard REST API endpoints. The frontend will make `GET` requests to display data. (`POST`, `PUT`, `DELETE` will be needed if you plan to build an Admin Dashboard).

**Base URL:** `/api/v1`

| Endpoint | Method | Description | Frontend Page Usage |
| :--- | :--- | :--- | :--- |
| `/achievements` | GET | Fetch all achievements | `Achievements.jsx` |
| `/alumni` | GET | Fetch all alumni | `Alumni.jsx` |
| `/events` | GET | Fetch all events (preferably grouped by category) | `Students.jsx` / `Home.jsx` |
| `/faculty` | GET | Fetch all faculty members | `Faculty.jsx` |
| `/materials` | GET | Fetch study materials (nested with subjects & resources) | `CuratedStudyMaterials.jsx` |
| `/news` | GET | Fetch latest news | `News.jsx` / `NewsSection.jsx` |
| `/project-guides`| GET | Fetch faculty project guides & domains | `Research.jsx` / `Students.jsx`|
| `/publications` | GET | Fetch research publications | `Research.jsx` |
| `/research-areas`| GET | Fetch core research areas | `Research.jsx` |
| `/syllabus` | GET | Fetch syllabus PDFs list | `Syllabus.jsx` |
| `/testimonials` | GET | Fetch student/alumni testimonials | `Home.jsx` / `Alumni.jsx` |

---

## 🚀 4. How to Connect Frontend to Backend

1. **Environment Variables:**
   Once the backend is ready, we will create a `.env` file in the frontend root:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   ```

2. **Fetching Data in React:**
   The frontend developer will replace the mock data imports with `useEffect` hooks. Example:
   ```javascript
   // Old (Mock Data)
   import facultyData from '../data/facultyData';

   // New (Backend Integration)
   const [faculty, setFaculty] = useState([]);
   useEffect(() => {
       fetch(`${import.meta.env.VITE_API_BASE_URL}/faculty`)
           .then(res => res.json())
           .then(data => setFaculty(data));
   }, []);
   ```

## 📝 5. Notes for Backend Devs
- **CORS:** Ensure your backend has CORS enabled to accept requests from the React frontend (usually `http://localhost:5173` during development).
- **File Uploads:** You will need to implement a file storage solution (like AWS S3, Cloudinary, or local static folders) for Images (`alumni`, `faculty`, `events`) and PDFs (`materials`, `syllabus`).
- **Pagination/Filtering:** As data grows, consider adding query parameters for pagination (e.g., `?page=1&limit=10`) or filtering (e.g., `?category=Workshops` for events).
