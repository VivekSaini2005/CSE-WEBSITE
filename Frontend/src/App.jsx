import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/common/Loader";
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
import StudyMaterials from "./pages/StudyMaterials";
// Lazy load auth/admin routes
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));
const AdminRoute = lazy(() => import("./routes/AdminRoute"));
const FacultyList = lazy(() => import("./pages/admin/faculty/FacultyList.jsx"));
const AddFaculty = lazy(() => import("./pages/admin/faculty/AddFaculty.jsx"));
const EditFaculty = lazy(() => import("./pages/admin/faculty/EditFaculty.jsx"));
const AlumniList = lazy(() => import("./pages/admin/alumni/AlumniList.jsx"));
const AddAlumni = lazy(() => import("./pages/admin/alumni/AddAlumni.jsx"));
const EditAlumni = lazy(() => import("./pages/admin/alumni/EditAlumni.jsx"));
const AchievementList = lazy(() => import("./pages/admin/achievements/AchievementList.jsx"));
const AddAchievement = lazy(() => import("./pages/admin/achievements/AddAchievement.jsx"));
const EditAchievement = lazy(() => import("./pages/admin/achievements/EditAchievement.jsx"));
import EventsList from "./pages/admin/events/EventsList.jsx";
import AddEvent from "./pages/admin/events/AddEvent.jsx";
import EditEvent from "./pages/admin/events/EditEvent.jsx";
const MaterialsList = lazy(() => import("./pages/admin/materials/MaterialsList.jsx"));
const AddMaterial = lazy(() => import("./pages/admin/materials/AddMaterial.jsx"));
const EditMaterial = lazy(() => import("./pages/admin/materials/EditMaterial.jsx"));
const NewsList = lazy(() => import("./pages/admin/news/NewsList.jsx"));
const AddNews = lazy(() => import("./pages/admin/news/AddNews.jsx"));
const EditNews = lazy(() => import("./pages/admin/news/EditNews.jsx"));
const GuideList = lazy(() => import("./pages/admin/guides/GuideList.jsx"));
const AddGuide = lazy(() => import("./pages/admin/guides/AddGuide.jsx"));
const EditGuide = lazy(() => import("./pages/admin/guides/EditGuide.jsx"));
const PublicationList = lazy(() => import("./pages/admin/publications/PublicationList.jsx"));
const AddPublication = lazy(() => import("./pages/admin/publications/AddPublication.jsx"));
const EditPublication = lazy(() => import("./pages/admin/publications/EditPublication.jsx"));
const ResearchAreaList = lazy(() => import("./pages/admin/research-areas/ResearchAreaList.jsx"));
const AddResearchArea = lazy(() => import("./pages/admin/research-areas/AddResearchArea.jsx"));
const EditResearchArea = lazy(() => import("./pages/admin/research-areas/EditResearchArea.jsx"));
const SyllabusList = lazy(() => import("./pages/admin/syllabus/SyllabusList.jsx"));
const AddSyllabus = lazy(() => import("./pages/admin/syllabus/AddSyllabus.jsx"));
const EditSyllabus = lazy(() => import("./pages/admin/syllabus/EditSyllabus.jsx"));
const TestimonialList = lazy(() => import("./pages/admin/testimonials/TestimonialList.jsx"));
const AddTestimonial = lazy(() => import("./pages/admin/testimonials/AddTestimonial.jsx"));
const EditTestimonial = lazy(() => import("./pages/admin/testimonials/EditTestimonial.jsx"));

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col min-h-screen bg-secondary font-body">
        <Navbar />
        <main className="grow container py-4 lg:py-6">
          <Suspense fallback={<Loader fullPage />}>
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
              <Route path="/academics/materials" element={<StudyMaterials />} />
              <Route path="/students" element={<Students />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPanel />}>
                  <Route index element={<div>Welcome to the Admin Dashboard</div>} />
                  <Route path="events" element={<EventsList />} />
                  <Route path="events/add" element={<AddEvent />} />
                  <Route path="events/edit/:id" element={<EditEvent />} />
                  <Route path="achievements" element={<AchievementList />} />
                  <Route path="achievements/add" element={<AddAchievement />} />
                  <Route path="achievements/edit/:id" element={<EditAchievement />} />
                  <Route path="alumni" element={<AlumniList />} />
                  <Route path="alumni/add" element={<AddAlumni />} />
                  <Route path="alumni/edit/:id" element={<EditAlumni />} />
                  <Route path="news" element={<NewsList />} />
                  <Route path="news/add" element={<AddNews />} />
                  <Route path="news/edit/:id" element={<EditNews />} />
                  <Route path="faculty" element={<FacultyList />} />
                  <Route path="faculty/add" element={<AddFaculty />} />
                  <Route path="faculty/edit/:id" element={<EditFaculty />} />
                  <Route path="guides" element={<GuideList />} />
                  <Route path="guides/add" element={<AddGuide />} />
                  <Route path="guides/edit/:id" element={<EditGuide />} />
                  <Route path="publications" element={<PublicationList />} />
                  <Route path="publications/add" element={<AddPublication />} />
                  <Route path="publications/edit/:id" element={<EditPublication />} />
                  <Route path="research-areas" element={<ResearchAreaList />} />
                  <Route path="research-areas/add" element={<AddResearchArea />} />
                  <Route path="research-areas/edit/:id" element={<EditResearchArea />} />
                  <Route path="syllabus" element={<SyllabusList />} />
                  <Route path="syllabus/add" element={<AddSyllabus />} />
                  <Route path="syllabus/edit/:id" element={<EditSyllabus />} />
                  <Route path="testimonials" element={<TestimonialList />} />
                  <Route path="testimonials/add" element={<AddTestimonial />} />
                  <Route path="testimonials/edit/:id" element={<EditTestimonial />} />
                  <Route path="materials" element={<MaterialsList />} />
                  <Route path="materials/add" element={<AddMaterial />} />
                  <Route path="materials/edit/:id" element={<EditMaterial />} />
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