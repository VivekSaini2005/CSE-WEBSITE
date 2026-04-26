import React from "react";
import useFetch from "../hooks/useFetch";
import { getTestimonials } from "../api/public/testimonials";
import Loader from "./common/Loader";

const TestimonialsSection = () => {
  const { data: rawTestimonials, loading, error } = useFetch(getTestimonials);

  const testimonials = (rawTestimonials || []).slice(0, 3);

  if (loading) return <Loader />;

  if (error || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-slate-800">
          Student & Alumni Stories
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto">
          Hear from our community about their experience and journey in the CSE department.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div 
            key={item._id} 
            className="bg-white p-8 rounded-2xl shadow-soft border border-slate-100 hover:shadow-lg transition-all duration-300 relative group"
          >
            <svg className="absolute top-6 left-6 w-10 h-10 text-primary/5 group-hover:text-primary/10 transition-colors" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-slate-600 italic leading-relaxed relative z-10 mb-6 line-clamp-4">
              "{item.quote}"
            </p>
            <div className="flex flex-col border-t border-slate-50 pt-4">
              <span className="font-bold text-slate-800 font-heading">{item.name}</span>
              <span className="text-xs text-primary font-medium uppercase tracking-wider">{item.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
