import { useState } from "react";
import faculty from "../data/facultyData";
import Card from "../components/Card";

const Faculty = () => {
  const [filterDesignation, setFilterDesignation] = useState("");

  const filteredFaculty = faculty.filter((teacher) => {
    return filterDesignation ? teacher.designation === filterDesignation : true;
  });

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Our Faculty
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto">
          Meet the exceptional educators and researchers driving innovation in computer science.
        </p>
      </div>

      {/* Faculty Grid Listing */}
      {filteredFaculty.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto pb-12">
          {filteredFaculty.map((teacher) => (
            <Card key={teacher.id} {...teacher} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-100 shadow-soft">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No faculty found</h3>
          <p className="text-muted">Try adjusting your search query or filters.</p>
          <button 
            onClick={() => { setSearchTerm(""); setFilterDesignation(""); }}
            className="mt-4 px-6 py-2 bg-primary/10 text-primary font-medium rounded-md hover:bg-primary/20 transition-colors focus:outline-none"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Faculty;