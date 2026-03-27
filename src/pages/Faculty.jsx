import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import faculty from "../data/facultyData";
import Card from "../components/Card";

const Faculty = () => {
  return (
    <>
      <Navbar />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {faculty.map((teacher) => (
          <Card key={teacher.id} {...teacher} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Faculty;