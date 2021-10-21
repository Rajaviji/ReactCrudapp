import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})

API.interceptors.request.use(req => {
    req.headers.Authorization =  localStorage.getItem('token');
    return req;
});

export default API