import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAlumniById, updateAlumni } from '../../../api/admin/alumniService';
import toast from 'react-hot-toast';

const EditAlumni = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    position: '',
    company: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Helper to resolve image URLs for preview
  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace('/api', '');
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  useEffect(() => {
    const getAlumni = async () => {
      try {
        const res = await fetchAlumniById(id);
        const data = res.data;
        setForm({
          name: data.name || '',
          position: data.position || '',
          company: data.company || '',
          image: data.image || ''
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch alumni details');
        toast.error('Could not load alumni profile');
      } finally {
        setLoading(false);
      }
    };

    getAlumni();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await updateAlumni(id, form);
      toast.success('Alumni profile updated successfully!');
      navigate('/admin/alumni');
    } catch (err) {
      setError(err.message || 'Failed to update alumni');
      toast.error(err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/alumni')}
          className="text-gray-500 hover:text-indigo-600 flex items-center gap-2 mb-4 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Alumni List
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Edit Alumni Profile</h1>
        <p className="text-gray-500 mt-1">Update information for {form.name}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {error && (
          <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g., Google"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image URL</label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              {form.image && (
                <div className="mt-4 p-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
                   <img src={getImageUrl(form.image)} alt="Preview" className="h-20 w-20 object-cover rounded-full shadow-sm border-2 border-white" />
                   <div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Image Preview</p>
                     <p className="text-xs text-gray-500 truncate max-w-xs">{form.image}</p>
                   </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-70 disabled:shadow-none flex justify-center items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Updating Profile...
                </>
              ) : (
                'Update Alumni Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAlumni;
