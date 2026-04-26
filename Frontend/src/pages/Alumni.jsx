import React from "react";
import useFetch from "../hooks/useFetch";
import { getAlumni } from "../api/public/alumni";
import { getTestimonials } from "../api/public/testimonials";
import { getFileUrl } from "../utils/fileUtils";
import Loader from "../components/common/Loader";

const Alumni = () => {
  const { 
    data: rawAlumni, 
    loading: alumniLoading, 
    error: alumniError 
  } = useFetch(getAlumni);

  const { 
    data: rawTestimonials, 
    loading: testimonialsLoading, 
    error: testimonialsError 
  } = useFetch(getTestimonials);

  const alumniList = rawAlumni || [];
  const testimonialList = rawTestimonials || [];

  if (alumniLoading || testimonialsLoading) return <Loader fullPage />;

  return (
    <div className="flex flex-col gap-12 w-full animate-fade-in-up">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Our Alumni Network
        </h2>
        <p className="text-muted mt-3 max-w-3xl mx-auto leading-relaxed">
          Our graduates are shaping the future of technology, leading top-tier organizations, and founding transformative startups globally.
        </p>
      </div>

      {/* Notable Alumni Grid */}
      <div>
        <div className="mb-8 text-center sm:text-left">
          <h3 className="text-2xl font-bold font-heading text-slate-800 mb-2">Notable Alumni</h3>
          <div className="w-16 h-1 bg-accent rounded mx-auto sm:mx-0"></div>
        </div>
        
        {alumniError ? (
          <div className="text-center py-10 text-red-500 font-medium">{alumniError}</div>
        ) : alumniList.length === 0 ? (
          <div className="text-center py-10 text-slate-400">No alumni profiles found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {alumniList.map((alumni) => (
              <div 
                key={alumni._id}
                className="bg-white p-5 rounded-lg shadow-soft text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-slate-100 flex flex-col items-center group cursor-default"
              >
                {/* Photo Avatar */}
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-slate-50 group-hover:border-primary/10 transition-colors bg-slate-100">
                  <img 
                    src={getFileUrl(alumni.image)} 
                    alt={alumni.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24'><rect width='24' height='24' fill='%23f1f5f9'/><circle cx='12' cy='8' r='5' fill='%23cbd5e1'/><path d='M3,21 h18 C 21,12 3,12 3,21' fill='%23cbd5e1'/></svg>";
                    }}
                  />
                </div>
                
                <h4 className="text-lg font-bold font-heading text-slate-800 group-hover:text-primary transition-colors">
                  {alumni.name}
                </h4>
                <p className="text-primary font-medium text-sm mt-1">
                  {alumni.position}
                </p>
                
                {/* Subtle Company Badge */}
                <p className="text-muted text-sm mt-1 font-medium bg-slate-50 px-3 py-1 rounded-full border border-slate-100 inline-block mt-3">
                  {alumni.company}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alumni Testimonials Stories Section */}
      <div className="bg-slate-50 rounded-2xl p-8 lg:p-12 border border-slate-100 mt-4">
        <div className="mb-10 text-center">
          <h3 className="text-2xl font-bold font-heading text-slate-800 mb-2">Alumni Stories</h3>
          <div className="w-16 h-1 bg-accent rounded mx-auto"></div>
        </div>
        
        {testimonialsError ? (
          <div className="text-center py-10 text-red-500 font-medium">{testimonialsError}</div>
        ) : testimonialList.length === 0 ? (
          <div className="text-center py-10 text-slate-400">No alumni stories found at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialList.map((testim) => (
              <div key={testim._id} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative group hover:shadow-soft transition-all duration-300">
                {/* Massive subtle quote icon */}
                <svg className="absolute top-6 left-6 w-10 h-10 text-primary/5 group-hover:text-primary/10 transition-colors" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                
                <p className="text-slate-600 text-sm md:text-base italic leading-relaxed relative z-10 pl-10 pr-2 pb-6">
                  "{testim.quote}"
                </p>
                
                <div className="mt-4 flex flex-col pl-10 border-t border-slate-50 pt-4">
                  <span className="font-bold text-slate-800 font-heading">{testim.name}</span>
                  <span className="text-sm text-primary font-medium">{testim.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Alumni;
