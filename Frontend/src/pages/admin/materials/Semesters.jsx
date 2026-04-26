import React, { useEffect, useState } from 'react';
import { fetchSemesters, createSemester, updateSemester, deleteSemester } from '../../../api/admin/semesterService';
import toast from 'react-hot-toast';

const Semesters = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  const loadSemesters = async () => {
    setLoading(true);
    try {
      const res = await fetchSemesters();
      setSemesters(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch semesters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSemesters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSemester(editingId, formData);
        toast.success('Semester updated successfully');
      } else {
        await createSemester(formData);
        toast.success('Semester created successfully');
      }
      setFormData({ name: '' });
      setShowForm(false);
      setEditingId(null);
      loadSemesters();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleEdit = (semester) => {
    setFormData({ name: semester.name });
    setEditingId(semester._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This will delete all associated subjects and resources if not handled by backend.')) return;
    try {
      await deleteSemester(id);
      toast.success('Semester deleted successfully');
      loadSemesters();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Semester Management</h1>
          <p className="text-gray-500 mt-1">Manage academic semesters for study materials</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '' }); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          {showForm ? 'Cancel' : 'Add Semester'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeIn">
          <h2 className="text-xl font-bold mb-4 text-gray-800">{editingId ? 'Edit Semester' : 'Add New Semester'}</h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="Semester Name (e.g., 1st Semester)"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition-colors">
              {editingId ? 'Update' : 'Save'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-700">Name</th>
                <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {semesters.length === 0 ? (
                <tr><td colSpan="2" className="p-10 text-center text-gray-400">No semesters found.</td></tr>
              ) : (
                semesters.map(s => (
                  <tr key={s._id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{s.name}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleEdit(s)} className="text-yellow-600 hover:text-yellow-700 p-1">Edit</button>
                        <button onClick={() => handleDelete(s._id)} className="text-red-600 hover:text-red-700 p-1">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Semesters;
