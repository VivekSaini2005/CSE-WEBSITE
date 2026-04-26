import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchTestimonials, deleteTestimonial } from '../../../api/admin/testimonialService';
import toast from 'react-hot-toast';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const response = await fetchTestimonials();
      // Handle the standard API response structure { data: [...] }
      const data = response.data || [];
      setTestimonials(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      toast.success('Testimonial deleted successfully');
      loadTestimonials();
    } catch (error) {
      toast.error(error.message || 'Failed to delete testimonial');
    }
  };

  const truncateQuote = (text) => {
    if (!text) return '';
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Testimonial Management</h1>
          <p className="text-gray-500 mt-1">Manage student and alumni testimonials</p>
        </div>
        <Link
          to="/admin/testimonials/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          Add Testimonial
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
              No testimonials found.
            </div>
          ) : (
            testimonials.map((item) => (
              <div 
                key={item._id} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-indigo-100 flex items-center justify-center rounded-full text-indigo-600 font-bold uppercase">
                      {item.name ? item.name.charAt(0) : '?'}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 leading-tight">{item.name}</h3>
                      <p className="text-xs text-gray-500 italic mt-0.5">{item.role || 'Contributor'}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 text-sm font-medium italic mb-6 leading-relaxed">
                    "{truncateQuote(item.quote)}"
                  </blockquote>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-50 items-center">
                  <button
                    onClick={() => navigate(`/admin/testimonials/edit/${item._id}`)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-bold transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-bold transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TestimonialList;
