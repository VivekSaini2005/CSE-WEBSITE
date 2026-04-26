import React, { useEffect, useState, useCallback } from 'react';
import { fetchSemesters, createSemester, deleteSemester } from '../api/admin/semesterService';
import { fetchSubjects, createSubject, deleteSubject } from '../api/admin/subjectService';
import { fetchResources, createResource, deleteResource } from '../api/admin/resourceService';
import { formatMaterials } from '../utils/formatMaterials';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const StudyMaterials = () => {
  const { isAdmin } = useAuth();
  const [materialsData, setMaterialsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Accordion states
  const [expandedSemesters, setExpandedSemesters] = useState({});
  const [expandedSubjects, setExpandedSubjects] = useState({});

  // Admin form visibility states
  const [showAddSemester, setShowAddSemester] = useState(false);
  const [showAddSubject, setShowAddSubject] = useState(null); 
  const [showAddResource, setShowAddResource] = useState(null); 

  // Form data states
  const [newSemesterName, setNewSemesterName] = useState('');
  const [newSubjectData, setNewSubjectData] = useState({ name: '' });
  const [newResourceData, setNewResourceData] = useState({ title: '', link: '' });

  const fetchAllMaterials = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    setError(null);
    try {
      const [semRes, subRes, resRes] = await Promise.all([
        fetchSemesters(),
        fetchSubjects(),
        fetchResources()
      ]);

      const formatted = formatMaterials(
        semRes.data || [],
        subRes.data || [],
        resRes.data || []
      );
      
      setMaterialsData(formatted);
      
      // Auto-expand first semester if initial load and data exists
      if (isInitial && formatted.length > 0) {
        setExpandedSemesters({ [formatted[0].semesterId]: true });
      }
    } catch (err) {
      setError('Failed to load study materials. Please try again later.');
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllMaterials(true);
  }, [fetchAllMaterials]);

  const toggleSemester = (id) => {
    setExpandedSemesters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubject = (id) => {
    setExpandedSubjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Admin Handlers
  const handleAddSemester = async (e) => {
    e.preventDefault();
    try {
      await createSemester({ name: newSemesterName });
      toast.success('Semester added');
      setNewSemesterName('');
      setShowAddSemester(false);
      fetchAllMaterials();
    } catch (err) {
      toast.error(err.message || 'Failed to add semester');
    }
  };

  const handleAddSubject = async (e, semesterId) => {
    e.preventDefault();
    try {
      await createSubject({ name: newSubjectData.name, semester: semesterId });
      toast.success('Subject added');
      setNewSubjectData({ name: '' });
      setShowAddSubject(null);
      setExpandedSemesters(prev => ({ ...prev, [semesterId]: true }));
      fetchAllMaterials();
    } catch (err) {
      toast.error(err.message || 'Failed to add subject');
    }
  };

  const handleAddResource = async (e, subjectId) => {
    e.preventDefault();
    try {
      await createResource({ ...newResourceData, subject: subjectId });
      toast.success('Resource added');
      setNewResourceData({ title: '', link: '' });
      setShowAddResource(null);
      setExpandedSubjects(prev => ({ ...prev, [subjectId]: true }));
      fetchAllMaterials();
    } catch (err) {
      toast.error(err.message || 'Failed to add resource');
    }
  };

  const handleDeleteSemester = async (id) => {
    if (!window.confirm('Delete this semester and all its contents?')) return;
    try {
      await deleteSemester(id);
      toast.success('Semester deleted');
      fetchAllMaterials();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm('Delete this subject?')) return;
    try {
      await deleteSubject(id);
      toast.success('Subject deleted');
      fetchAllMaterials();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const handleDeleteResource = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    try {
      await deleteResource(id);
      toast.success('Resource deleted');
      fetchAllMaterials();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-[60vh]">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
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
        
        {isAdmin && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setShowAddSemester(!showAddSemester)}
              className="group relative bg-gray-900 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-gray-800 transition-all flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Add Semester</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-5 w-5 group-hover:rotate-90 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        )}

        {showAddSemester && (
          <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 animate-slideDown">
            <form onSubmit={handleAddSemester} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Semester Name (e.g. 1st Semester)" 
                className="flex-1 p-3 bg-gray-50 border-none rounded-xl outline-none ring-2 ring-transparent focus:ring-indigo-500 transition-all"
                value={newSemesterName}
                onChange={(e) => setNewSemesterName(e.target.value)}
                required
              />
              <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">Save</button>
            </form>
          </div>
        )}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {materialsData.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-gray-400 font-medium italic">No materials found. Check back soon!</p>
          </div>
        ) : (
          materialsData.map((sem) => (
            <div key={sem.semesterId} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              {/* Semester Header */}
              <div 
                className={`flex items-center justify-between px-6 py-5 cursor-pointer select-none transition-colors ${expandedSemesters[sem.semesterId] ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleSemester(sem.semesterId)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors ${expandedSemesters[sem.semesterId] ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{sem.semester}</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{sem.subjects.length} Subjects</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <div className="flex items-center gap-2 pr-4 border-r border-gray-200" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setShowAddSubject(showAddSubject === sem.semesterId ? null : sem.semesterId)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all"
                        title="Add Subject"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteSemester(sem.semesterId)}
                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                        title="Delete Semester"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${expandedSemesters[sem.semesterId] ? 'rotate-180 text-indigo-600' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Semester Content (Subject List) */}
              <div className={`overflow-hidden transition-all duration-300 ${expandedSemesters[sem.semesterId] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 border-t border-gray-50 bg-gray-50/20">
                  {showAddSubject === sem.semesterId && (
                    <div className="mb-4 animate-slideDown" onClick={(e) => e.stopPropagation()}>
                      <form onSubmit={(e) => handleAddSubject(e, sem.semesterId)} className="flex gap-2 bg-white p-3 rounded-xl shadow-sm border border-indigo-100">
                        <input 
                          type="text" 
                          placeholder="New Subject Title" 
                          className="flex-1 p-2 text-sm bg-gray-50 border-none rounded-lg outline-none focus:ring-1 focus:ring-indigo-500"
                          value={newSubjectData.name}
                          onChange={(e) => setNewSubjectData({ name: e.target.value })}
                          required
                        />
                        <button type="submit" className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg font-bold">Add</button>
                      </form>
                    </div>
                  )}

                  {sem.subjects.length === 0 ? (
                    <div className="py-8 text-center bg-white rounded-xl border border-gray-100 border-dashed">
                      <p className="text-sm text-gray-400 italic">No subjects available yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sem.subjects.map((subject) => (
                        <div key={subject.subjectId} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                          {/* Subject Header */}
                          <div 
                            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleSubject(subject.subjectId)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full transition-colors ${expandedSubjects[subject.subjectId] ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                              <h3 className="font-bold text-gray-700">{subject.name}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              {isAdmin && (
                                <div className="flex items-center gap-1.5 mr-2 pr-3 border-r border-gray-100" onClick={(e) => e.stopPropagation()}>
                                  <button 
                                    onClick={() => setShowAddResource(showAddResource === subject.subjectId ? null : subject.subjectId)}
                                    className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-all"
                                    title="Add Resource"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteSubject(subject.subjectId)}
                                    className="p-1 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded transition-all"
                                    title="Delete Subject"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 text-gray-300 transition-transform ${expandedSubjects[subject.subjectId] ? 'rotate-180 text-gray-500' : ''}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>

                          {/* Subject Content (Resource List) */}
                          <div className={`overflow-hidden transition-all duration-300 ${expandedSubjects[subject.subjectId] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-5 pb-5 pt-1 border-t border-gray-50 bg-gray-50/10">
                              {showAddResource === subject.subjectId && (
                                <div className="mb-4 animate-slideDown" onClick={(e) => e.stopPropagation()}>
                                  <form onSubmit={(e) => handleAddResource(e, subject.subjectId)} className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-inner">
                                    <input 
                                      type="text" 
                                      placeholder="Material Title" 
                                      className="p-2 border-none bg-gray-50 rounded-md text-xs outline-none focus:ring-1 focus:ring-indigo-400"
                                      value={newResourceData.title}
                                      onChange={(e) => setNewResourceData({ ...newResourceData, title: e.target.value })}
                                      required
                                    />
                                    <div className="flex gap-1">
                                      <input 
                                        type="text" 
                                        placeholder="Link / URL" 
                                        className="flex-1 p-2 border-none bg-gray-50 rounded-md text-xs outline-none focus:ring-1 focus:ring-indigo-400"
                                        value={newResourceData.link}
                                        onChange={(e) => setNewResourceData({ ...newResourceData, link: e.target.value })}
                                        required
                                      />
                                      <button type="submit" className="bg-indigo-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-md">Save</button>
                                    </div>
                                  </form>
                                </div>
                              )}

                              <div className="space-y-1.5">
                                {subject.resources.length === 0 ? (
                                  <p className="text-xs text-gray-400 italic py-2 pl-5">No files linked yet.</p>
                                ) : (
                                  subject.resources.map((resource) => (
                                    <div key={resource._id} className="group relative flex items-center justify-between p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                                      <div className="flex items-center gap-3 min-w-0 pr-8">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          </svg>
                                        </div>
                                        <a 
                                          href={resource.link} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-sm text-gray-600 font-medium group-hover:text-indigo-600 transition-colors truncate"
                                        >
                                          {resource.title}
                                        </a>
                                      </div>
                                      
                                      {isAdmin && (
                                        <button 
                                          onClick={() => handleDeleteResource(resource._id)}
                                          className="absolute right-2 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
                                          title="Delete Resource"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                        </button>
                                      )}
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
