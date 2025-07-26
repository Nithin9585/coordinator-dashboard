// clearFirebasePersistence.ts
export const clearFirebasePersistence = () => {
  try {
    // Clear common Firebase keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('firebase:')) {
        localStorage.removeItem(key);
      }
    });

    // Clear common Firebase keys from sessionStorage
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('firebase:')) {
        sessionStorage.removeItem(key);
      }
    });

    // Remove any session cookie (non-HTTP only)
    document.cookie = 'session=; Max-Age=0; path=/;';
  } catch (err) {
    console.error('Error clearing Firebase persistence:', err);
  }
};
