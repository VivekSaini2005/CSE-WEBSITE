import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTestimonial } from '../../../api/admin/testimonialService';
import toast from 'react-hot-toast';

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTestimonial(formData);
      toast.success('Testimonial added successfully');
      
      // Reset form
      setFormData({ name: '', role: '', quote: '' });
      
      navigate('/admin/testimonials');
    } catch (error) {
      toast.error(error.message || 'Failed to add testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add Testimonial</h1>
        <p className="text-gray-500 mt-1">Add a new student or alumni testimonial</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Role / Designation
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Alumni, Class of 2022"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Testimonial Quote
            </label>
            <textarea
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              rows="6"
              placeholder="Share the experience here..."
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white resize-y"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding Testimonial...
                </>
              ) : (
                'Add Testimonial'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/testimonials')}
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

export default AddTestimonial;
