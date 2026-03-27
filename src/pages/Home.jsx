import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import NewsSection from "../components/NewsSection";
import FacultyPreview from "../components/FacultyPreview";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <NewsSection />
      <FacultyPreview />
      <Footer />
    </>
  );
};

export default Home;