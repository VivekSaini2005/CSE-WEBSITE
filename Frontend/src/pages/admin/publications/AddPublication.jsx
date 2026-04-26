import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPublication } from '../../../api/admin/publicationService';
import toast from 'react-hot-toast';

const AddPublication = () => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    venue: '',
    year: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);
    try {
      await createPublication({
        ...formData,
        authors: authorsArray,
        year: Number(formData.year)
      });
      toast.success('Publication added successfully');
      navigate('/admin/publications');
    } catch (error) {
      toast.error(error.message || 'Failed to add publication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add Publication</h1>
        <p className="text-gray-500 mt-1">Register a new research publication or journal</p>
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
                rows="2"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
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
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Create Publication'}
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

export default AddPublication;
