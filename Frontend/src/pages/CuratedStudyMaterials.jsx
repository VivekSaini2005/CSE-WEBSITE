import React, { useState, useMemo, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { getSemesters, getSubjects, getResources } from "../api/public/studyMaterials";
import formatMaterials from "../utils/formatMaterials";

const CuratedStudyMaterials = () => {
  const { data: rawSemesters, loading: semLoading } = useFetch(getSemesters);
  const { data: rawSubjects, loading: subLoading } = useFetch(getSubjects);
  const { data: rawResources, loading: resLoading } = useFetch(getResources);

  const [activeSemester, setActiveSemester] = useState("");

  const formattedData = useMemo(() => {
    if (!rawSemesters || !rawSubjects || !rawResources) return [];
    return formatMaterials(rawSemesters, rawSubjects, rawResources);
  }, [rawSemesters, rawSubjects, rawResources]);

  // Set initial active semester once data is loaded
  useEffect(() => {
    if (formattedData.length > 0 && !activeSemester) {
      setActiveSemester(formattedData[0].semester);
    }
  }, [formattedData, activeSemester]);

  if (semLoading || subLoading || resLoading) {
    return (
      <div className="flex justify-center py-20 items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 w-full animate-fade-in-up items-center">
      {/* Header Section */}
      <div className="w-full border-b border-slate-200 pb-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Curated Study Materials
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          Access high-quality lecture notes, recommended textbooks, and supplemental learning resources curated by the CSE department.
        </p>
      </div>

      {formattedData.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-soft border border-slate-100 italic text-slate-400 w-full max-w-4xl">
          No study materials discovered yet. Check back soon.
        </div>
      ) : (
        <>
          {/* Tab Navigation for Semesters */}
          <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-3 rounded-xl shadow-soft border border-slate-100 max-w-5xl w-full">
            {formattedData.map((sem) => (
              <button
                key={sem.semesterId}
                onClick={() => setActiveSemester(sem.semester)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none whitespace-nowrap ${
                  activeSemester === sem.semester 
                    ? "bg-primary text-white shadow-md transform -translate-y-px" 
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-primary"
                }`}
              >
                {sem.semester}
              </button>
            ))}
          </div>

          {/* Display Grid of Subject Cards for the active Semester */}
          <div className="w-full max-w-6xl">
            {formattedData
              .filter((sem) => sem.semester === activeSemester)
              .map((sem) => (
                <div key={sem.semesterId} className="space-y-10 animate-fade-in-up">
                  <h3 className="text-2xl font-bold font-heading text-slate-800 border-l-4 border-accent pl-4 mb-8">
                    {sem.semester} - Core Subjects
                  </h3>
                  
                  {sem.subjects.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">No subjects listed for this semester.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sem.subjects.map((subject) => (
                        <div 
                          key={subject.subjectId} 
                          className="bg-white p-6 rounded-xl shadow-soft border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          <h4 className="text-xl font-bold font-heading text-primary border-b border-slate-100 pb-3 mb-4">
                            {subject.name}
                          </h4>
                          
                          <div className="space-y-3">
                            {subject.resources.length === 0 ? (
                              <p className="text-xs text-slate-400 italic">No resources added.</p>
                            ) : (
                              subject.resources.map((resource) => (
                                <div key={resource._id} className="flex items-start gap-3 group">
                                  {/* Visual Indicator/Icon based on Title */}
                                  <div className="mt-1 flex-shrink-0">
                                     {resource.title.toLowerCase().includes("pdf") ? (
                                       <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                       </svg>
                                     ) : resource.title.toLowerCase().includes("youtube") || resource.title.toLowerCase().includes("video") ? (
                                       <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                       </svg>
                                     ) : (
                                       <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                       </svg>
                                     )}
                                  </div>
                                  
                                  <a 
                                    href={resource.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-slate-700 underline decoration-slate-200 group-hover:text-primary group-hover:decoration-primary transition-all underline-offset-4"
                                  >
                                    {resource.title}
                                  </a>
                                </div>
                              ))
                            )}
                          </div>

                          <p className="text-[10px] text-muted uppercase tracking-widest mt-6 pt-4 border-t border-slate-50 font-bold">
                            Subject Directory
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </>
      )}

      {/* Placeholder Help State */}
      <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl max-w-4xl text-center">
        <h5 className="font-bold text-primary mb-2">Request Additional Materials?</h5>
        <p className="text-sm text-slate-600">
           Are you missing resources for a specific elective? Contact the CR or reach out to the departmental administrative hub directly.
        </p>
      </div>

    </div>
  );
};

export default CuratedStudyMaterials;
