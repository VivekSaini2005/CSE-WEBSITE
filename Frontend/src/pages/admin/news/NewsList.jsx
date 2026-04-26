import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchNews, deleteNews } from '../../../api/admin/newsService';
import { formatDate } from '../../../utils/formatDate';
import toast from 'react-hot-toast';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await fetchNews();
      const newsData = response.data || [];
      // Sort latest news first (descending by date)
      const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
      setNews(sortedNews);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) return;
    try {
      await deleteNews(id);
      toast.success('News deleted successfully');
      loadNews();
    } catch (error) {
      toast.error(error.message || 'Failed to delete news');
    }
  };

  const getShortDescription = (desc) => {
    if (!desc) return '';
    return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">News Management</h1>
          <p className="text-gray-500 mt-1">Manage latest news and updates</p>
        </div>
        <Link
          to="/admin/news/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          Add News
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-700">Title</th>
                  <th className="p-4 font-semibold text-gray-700">Date</th>
                  <th className="p-4 font-semibold text-gray-700">Description</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400">No news found.</td>
                  </tr>
                ) : (
                  news.map((item) => (
                    <tr key={item._id} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{item.title}</td>
                      <td className="p-4 text-gray-600 whitespace-nowrap">{formatDate(item.date)}</td>
                      <td className="p-4 text-gray-600 max-w-md">
                        <div className="truncate">{getShortDescription(item.description)}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 font-medium">
                          <button
                            onClick={() => navigate(`/admin/news/edit/${item._id}`)}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            Delete
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

export default NewsList;
