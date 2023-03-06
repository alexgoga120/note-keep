import axios, {AxiosInstance} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    }
})
