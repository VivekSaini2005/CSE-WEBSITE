import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchMaterials, deleteMaterial } from '../../../api/admin/materialService';
import toast from 'react-hot-toast';

const MaterialsList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadMaterials = async () => {
    setLoading(true);
    try {
      const response = await fetchMaterials();
      const data = response.data || [];
      setMaterials(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this semester and all its subjects/resources?')) return;
    try {
      await deleteMaterial(id);
      toast.success('Material deleted successfully');
      loadMaterials();
    } catch (error) {
      toast.error(error.message || 'Failed to delete material');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Materials Management</h1>
          <p className="text-gray-500 mt-1">Manage semesters, subjects, and study resources</p>
        </div>
        <Link
          to="/admin/materials/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          Add Semester
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
                  <th className="p-4 font-semibold text-gray-700">Semester</th>
                  <th className="p-4 font-semibold text-gray-700">Subjects Count</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-gray-400">No materials found.</td>
                  </tr>
                ) : (
                  materials.map((item) => (
                    <tr key={item._id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{item.semester}</td>
                      <td className="p-4 text-gray-600">{item.subjects?.length || 0} Subjects</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 font-medium">
                          <button
                            onClick={() => navigate(`/admin/materials/edit/${item._id}`)}
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

export default MaterialsList;
