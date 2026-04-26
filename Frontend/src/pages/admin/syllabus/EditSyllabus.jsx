import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSyllabusById, updateSyllabus } from '../../../api/admin/syllabusService';
import toast from 'react-hot-toast';

const EditSyllabus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Undergraduate',
    pdfUrl: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadSyllabusDetails = async () => {
      try {
        const response = await fetchSyllabusById(id);
        // Standard API response structure { data: { ... } }
        const syllabus = response.data || response;
        
        if (syllabus) {
          setFormData({
            subject: syllabus.subject || '',
            category: syllabus.category || 'Undergraduate',
            pdfUrl: syllabus.pdfUrl || ''
          });
        }
      } catch (error) {
        toast.error(error.message || 'Failed to fetch syllabus details');
        navigate('/admin/syllabus');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadSyllabusDetails();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await updateSyllabus(id, formData);
      toast.success('Syllabus updated successfully');
      navigate('/admin/syllabus');
    } catch (error) {
      toast.error(error.message || 'Failed to update syllabus');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Edit Syllabus</h1>
        <p className="text-gray-500 mt-1">Update course syllabus information</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject Name
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Computer Networks"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white"
            >
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              PDF Link (URL)
            </label>
            <input
              type="url"
              name="pdfUrl"
              value={formData.pdfUrl}
              onChange={handleChange}
              placeholder="e.g., https://example.com/syllabus.pdf"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2`}
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/syllabus')}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-lg border border-gray-300 transition-all font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSyllabus;
