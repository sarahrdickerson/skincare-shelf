import axios from "axios";

// Axios interceptor instance
const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

// Request interceptor
AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            if (config.headers) config.headers["Authorization"] = `Bearer ${token}`;
            console.log("Access token found in local storage");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Response interceptor
AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default AxiosInstance;