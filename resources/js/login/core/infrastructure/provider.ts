import axios, {AxiosInstance} from "axios";

export const axiosInstance : AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})