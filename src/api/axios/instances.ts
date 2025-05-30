import axios from 'axios'

import { setupInterceptors } from './interceptors'

export const api = axios.create({
	baseURL: 'http://localhost:3000'
})

setupInterceptors(api)
