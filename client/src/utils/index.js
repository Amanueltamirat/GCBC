/**
 * Extract a human-readable error message from any error object.
 * Works with Axios errors, standard Error objects, and plain strings.
 */
export function getError(error) {
  if (!error) return 'An unknown error occurred.';

  // If it's already a string, return it
  if (typeof error === 'string') return error;

  // Axios error with response data
  if (error.response) {
    // Some APIs return a message field, others might have error.message
    const data = error.response.data;
    if (data && typeof data === 'object') {
      if (data.message) return data.message;
      if (data.error) return typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
      // Fallback: stringify the whole data object
      try {
        return JSON.stringify(data);
      } catch {
        // ignore
      }
    }
    // If status code is present, include it
    if (error.response.status) {
      return `Request failed with status ${error.response.status}`;
    }
  }

  // Standard Error object
  if (error.message) return error.message;

  // Fallback
  return 'Something went wrong. Please try again.';
}