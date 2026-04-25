import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-secondary font-body">
        <Navbar />
        {/* Main content: flex-grow ensures footer stays at bottom, container handles horizontal padding */}
        <main className="flex-grow container py-4 lg:py-6">
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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;