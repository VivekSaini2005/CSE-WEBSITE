import React, { useState } from "react";
import syllabusData from "../data/syllabusData";

const Syllabus = () => {
  return (
    <div className="flex flex-col gap-10 w-full animate-fade-in-up items-center">
      {/* Centered Top Header */}
      <div className="w-full border-b border-slate-200 pb-4 text-center mb-6">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Academic Syllabus
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          Access the comprehensive departmental curriculum, structured blueprints, and course progressions for all primary and specialized degrees.
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-4 pb-12">
        {syllabusData.map((item) => (
          <div 
            key={item.id} 
            className="group bg-white p-5 rounded-xl shadow-soft border border-slate-100 hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest font-bold text-accent">
                {item.category}
              </span>
              <h3 className="text-lg font-bold font-heading text-slate-800 leading-tight group-hover:text-primary transition-colors">
                {item.subject}
              </h3>
            </div>
            
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-opacity-90 transition-all font-semibold text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View PDF
            </a>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl max-w-4xl text-center">
        <p className="text-sm text-slate-600">
          The curriculum is updated annually to reflect industry standards. For specific elective inquiries or historical archives, please contact the departmental clerk.
        </p>
      </div>
    </div>
  );
};

export default Syllabus;
