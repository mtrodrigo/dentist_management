import axios from 'axios'

const baseURL = process.env.VITE_URL_API;

export default axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});