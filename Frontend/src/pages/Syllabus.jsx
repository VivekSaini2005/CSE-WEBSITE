import React, { useState, useEffect } from "react";
import { fetchSyllabus } from "../api/admin/syllabusService";
import { getFileUrl } from "../utils/fileUtils";

const Syllabus = () => {
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchSyllabus();
        setSyllabusList(response.data || []);
      } catch (err) {
        setError(err.message || "Failed to load syllabus data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

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
        {syllabusList.length === 0 ? (
          <div className="text-center py-10 text-slate-400">No syllabus entries available.</div>
        ) : (
          syllabusList.map((item) => {
            const pdfUrl = getFileUrl(item.pdfUrl);
            
            return (
              <div 
                key={item._id} 
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
                
                <div className="flex flex-wrap items-center gap-3">
                  {pdfUrl ? (
                    <>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all font-semibold text-sm shadow-sm hover:shadow-md whitespace-nowrap"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View PDF
                      </a>
                      <a
                        href={pdfUrl}
                        download
                        className="inline-flex items-center justify-center p-2 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                        title="Download Syllabus"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </>
                  ) : (
                    <span className="text-sm font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 italic">
                      PDF Not Available
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
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
