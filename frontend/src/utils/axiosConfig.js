import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const auth = localStorage.getItem("user");
        if (auth) {
            const { token } = auth;
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors and token-related issues
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("user")
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
