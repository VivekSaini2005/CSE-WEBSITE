import Hero from "../components/Hero";
import Stats from "../components/Stats";
import NewsSection from "../components/NewsSection";
import FacultyPreview from "../components/FacultyPreview";

const Home = () => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16 w-full">
      <Hero />
      <Stats />
      <NewsSection />
      <FacultyPreview />
    </div>
  );
};

export default Home;