import axios from 'axios'

export const openSubtitlesApi = axios.create({
	baseURL: process.env.OPENSUBTITLES_API_URL,
	headers: {
		'Api-Key': process.env.OPENSUBTITLES_API_KEY,
		'X-User-Agent': 'eni v0.0.1',
		'Content-Type': 'application/json'
	}
})

export const openSubtitlesApiAuthed = axios.create({
	baseURL: process.env.OPENSUBTITLES_API_URL,
	headers: {
		Accept: 'application/json',
		'Api-Key': process.env.OPENSUBTITLES_API_KEY,
		Authorization: `Bearer ${process.env.OPENSUBTITLES_AUTH_TOKEN}`,
		'X-User-Agent': 'eni v0.0.1',
		'Content-Type': 'application/json'
	}
})
