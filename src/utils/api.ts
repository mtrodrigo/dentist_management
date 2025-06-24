import axios from 'axios'

const baseURL = process.env.URL_API;

export default axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});