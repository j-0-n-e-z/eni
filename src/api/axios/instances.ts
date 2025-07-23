import axios from 'axios'

import { setupInterceptors } from './interceptors'

export const api = axios.create({
	baseURL: 'http://localhost:8080'
})

setupInterceptors(api)
