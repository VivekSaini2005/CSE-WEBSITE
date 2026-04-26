import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEventById, updateEvent } from '../../../api/admin/eventsService';
import toast from 'react-hot-toast';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Workshop',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetchEventById(id);
        const event = res.data;
        if (event) {
          setForm({
            title: event.title || '',
            description: event.description || '',
            date: event.date ? event.date.substring(0, 10) : '',
            category: event.category || 'Workshop',
            image: event.image || ''
          });
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateEvent(id, form);
      toast.success('Event updated successfully!');
      navigate('/admin/events');
    } catch (err) {
      setError(err.message || 'Failed to update event');
      toast.error(err.message || 'Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-gray-500 animate-pulse font-medium">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/events')}
          className="text-gray-500 hover:text-primary flex items-center gap-2 mb-4 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Events
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Edit Event</h1>
        <p className="text-gray-500 mt-1">Update existing department event information</p>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Annual Tech Symposium 2026"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
              >
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Competition">Competition</option>
                <option value="Cultural">Cultural</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Guest Lecture">Guest Lecture</option>
              </select>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the event details, objectives, and eligibility..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              ></textarea>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/event-image.jpg"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {form.image && (
                <div className="mt-4 p-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
                   <img src={form.image} alt="Preview" className="h-20 w-32 object-cover rounded-lg shadow-sm" />
                   <div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Image Preview</p>
                     <p className="text-xs text-gray-500 truncate max-w-xs">{form.image}</p>
                   </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-yellow-500/20 transition-all disabled:opacity-70 disabled:shadow-none flex justify-center items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving Changes...
                </>
              ) : (
                 <>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293z" />
                     <path fillRule="evenodd" d="M5 18a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v11a2 2 0 01-2 2H5zM5 4a1 1 0 00-1 1v11a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5z" clipRule="evenodd" />
                   </svg>
                   Save Changes
                 </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/events')}
              className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
