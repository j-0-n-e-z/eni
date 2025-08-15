import axios from "axios";

export const yandexDictionaryApi = axios.create({
	baseURL: process.env.YANDEX_DICTIONARY_API_URL,
})
