import axios from 'axios'

const baseURL = import.meta.env.VITE_URL_API;

export default axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});