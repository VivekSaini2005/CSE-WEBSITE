import { Link } from "react-router-dom";
import faculty from "../data/facultyData";
import Card from "./Card";

const FacultyPreview = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-slate-800">
          Faculty Spotlight
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto">
          Learn from industry experts and renowned researchers shaping the future of computer science.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {faculty.slice(0, 3).map((teacher) => (
          <Card key={teacher.id} {...teacher} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link 
          to="/faculty"
          className="inline-block px-8 py-3 bg-white border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors shadow-soft hover:shadow-md"
        >
          View All Faculty
        </Link>
      </div>
    </div>
  );
};

export default FacultyPreview;