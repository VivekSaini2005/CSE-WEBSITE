import React, { useEffect, useState } from 'react';
import { fetchResources, createResource, updateResource, deleteResource } from '../../../api/admin/resourceService';
import { fetchSubjects } from '../../../api/admin/subjectService';
import toast from 'react-hot-toast';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', link: '', subject: '' });

  const loadData = async () => {
    setLoading(true);
    try {
      const [resRes, subRes] = await Promise.all([fetchResources(), fetchSubjects()]);
      setResources(resRes.data || []);
      setSubjects(subRes.data || []);
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
    if (!formData.subject) return toast.error('Please select a subject');
    try {
      if (editingId) {
        await updateResource(editingId, formData);
        toast.success('Resource updated successfully');
      } else {
        await createResource(formData);
        toast.success('Resource created successfully');
      }
      setFormData({ title: '', link: '', subject: '' });
      setShowForm(false);
      setEditingId(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleEdit = (resource) => {
    setFormData({ 
      title: resource.title, 
      link: resource.link, 
      subject: resource.subject?._id || resource.subject 
    });
    setEditingId(resource._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteResource(id);
      toast.success('Resource deleted successfully');
      loadData();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Resource Management</h1>
          <p className="text-gray-500 mt-1">Manage study materials and links</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', link: '', subject: '' }); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          {showForm ? 'Cancel' : 'Add Resource'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeIn">
          <h2 className="text-xl font-bold mb-4 text-gray-800">{editingId ? 'Edit Resource' : 'Add New Resource'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Resource Title (e.g., Unit 1 Notes)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <input
              type="text"
              placeholder="Resource Link (URL or /path/to/file.pdf)"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map(s => (
                <option key={s._id} value={s._id}>{s.name} ({s.semester?.name})</option>
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
                <th className="p-4 font-semibold text-gray-700">Title</th>
                <th className="p-4 font-semibold text-gray-700">Subject</th>
                <th className="p-4 font-semibold text-gray-700">Link</th>
                <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.length === 0 ? (
                <tr><td colSpan="4" className="p-10 text-center text-gray-400">No resources found.</td></tr>
              ) : (
                resources.map(res => (
                  <tr key={res._id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{res.title}</td>
                    <td className="p-4 text-gray-600">{res.subject?.name || 'Unassigned'}</td>
                    <td className="p-4 text-indigo-600 truncate max-w-xs">
                      <a href={res.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{res.link}</a>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleEdit(res)} className="text-yellow-600 hover:text-yellow-700 p-1">Edit</button>
                        <button onClick={() => handleDelete(res._id)} className="text-red-600 hover:text-red-700 p-1">Delete</button>
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

export default Resources;
