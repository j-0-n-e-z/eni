import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const tmdbApi = axios.create({
	baseURL: 'https://api.themoviedb.org/3/movie',
	headers: {
		Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
		Accept: 'application/json'
	}
})

tmdbApi.interceptors.request.use((config) => {
	console.log('Final request URL:', `${config.baseURL}${config.url}`)
	return config
})