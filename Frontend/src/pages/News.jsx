import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { getNews } from "../api/public/news";
import { formatDate } from "../utils/formatDate";
import Loader from "../components/common/Loader";

const News = () => {
  const { data: rawNews, loading, error } = useFetch(getNews);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) return <Loader fullPage />;

  if (error) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg border border-red-100 inline-block">
          <p className="font-semibold">Error Loading News</p>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      </div>
    );
  }

  // Ensure news is sorted by date (latest first)
  const newsList = (rawNews || []).sort((a, b) => new Date(b.date) - new Date(a.date));

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
        {newsList.length === 0 ? (
          <div className="text-center py-10 text-muted italic">
            No news announcements at this time.
          </div>
        ) : (
          newsList.map((item) => (
            <div 
              key={item._id}
              className="group bg-white p-5 rounded-lg border border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-soft flex flex-col"
            >
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="text-lg font-semibold font-heading text-primary leading-tight group-hover:text-slate-800 transition-colors">
                  {item.title}
                </h3>
                <span className="text-sm font-medium text-muted bg-slate-50 px-3 py-1 rounded border border-slate-100 whitespace-nowrap">
                  {formatDate(item.date)}
                </span>
              </div>
              
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {item.description}
              </p>

              {/* Read More Section (Expand/Collapse) */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedId === item._id ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="pt-3 border-t border-slate-50 text-sm text-slate-600 italic border-l-2 border-accent pl-3 rounded-r-md bg-slate-50/50 py-2">
                  Detailed itinerary and registration links for this event are available at the main administrative office.
                </div>
              </div>

              <button 
                onClick={() => toggleExpand(item._id)}
                className="mt-4 text-sm font-medium text-accent hover:text-primary transition-colors focus:outline-none self-start flex items-center gap-1 group/btn"
              >
                {expandedId === item._id ? "Show Less" : "Read More"}
                <svg className={`w-4 h-4 transition-transform group-hover/btn:translate-y-px ${expandedId === item._id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
