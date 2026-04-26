import React, { useEffect, useState } from 'react';
import { fetchSubjects, createSubject, updateSubject, deleteSubject } from '../../../api/admin/subjectService';
import { fetchSemesters } from '../../../api/admin/semesterService';
import toast from 'react-hot-toast';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', semester: '' });

  const loadData = async () => {
    setLoading(true);
    try {
      const [subRes, semRes] = await Promise.all([fetchSubjects(), fetchSemesters()]);
      setSubjects(subRes.data || []);
      setSemesters(semRes.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.semester) return toast.error('Please select a semester');
    try {
      if (editingId) {
        await updateSubject(editingId, formData);
        toast.success('Subject updated successfully');
      } else {
        await createSubject(formData);
        toast.success('Subject created successfully');
      }
      setFormData({ name: '', semester: '' });
      setShowForm(false);
      setEditingId(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleEdit = (subject) => {
    setFormData({ name: subject.name, semester: subject.semester?._id || subject.semester });
    setEditingId(subject._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteSubject(id);
      toast.success('Subject deleted successfully');
      loadData();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Subject Management</h1>
          <p className="text-gray-500 mt-1">Manage subjects and link them to semesters</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', semester: '' }); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          {showForm ? 'Cancel' : 'Add Subject'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeIn">
          <h2 className="text-xl font-bold mb-4 text-gray-800">{editingId ? 'Edit Subject' : 'Add New Subject'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Subject Name (e.g., Computer Networks)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            >
              <option value="">Select Semester</option>
              {semesters.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
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
                <th className="p-4 font-semibold text-gray-700">Subject Name</th>
                <th className="p-4 font-semibold text-gray-700">Semester</th>
                <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length === 0 ? (
                <tr><td colSpan="3" className="p-10 text-center text-gray-400">No subjects found.</td></tr>
              ) : (
                subjects.map(sub => (
                  <tr key={sub._id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{sub.name}</td>
                    <td className="p-4 text-gray-600">{sub.semester?.name || 'Unassigned'}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleEdit(sub)} className="text-yellow-600 hover:text-yellow-700 p-1">Edit</button>
                        <button onClick={() => handleDelete(sub._id)} className="text-red-600 hover:text-red-700 p-1">Delete</button>
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

export default Subjects;
