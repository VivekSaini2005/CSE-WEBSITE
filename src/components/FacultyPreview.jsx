import faculty from "../data/facultyData";
import Card from "./Card";

const FacultyPreview = () => {
  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Our Faculty</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {faculty.slice(0, 3).map((teacher) => (
            <Card key={teacher.id} {...teacher} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyPreview;