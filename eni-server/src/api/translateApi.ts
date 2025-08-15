/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios'

export const yandexTranslateApi = axios.create({
	baseURL: process.env.YANDEX_TRANSLATE_API_URL,
	headers: {
		Authorization: `Api-Key ${process.env.YANDEX_TRANSLATE_API_KEY}`,
		'Content-Type': 'application/json'
	}
})

yandexTranslateApi.interceptors.request.use((config) => {
	const body =
		typeof config.data === 'string'
			? JSON.parse(config.data)
			: (config.data ?? {})

  body.folderId = process.env.YANDEX_TRANSLATE_FOLDER_ID
  body.targetLanguageCode = 'ru'

	return { ...config, data: JSON.stringify(body) }
})
