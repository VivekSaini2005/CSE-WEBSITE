import React, { useState } from "react";
import newsData from "../data/newsData";

const News = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-10 w-full animate-fade-in-up">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Latest News & Announcements
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto">
          Stay up to date with the latest technological strides, upcoming symposiums, and departmental progress.
        </p>
      </div>

      {/* Main List Column */}
      <div className="w-full max-w-3xl mx-auto space-y-6">
        {newsData.map((item) => (
          <div 
            key={item.id}
            className="group bg-white p-5 rounded-lg border border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-soft flex flex-col"
          >
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="text-lg font-semibold font-heading text-primary leading-tight group-hover:text-slate-800 transition-colors">
                {item.title}
              </h3>
              <span className="text-sm font-medium text-muted bg-slate-50 px-3 py-1 rounded border border-slate-100 whitespace-nowrap">
                {item.date}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {item.description}
            </p>

            {/* Read More Section (Expand/Collapse) */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedId === item.id ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
              <div className="pt-3 border-t border-slate-50 text-sm text-slate-600 italic border-l-2 border-accent pl-3 rounded-r-md bg-slate-50/50 py-2">
                Detailed itinerary and registration links for this event are available at the main administrative office.
              </div>
            </div>

            <button 
              onClick={() => toggleExpand(item.id)}
              className="mt-4 text-sm font-medium text-accent hover:text-primary transition-colors focus:outline-none self-start flex items-center gap-1 group/btn"
            >
              {expandedId === item.id ? "Show Less" : "Read More"}
              <svg className={`w-4 h-4 transition-transform group-hover/btn:translate-y-px ${expandedId === item.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
