import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchPublications, deletePublication } from '../../../api/admin/publicationService';
import toast from 'react-hot-toast';

const PublicationList = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadPublications = async () => {
    setLoading(true);
    try {
      const response = await fetchPublications();
      const data = response.data || [];
      // Sort by year descending (latest year first)
      const sortedData = [...data].sort((a, b) => (b.year || 0) - (a.year || 0));
      setPublications(sortedData);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch publications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublications();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this publication?')) return;
    try {
      await deletePublication(id);
      toast.success('Publication deleted successfully');
      loadPublications();
    } catch (error) {
      toast.error(error.message || 'Failed to delete publication');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Publication Management</h1>
          <p className="text-gray-500 mt-1">Manage research publications and journals</p>
        </div>
        <Link
          to="/admin/publications/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          Add Publication
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
                  <th className="p-4 font-semibold text-gray-700">Authors</th>
                  <th className="p-4 font-semibold text-gray-700">Venue</th>
                  <th className="p-4 font-semibold text-gray-700">Year</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {publications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-400">No publications found.</td>
                  </tr>
                ) : (
                  publications.map((pub) => (
                    <tr key={pub._id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-800 min-w-[250px]">{pub.title}</td>
                      <td className="p-4 text-gray-600">
                        {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
                      </td>
                      <td className="p-4 text-gray-600 italic whitespace-nowrap">{pub.venue}</td>
                      <td className="p-4 text-gray-600">
                        <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-sm font-medium">
                          {pub.year}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 font-medium">
                          <button
                            onClick={() => navigate(`/admin/publications/edit/${pub._id}`)}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(pub._id)}
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

export default PublicationList;
