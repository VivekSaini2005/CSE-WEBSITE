import React, { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { getEvents } from "../api/public/events";
import { getFileUrl } from "../utils/fileUtils";
import Loader from "../components/common/Loader";

const StudentLife = () => {
  const { data: rawEvents, loading, error } = useFetch(getEvents);

  const eventsByCategory = useMemo(() => {
    if (!rawEvents) return [];
    
    const groups = rawEvents.reduce((acc, event) => {
      const category = event.category || "General Events";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        ...event,
        formattedDate: event.date ? new Date(event.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : 'Date TBA'
      });
      return acc;
    }, {});

    return Object.entries(groups).map(([category, events]) => ({
      category,
      events
    }));
  }, [rawEvents]);

  if (loading) {
    return <Loader fullPage />;
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border border-red-100 shadow-soft">
        <h3 className="text-xl font-bold text-red-600 mb-2">Error loading events</h3>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full animate-fade-in-up">
      {/* Header Segment */}
      <div className="border-b border-gray-200 pb-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Student Life & Events
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          Experience the vibrant student community beyond academics—from technical hackathons and competitive coding to cultural celebrations and professional workshops.
        </p>
      </div>

      {/* Categorized Event Sections */}
      <div className="space-y-4">
        {eventsByCategory.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No events scheduled at the moment.</div>
        ) : (
          eventsByCategory.map((section, idx) => (
            <section key={idx} className="py-12 border-b border-slate-100 last:border-0">
              {/* Category Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold font-heading text-primary flex items-center gap-3">
                  <span className="w-8 h-1 bg-accent rounded-full inline-block"></span>
                  {section.category}
                </h3>
              </div>
              
              {/* Events Grid for Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.events.map((event) => (
                  <div 
                    key={event._id}
                    className="group bg-white rounded-lg shadow-soft overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col"
                  >
                     {/* Event Image Container */}
                     <div className="h-40 w-full overflow-hidden bg-slate-100">
                       <img 
                         src={getFileUrl(event.image)} 
                         alt={event.title}
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                         onError={(e) => {
                           e.target.src = "https://via.placeholder.com/800x400?text=Event+Image";
                         }}
                       />
                     </div>

                     <div className="p-4 flex-grow flex flex-col justify-between">
                       <div>
                         <div className="flex justify-between items-center mb-2">
                           <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                             {section.category}
                           </span>
                           <span className="text-[10px] font-medium text-slate-400">
                             {event.formattedDate}
                           </span>
                         </div>

                         <h4 className="text-base font-semibold text-primary leading-tight mb-1">
                           {event.title}
                         </h4>
                         
                         <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mt-1">
                           {event.description}
                         </p>
                       </div>

                       {/* Minimal Footer */}
                       <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-end">
                          <button className="text-[10px] font-bold text-primary hover:text-accent transition-colors flex items-center gap-1 group/btn">
                            View Details
                            <svg className="w-3 h-3 transform transition-transform group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

    </div>
  );
};

export default StudentLife;
