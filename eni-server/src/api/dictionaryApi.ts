import axios from "axios";

export const dictionaryApi = axios.create({
	baseURL: process.env.YANDEX_DICTIONARY_API_URL,
})
