import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export const openSubtitlesApi = axios.create({
	baseURL: process.env.OPENSUBTITLES_BASEURL,
	headers: {
		'Api-Key': process.env.OPENSUBTITLES_API_KEY,
		'X-User-Agent': 'eni v0.0.1',
		'Content-Type': 'application/json'
	}
})

export const openSubtitlesApiAuthed = axios.create({
	baseURL: process.env.OPENSUBTITLES_BASEURL,
	headers: {
		Accept: 'application/json',
		'Api-Key': process.env.OPENSUBTITLES_API_KEY,
		Authorization: `Bearer ${process.env.OPENSUBTITLES_AUTH_TOKEN}`,
		'X-User-Agent': 'eni v0.0.1',
		'Content-Type': 'application/json'
	}
})

openSubtitlesApiAuthed.interceptors.request.use((config) => {
	console.log('Final request URL:', `${config.baseURL}${config.url}`)
	return config
})
