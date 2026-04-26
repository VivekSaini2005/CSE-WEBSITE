import React, { useState, useEffect } from "react";
import { fetchGuides } from "../api/admin/guideService";

import researchAreas from "../data/researchAreasData";
import publications from "../data/publicationsData";



// import projectGuideData from "../data/projectGuideData";

const ProjectGuideCard = ({ guide }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayProjects = isExpanded ? guide.projects : guide.projects.slice(0, 2);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full">
      {/* Header with Icon and Name */}
      <div className="flex justify-between items-start mb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            {guide.domain}
          </span>
          <h4 className="text-xl font-bold text-primary font-heading group-hover:text-primary transition-colors pr-4">
            {guide.name}
          </h4>
        </div>
        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:bg-primary/5 transition-all shrink-0">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
           </svg>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-100 mb-6"></div>
      
      {/* List Section */}
      <div className="flex-grow space-y-4">
        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          Proposed Research Tracks
          <div className="flex-grow h-[1px] bg-slate-50"></div>
        </h5>
        
        <ul className="space-y-3">
          {displayProjects.map((proj, pIdx) => (
            <li key={pIdx} className="flex gap-3 text-slate-600 text-sm leading-relaxed group/item">
              <svg className="w-4 h-4 text-accent mt-0.5 shrink-0 transition-transform group-hover/item:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="group-hover/item:text-slate-900 transition-colors">{proj}</span>
            </li>
          ))}
        </ul>

        {guide.projects.length > 2 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-bold text-primary/60 hover:text-primary mt-2 transition-colors flex items-center gap-1 focus:outline-none"
          >
            {isExpanded ? "Collapse Projects" : `+ ${guide.projects.length - 2} More Projects`}
            <svg className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Action Button - Redirect to Mailto */}
      <div className="mt-8 pt-6 border-t border-slate-50">
        <a 
          href={`mailto:${guide.email}?subject=Research inquiry: Project Guidance in ${guide.domain}&body=Dear ${guide.name},%0D%0A%0D%0AI am interested in applying for research project guidance under your supervision for the ${guide.domain} track. Please let me know the next steps for consultation.%0D%0A%0D%0ABest regards.`}
          className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Apply via Email
        </a>
      </div>
    </div>
  );
};

const Research = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [guides, setGuides] = useState([]);
  const [loadingGuides, setLoadingGuides] = useState(false);
  const [guidesError, setGuidesError] = useState(null);

  useEffect(() => {
    const loadGuides = async () => {
      setLoadingGuides(true);
      setGuidesError(null);
      try {
        const response = await fetchGuides();
        setGuides(response.data || []);
      } catch (err) {
        console.error("Error fetching guides:", err);
        setGuidesError("Failed to load project guides.");
      } finally {
        setLoadingGuides(false);
      }
    };

    if (activeTab === "All" || activeTab === "Project Guide") {
      loadGuides();
    }
  }, [activeTab]);

  const tabs = ["All", "Research Areas", "Publications", "Project Guide"];

  return (
    <div className="flex flex-col gap-10 w-full animate-fade-in-up">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Research & Innovation
        </h2>
        <p className="text-muted mt-3 max-w-3xl mx-auto leading-relaxed">
          Our department stands at the forefront of technological advancement, driving rigorous academic research yielding tangible impacts across industry and society.
        </p>
      </div>

      {/* Underline Tabs */}
      <div className="flex justify-center flex-wrap gap-2 sm:gap-6 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium transition-all duration-300 text-sm focus:outline-none border-b-2 -mb-[2px] ${
              activeTab === tab 
                ? "border-primary text-primary" 
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-8 md:gap-12">
        
        {/* Research Areas */}
        {(activeTab === "All" || activeTab === "Research Areas") && (
          <div className="py-6">
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-heading text-slate-800 mb-2">Research Areas</h3>
              <div className="w-16 h-1 bg-accent rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchAreas.map((area, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-soft border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
                  <h4 className="text-lg font-bold text-primary mb-3 font-heading">{area.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {(activeTab === "All" || activeTab === "Publications") && (
          <div className="py-6">
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-heading text-slate-800 mb-2">Recent Publications</h3>
              <div className="w-16 h-1 bg-accent rounded"></div>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft border border-slate-100 overflow-hidden px-6 md:px-8 py-2">
              <ul className="flex flex-col">
                {publications.map((pub, idx) => (
                  <li key={idx} className="border-b border-slate-100 last:border-0 py-6">
                    <h4 className="font-semibold text-lg md:text-xl text-primary leading-snug mb-2 font-heading">{pub.title}</h4>
                    <p className="text-slate-700 text-sm mb-2"><span className="font-semibold">Authors:</span> {pub.authors}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className="text-xs md:text-sm text-slate-600 italic border border-slate-200 bg-slate-50 px-3 py-1 rounded-full">
                        {pub.venue}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {pub.year}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Project Guide Section */}
        {(activeTab === "All" || activeTab === "Project Guide") && (
          <div className="py-6">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-800 mb-2">Project Guide Directory</h3>
                <div className="w-16 h-1 bg-accent rounded"></div>
              </div>
              <p className="text-xs text-slate-500 font-medium italic">
                * Students are advised to review pre-requisites before applying.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {loadingGuides ? (
                <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-slate-500 font-medium">Fetching guides...</p>
                </div>
              ) : guidesError ? (
                <div className="col-span-full py-10 text-center">
                  <p className="text-red-500 font-medium">{guidesError}</p>
                </div>
              ) : guides.length === 0 ? (
                <div className="col-span-full py-10 text-center">
                  <p className="text-slate-400 italic">No project guides available at the moment.</p>
                </div>
              ) : (
                guides.map((guide) => (
                  <ProjectGuideCard key={guide._id} guide={guide} />
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Research;
