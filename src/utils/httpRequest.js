import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

request.interceptors.response.use((response) => {
    const { data } = response;
    return response.data;
});

export default request;
