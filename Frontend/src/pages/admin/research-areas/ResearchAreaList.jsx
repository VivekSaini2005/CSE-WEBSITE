import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchResearchAreas, deleteResearchArea } from '../../../api/admin/researchAreaService';
import toast from 'react-hot-toast';

const ResearchAreaList = () => {
  const [researchAreas, setResearchAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadResearchAreas = async () => {
    setLoading(true);
    try {
      const response = await fetchResearchAreas();
      setResearchAreas(response.data || []);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch research areas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResearchAreas();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this research area?')) return;
    try {
      await deleteResearchArea(id);
      toast.success('Research area deleted successfully');
      loadResearchAreas();
    } catch (error) {
      toast.error(error.message || 'Failed to delete research area');
    }
  };

  const getShortDescription = (desc) => {
    if (!desc) return '';
    return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Research Area Management</h1>
          <p className="text-gray-500 mt-1">Manage departmental research areas and domains</p>
        </div>
        <Link
          to="/admin/research-areas/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          Add Research Area
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
                  <th className="p-4 font-semibold text-gray-700">Title</th>
                  <th className="p-4 font-semibold text-gray-700">Description</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {researchAreas.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-gray-400">No research areas found.</td>
                  </tr>
                ) : (
                  researchAreas.map((area) => (
                    <tr key={area._id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-800 min-w-[200px]">{area.title}</td>
                      <td className="p-4 text-gray-600 max-w-md">
                        <div className="line-clamp-2">{getShortDescription(area.description)}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 font-medium">
                          <button
                            onClick={() => navigate(`/admin/research-areas/edit/${area._id}`)}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(area._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
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

export default ResearchAreaList;
