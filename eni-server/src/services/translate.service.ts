import { dictionaryApi } from '../api/dictionaryApi'
import type { DictionaryResponse } from '../types'

export class TranslateService {
	async translate(text: string) {
		const response = await dictionaryApi.get<DictionaryResponse>('/lookup', {
			params: {
				key: process.env.YANDEX_DICTIONARY_API_KEY,
				lang: 'en-ru',
				text
			}
		})

		return response.data
	}
}
