import axios from 'axios'

import { setupInterceptors } from './interceptors'

export const api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_API_URL
})

setupInterceptors(api)
