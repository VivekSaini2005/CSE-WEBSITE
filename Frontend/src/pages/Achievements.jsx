import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { getAchievements } from "../api/public/achievements";
import { formatDate } from "../utils/formatDate";
import Loader from "../components/common/Loader";


const Achievements = () => {
  const [filter, setFilter] = useState("All");
  const { data: rawAchievements, loading, error } = useFetch(getAchievements);

  const categories = ["All", "Students", "Faculty"];

  const achievementList = rawAchievements || [];

  const filteredData = filter === "All" 
    ? achievementList 
    : achievementList.filter(item => item.category === filter);

  if (loading) return <Loader fullPage />;

  if (error) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border border-red-100 shadow-soft">
        <h3 className="text-xl font-bold text-red-600 mb-2">Error loading achievements</h3>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full animate-fade-in-up">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Achievements & Awards
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto">
          Celebrating the exceptional milestones accomplished by our students and faculty on a global scale.
        </p>
      </div>

      {/* Advanced Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm focus:outline-none ${
              filter === cat 
                ? "bg-primary text-white shadow-md border border-primary" 
                : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary shadow-sm"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredData.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-lg shadow-soft border border-slate-100 italic text-slate-400">
            No achievements found for this category.
          </div>
        ) : (
          filteredData.map((item) => (
            <div 
              key={item._id}
              className="group bg-white p-6 md:p-8 rounded-lg shadow-soft border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-muted bg-slate-50 px-3 py-1 rounded border border-slate-100">
                    {formatDate(item.date)}
                  </span>
                  
                  <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded">
                    {item.badge || 'Achievement'}
                  </span>
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold font-heading text-primary mb-3 leading-tight group-hover:text-slate-800 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>
              
              <div className="mt-auto border-t border-slate-100 pt-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium text-slate-500">
                  Category: <span className="text-slate-700">{item.category}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Achievements;
