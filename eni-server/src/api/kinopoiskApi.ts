import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const kinopoiskApiV2_1 = axios.create({
	baseURL: process.env.KINOPOISK_API_V2_1_URL,
	headers: {
		'X-API-KEY': process.env.KINOPOISK_API_KEY,
		Accept: 'application/json'
	}
})

export const kinopoiskApiV2_2 = axios.create({
	baseURL: process.env.KINOPOISK_API_V2_2_URL,
	headers: {
		'X-API-KEY': process.env.KINOPOISK_API_KEY,
		Accept: 'application/json'
	}
})
