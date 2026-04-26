import Hero from "../components/Hero";
import Stats from "../components/Stats";
import NewsSection from "../components/NewsSection";
import FacultyPreview from "../components/FacultyPreview";
import EventPreview from "../components/EventPreview";
import AchievementPreview from "../components/AchievementPreview";
import TestimonialsSection from "../components/TestimonialsSection";

const Home = () => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16 w-full">
      <Hero />
      <Stats />
      <NewsSection />
      <EventPreview />
      <AchievementPreview />
      <TestimonialsSection />
      <FacultyPreview />
    </div>
  );
};

export default Home;