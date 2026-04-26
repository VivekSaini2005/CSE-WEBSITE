import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Eager load main pages
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import Contact from "./pages/Contact";
import Achievements from "./pages/Achievements";
import Research from "./pages/Research";
import Alumni from "./pages/Alumni";
import News from "./pages/News";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Syllabus from "./pages/Syllabus";
import Students from "./pages/Students";
import CuratedStudyMaterials from "./pages/CuratedStudyMaterials";
// Lazy load auth/admin routes
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));
const AdminRoute = lazy(() => import("./routes/AdminRoute"));
import EventsList from "./pages/admin/events/EventsList.jsx";
import AddEvent from "./pages/admin/events/AddEvent.jsx";
import EditEvent from "./pages/admin/events/EditEvent.jsx";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col min-h-screen bg-secondary font-body">
        <Navbar />
        <main className="grow container py-4 lg:py-6">
          <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/research" element={<Research />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics/admissions" element={<Admissions />} />
              <Route path="/academics/syllabus" element={<Syllabus />} />
              <Route path="/academics/materials" element={<CuratedStudyMaterials />} />
              <Route path="/students" element={<Students />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPanel />}>
                  <Route index element={<div>Welcome to the Admin Dashboard</div>} />
                  <Route path="events" element={<EventsList />} />
                  <Route path="events/add" element={<AddEvent />} />
                  <Route path="events/edit/:id" element={<EditEvent />} />
                  <Route path="news" element={<div>News Management</div>} />
                  <Route path="faculty" element={<div>Faculty Management</div>} />
                  <Route path="projects" element={<div>Projects Management</div>} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;