import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPublicationById, updatePublication } from '../../../api/admin/publicationService';
import toast from 'react-hot-toast';

const EditPublication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    venue: '',
    year: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadPublication = async () => {
      try {
        const response = await fetchPublicationById(id);
        const pub = response.data;
        if (pub) {
          setFormData({
            title: pub.title,
            authors: Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors,
            venue: pub.venue,
            year: pub.year,
          });
        }
      } catch (error) {
        toast.error(error.message || 'Failed to fetch publication details');
        navigate('/admin/publications');
      } finally {
        setLoading(false);
      }
    };
    loadPublication();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    const authorsArray = formData.authors.split(',').map(a => a.trim()).filter(a => a !== '');
    if (authorsArray.length === 0) {
      toast.error('At least one author is required');
      return;
    }

    setSaving(true);
    try {
      await updatePublication(id, {
        ...formData,
        authors: authorsArray,
        year: Number(formData.year)
      });
      toast.success('Publication updated successfully');
      navigate('/admin/publications');
    } catch (error) {
      toast.error(error.message || 'Failed to update publication');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Edit Publication</h1>
        <p className="text-gray-500 mt-1">Update research paper details</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
              <textarea
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none font-medium text-gray-900"
                placeholder="Enter publication title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Authors</label>
              <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Author 1, Author 2, Author 3..."
                required
              />
              <p className="text-[11px] text-gray-400 mt-1 italic">Separate authors with commas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Venue / Journal</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. IEEE Conference, Springer Journal"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. 2024"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Update Publication'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/publications')}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPublication;
