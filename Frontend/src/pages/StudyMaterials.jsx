import React, { useState, useEffect } from 'react';
import Loader from '../components/common/Loader';
import { getMaterials } from '../api/public/materials';
import useFetch from '../hooks/useFetch';

const StudyMaterials = () => {
  const { data: materials, loading, error } = useFetch(getMaterials);
  
  // Accordion states
  const [expandedSemesters, setExpandedSemesters] = useState({});
  const [expandedSubjects, setExpandedSubjects] = useState({});

  // Auto-expand first semester on initial load
  useEffect(() => {
    if (materials?.length > 0 && Object.keys(expandedSemesters).length === 0) {
      setExpandedSemesters({ [materials[0]._id]: true });
    }
  }, [materials, expandedSemesters]);

  // Link Helpers
  const getFullLink = (link) => {
    if (!link) return '#';
    if (link.startsWith('/data')) {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const serverBase = apiBase.replace('/api', '');
      return `${serverBase}${link}`;
    }
    return link;
  };

  const getLinkLabel = (link) => {
    if (!link) return 'Not Available';
    return link.toLowerCase().endsWith('.pdf') ? 'View PDF' : 'Open Link';
  };

  const toggleSemester = (id) => {
    setExpandedSemesters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubject = (id) => {
    setExpandedSubjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <Loader fullPage />;

  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-24 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to load materials</h2>
        <p className="text-gray-500 mb-8">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {/* Premium Header */}
      <div className="relative mb-16 text-center">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        <h1 className="relative text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Academic <span className="text-indigo-600">Materials</span>
        </h1>
        <p className="relative text-lg text-gray-500 max-w-2xl mx-auto font-medium">
          Access high-quality department resources, lecture notes, and study guides.
        </p>
      </div>

      <div className="space-y-4">
        {materials?.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-gray-400 font-medium italic">No materials available. Check back soon!</p>
          </div>
        ) : (
          materials?.map((sem) => (
            <div key={sem._id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              {/* Semester Header */}
              <div 
                className={`flex items-center justify-between px-6 py-5 cursor-pointer select-none transition-colors ${expandedSemesters[sem._id] ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleSemester(sem._id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors ${expandedSemesters[sem._id] ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{sem.semester}</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{sem.subjects?.length || 0} Subjects</p>
                  </div>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${expandedSemesters[sem._id] ? 'rotate-180 text-indigo-600' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Semester Content (Subject List) */}
              <div className={`overflow-hidden transition-all duration-300 ${expandedSemesters[sem._id] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 border-t border-gray-50 bg-gray-50/20">
                  {sem.subjects?.length === 0 ? (
                    <div className="py-8 text-center bg-white rounded-xl border border-gray-100 border-dashed">
                      <p className="text-sm text-gray-400 italic">No subjects available yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sem.subjects?.map((subject) => (
                        <div key={subject._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                          {/* Subject Header */}
                          <div 
                            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleSubject(subject._id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full transition-colors ${expandedSubjects[subject._id] ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                              <h3 className="font-bold text-gray-700">{subject.name}</h3>
                            </div>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-5 w-5 text-gray-300 transition-transform ${expandedSubjects[subject._id] ? 'rotate-180 text-gray-500' : ''}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>

                          {/* Subject Content (Resource List) */}
                          <div className={`overflow-hidden transition-all duration-300 ${expandedSubjects[subject._id] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-5 pb-5 pt-1 border-t border-gray-50 bg-gray-50/10">
                              <div className="space-y-1.5">
                                {subject.resources?.length === 0 ? (
                                  <p className="text-xs text-gray-400 italic py-2 pl-5">No files linked yet.</p>
                                ) : (
                                  subject.resources?.map((resource, resIdx) => (
                                    <div key={resource._id || `${subject._id}-res-${resIdx}`} className="group relative flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                      <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
                                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          </svg>
                                        </div>
                                        <span className="text-sm text-gray-700 font-semibold truncate">
                                          {resource.title}
                                        </span>
                                      </div>
                                      
                                      <a 
                                        href={getFullLink(resource.link)} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg transition-all ${
                                          resource.link 
                                            ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm' 
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        onClick={(e) => !resource.link && e.preventDefault()}
                                      >
                                        {getLinkLabel(resource.link)}
                                      </a>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modern Footer Help Section */}
      <div className="mt-20 relative overflow-hidden bg-indigo-600 rounded-[2rem] p-10 flex flex-col items-center text-center shadow-2xl shadow-indigo-200">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-3">Request Additional Data?</h3>
          <p className="text-indigo-100 mb-8 max-w-lg font-medium opacity-90">
            If you're looking for specific materials or want to contribute to the department archive, we're here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-10 py-3.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-900/20">
              Contact Support
            </button>
            <button className="bg-indigo-500/30 text-white border border-white/20 backdrop-blur-sm px-10 py-3.5 rounded-full font-bold hover:bg-indigo-500/40 transition-all">
              View Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;
