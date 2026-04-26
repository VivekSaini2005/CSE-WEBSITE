import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../../api/admin/eventsService';
import toast from 'react-hot-toast';

const AddEvent = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Workshop',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createEvent(form);
      toast.success('Event created successfully!');
      setForm({ title: '', description: '', date: '', category: 'Workshop', image: '' });
      navigate('/admin/events');
    } catch (err) {
      setError(err.message || 'Failed to add event');
      toast.error(err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-800">Add New Event</h1>
        <p className="text-gray-500 mt-1">Create a new event for the department</p>
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
              <p className="mt-2 text-xs text-gray-400">Provide a link to the event banner or poster image.</p>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-70 disabled:shadow-none flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving Event...
                </>
              ) : (
                'Create Event'
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

export default AddEvent;
