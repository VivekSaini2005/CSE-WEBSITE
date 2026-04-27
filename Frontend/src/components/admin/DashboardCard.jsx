import React from 'react';

/**
 * Reusable card component for the Admin Dashboard
 * @param {string} title - The title of the module
 * @param {string} description - A brief description of the module
 * @param {string} image - The URL for the header image
 * @param {function} onClick - Click handler for navigation
 */
const DashboardCard = ({ title, description, image, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col h-full group"
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-grow">
          {description}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-indigo-600 text-xs font-bold uppercase tracking-widest">
          Enter Module
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
