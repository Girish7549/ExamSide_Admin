import axios from 'axios';
import { toast } from 'react-toastify';
// import { MainUrl } from '../BackendUrl/apiUrl';

// Replace with your actual API endpoint


// Login function
const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:9000/api/login', 
      { email, password },
      { withCredentials: true }
    );

    toast.success("Admin Login Successfully!");
    return response.data; // Return the response data (e.g., user info, token)

  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside the range of 2xx
      const errorMessage = error.response.data.message || "Login failed"; // Adjust based on your API response format
      
      // Check for specific error messages
      if (errorMessage.includes("password")) {
        toast.error("Incorrect password. Please try again.");
      } else if (errorMessage.includes("email")) {
        toast.error("Email not found. Please check your email address.");
      } else {
        toast.error(errorMessage);
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("No response from the server. Please try again later.");
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error("An error occurred. Please try again.");
    }

    console.error('Login failed:', error);
    throw error;
  }
};


// Signup function
const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data; // Return the response data (e.g., user info, token)
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

// Single export statement for both functions
export { login, signup };