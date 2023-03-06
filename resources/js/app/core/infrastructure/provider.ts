import axios, {AxiosInstance} from "axios";

const instanceBuilder: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    }
});

instanceBuilder.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        window.location.href = "/login"
    }
    throw error;
});


export const axiosInstance: AxiosInstance = instanceBuilder;
