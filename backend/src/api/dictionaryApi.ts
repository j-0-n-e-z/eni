import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

export const yandexDictionaryApi = axios.create({
	baseURL: process.env.YANDEX_DICTIONARY_API_URL
})
