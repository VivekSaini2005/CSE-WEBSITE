import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, deleteEvent } from '../../../api/admin/eventsService';
import toast from 'react-hot-toast';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchEvents();
      // res is the ApiResponse object, the actual array is in res.data
      setEvents(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
    
    try {
      await deleteEvent(id);
      // Refresh list after deletion
      setEvents(events.filter(e => e._id !== id));
      toast.success('Event deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>
          <p className="text-gray-500 mt-1">Manage and organize department events</p>
        </div>
        <button
          onClick={() => navigate('add')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Event
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-100 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
          <button onClick={loadEvents} className="ml-auto underline font-medium">Retry</button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-700">Title</th>
                  <th className="p-4 font-semibold text-gray-700">Date</th>
                  <th className="p-4 font-semibold text-gray-700">Category</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400">
                      No events found. Click "Add Event" to create one.
                    </td>
                  </tr>
                ) : (
                  events.map(event => (
                    <tr key={event._id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{event.title}</td>
                      <td className="p-4 text-gray-600">
                        {event.date ? new Date(event.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'N/A'}
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                          {event.category || 'General'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => navigate(`edit/${event._id}`)}
                            className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                            title="Edit Event"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Event"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsList;
