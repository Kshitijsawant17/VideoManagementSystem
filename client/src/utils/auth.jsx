// Check if token exists in localStorage
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  };
  
  // Get the token from localStorage
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  export const getRole = () => {
    return localStorage.getItem('role');
  };
  export const getId = () => {
    return localStorage.getItem('id');
  };
  
  // Set the token in localStorage
  export const setUserData = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('id', data.id);
  };
  
  // Remove the token from localStorage
  export const removeUserData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  };

  