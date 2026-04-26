import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchGuides, deleteGuide } from '../../../api/admin/guideService';
import toast from 'react-hot-toast';

const GuideList = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const loadGuides = async () => {
    setLoading(true);
    try {
      const response = await fetchGuides();
      setGuides(response.data || []);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch guides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuides();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this guide?')) return;
    try {
      await deleteGuide(id);
      toast.success('Guide deleted successfully');
      loadGuides();
    } catch (error) {
      toast.error(error.message || 'Failed to delete guide');
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Project Guide Management</h1>
          <p className="text-gray-500 mt-1">Manage project guides and their assigned projects</p>
        </div>
        <Link
          to="/admin/guides/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          Add Guide
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-700">Name</th>
                  <th className="p-4 font-semibold text-gray-700">Domain</th>
                  <th className="p-4 font-semibold text-gray-700">Projects Count</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guides.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400">No guides found.</td>
                  </tr>
                ) : (
                  guides.map((guide) => (
                    <React.Fragment key={guide._id}>
                      <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => toggleExpand(guide._id)}>
                        <td className="p-4 font-medium text-gray-800">{guide.name}</td>
                        <td className="p-4 text-gray-600">{guide.domain}</td>
                        <td className="p-4 text-gray-600">
                          <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-sm font-medium">
                            {guide.projects?.length || 0} Projects
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-3 font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/admin/guides/edit/${guide._id}`);
                              }}
                              className="text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(guide._id);
                              }}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedId === guide._id && (
                        <tr className="bg-gray-50/30">
                          <td colSpan="4" className="p-4 border-b border-gray-100">
                            <div className="pl-4 border-l-2 border-indigo-200">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Projects List:</h4>
                              {guide.projects && guide.projects.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1">
                                  {guide.projects.map((project, idx) => (
                                    <li key={idx} className="text-gray-600 text-sm">{project}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-gray-400 text-sm italic">No projects assigned.</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideList;
