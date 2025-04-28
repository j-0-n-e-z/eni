import axios from 'axios'

import { setupInterceptors } from './interceptors'

export const moviesApi = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Api-Key': import.meta.env.VITE_OPENSUBTITLES_API_KEY,
		'X-User-Agent': 'eni v0.0.1',
		'Content-Type': 'application/json'
	},
	params: {
		languages: 'en',
		order_by: 'download_count'
	}
})

export const tmdbApi = axios.create({
	baseURL: 'https://api.themoviedb.org/3/movie',
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`,
		accept: 'application/json'
	}
})

const apis = [moviesApi, tmdbApi]
apis.forEach(setupInterceptors)
