import { yandexDictionaryApi } from '../api/dictionaryApi'
import { yandexTranslateApi } from '../api/translateApi'
import type {
	YandexDictionaryResponse,
	YandexTranslateResponse
} from '../types'

export class TranslateService {
	async findDefinition(text: string) {
		const response = await yandexDictionaryApi.get<YandexDictionaryResponse>(
			'/lookup',
			{
				params: {
					key: process.env.YANDEX_DICTIONARY_API_KEY,
					lang: 'en-ru',
					text
				}
			}
		)

		return response.data
	}

	async translate(text: string) {
		const response = await yandexTranslateApi.post<YandexTranslateResponse>(
			'/translate',
			{
				texts: [text]
			}
		)

		return response.data
	}
}
