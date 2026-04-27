/**
 * Formats an ISO date string to a human-readable format
 * e.g., "2026-04-15" -> "April 15, 2026"
 * @param {string|Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  const d = new Date(date);
  
  // Check if date is valid
  if (isNaN(d.getTime())) return 'Invalid Date';

  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return d.toLocaleDateString('en-GB', options);
};
