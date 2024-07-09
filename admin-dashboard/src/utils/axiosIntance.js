import axios from 'axios';


// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL, // Set your API base URL
    withCredentials: true, // Allow sending cookies with requests
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Redirect to login page
            window.location.href = '/auth'; // Adjust the path to your login route
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
