// using axios instead of classis fetch  because it gives u more control over request and response and more things out of the box and more convinient
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.mode === "development" ? "http://localhost:5000/api": "/api", // making it dynamic for both development and production
    withCredentials: true, // Include cookies in requests if needed--> with every single request a cookie will be sent
});

export default axiosInstance;