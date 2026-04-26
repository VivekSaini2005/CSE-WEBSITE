import { useState, useEffect } from 'react';
import api from '../api/api';

/**
 * Reusable hook for fetching data from an endpoint or using a service function.
 * 
 * @param {string|function} target - The API endpoint string or an async service function
 * @returns {object} - { data, loading, error, refetch }
 */
const useFetch = (target) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let result;
      if (typeof target === 'function') {
        result = await target();
      } else {
        const response = await api.get(target);
        result = response.data;
      }

      // Handle standard API response structure { success: true, data: [...], message: "..." }
      // If result has a data property (from our ApiResponse class), use it.
      setData(result?.data !== undefined ? result.data : result);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
