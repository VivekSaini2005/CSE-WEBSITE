/**
 * Resolves a file path to a full URL.
 * If the path is already an absolute URL, returns it as is.
 * If it's a relative path, prepends the backend base URL.
 * 
 * @param {string} path - The relative or absolute file path
 * @returns {string|null} - The full URL or null if path is empty
 */
export const getFileUrl = (path) => {
  if (!path) return null;
  
  // Return as is if it's already a full URL or a relative asset path that shouldn't be prepended
  if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }
  
  // Get base URL (stripping /api if present)
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace('/api', '');
  
  // Ensure consistent slash handling
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
};
