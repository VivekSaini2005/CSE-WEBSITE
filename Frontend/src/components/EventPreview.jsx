import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getEvents } from "../api/public/events";
import { getFileUrl } from "../utils/fileUtils";
import { formatDate } from "../utils/formatDate";
import Loader from "./common/Loader";

const EventPreview = () => {
  const { data: rawEvents, loading, error } = useFetch(getEvents);

  const latestEvents = (rawEvents || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (loading) return <Loader />;

  if (error || latestEvents.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Upcoming Events
        </h2>
        <Link to="/students" className="text-accent hover:text-primary font-semibold text-sm transition-colors">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestEvents.map((event) => (
          <div key={event._id} className="group bg-white rounded-lg shadow-soft overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-lg flex flex-col">
            <div className="h-40 w-full overflow-hidden bg-slate-100">
              <img 
                src={getFileUrl(event.image)} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => { e.target.src = "https://via.placeholder.com/800x400?text=Event"; }}
              />
            </div>
            <div className="p-4 flex-grow">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-2">
                {formatDate(event.date)}
              </span>
              <h4 className="text-base font-semibold text-primary leading-tight mb-2 group-hover:text-accent transition-colors">
                {event.title}
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPreview;
