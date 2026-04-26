import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getAchievements } from "../api/public/achievements";
import { formatDate } from "../utils/formatDate";
import Loader from "./common/Loader";

const AchievementPreview = () => {
  const { data: rawAchievements, loading, error } = useFetch(getAchievements);

  const latestAchievements = (rawAchievements || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (loading) return <Loader />;

  if (error || latestAchievements.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Achievements
        </h2>
        <Link to="/achievements" className="text-accent hover:text-primary font-semibold text-sm transition-colors">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestAchievements.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-lg shadow-soft border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-medium text-muted bg-slate-50 px-2 py-1 rounded border border-slate-100">
                {formatDate(item.date)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded">
                {item.badge || "Award"}
              </span>
            </div>
            <h4 className="text-base font-bold text-primary mb-2 line-clamp-1">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementPreview;
