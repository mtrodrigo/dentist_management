import axios from 'axios'

export default axios.create({
    baseURL: 'https://dentist-management-api.vercel.app'
})