import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchSyllabus, deleteSyllabus } from '../../../api/admin/syllabusService';
import { getFileUrl } from '../../../utils/fileUtils';
import toast from 'react-hot-toast';

const SyllabusList = () => {
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadSyllabus = async () => {
    setLoading(true);
    try {
      const response = await fetchSyllabus();
      // Handle the standard API response structure { data: [...] }
      const data = response.data || [];
      setSyllabusList(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch syllabus');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSyllabus();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this syllabus?')) return;
    try {
      await deleteSyllabus(id);
      toast.success('Syllabus deleted successfully');
      loadSyllabus();
    } catch (error) {
      toast.error(error.message || 'Failed to delete syllabus');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Syllabus Management</h1>
          <p className="text-gray-500 mt-1">Manage department syllabus by category</p>
        </div>
        <Link
          to="/admin/syllabus/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          Add Syllabus
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
                  <th className="p-4 font-semibold text-gray-700">Subject</th>
                  <th className="p-4 font-semibold text-gray-700">Category</th>
                  <th className="p-4 font-semibold text-gray-700">PDF File</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {syllabusList.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400">No syllabus entries found.</td>
                  </tr>
                ) : (
                  syllabusList.map((item) => {
                    const pdfUrl = getFileUrl(item.pdfUrl);
                    
                    return (
                      <tr key={item._id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-medium text-gray-800">{item.subject}</td>
                        <td className="p-4 text-gray-600 capitalize">{item.category}</td>
                        <td className="p-4">
                          {pdfUrl ? (
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
                            >
                              View PDF
                            </a>
                          ) : (
                            <span className="text-gray-400 italic text-sm">Not Available</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-3 font-medium">
                            <button
                              onClick={() => navigate(`/admin/syllabus/edit/${item._id}`)}
                              className="text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusList;
