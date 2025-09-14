import { yandexDictionaryApi, yandexTranslateApi } from '@/api'

import type {
	Definition,
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

		return response.data.def
	}

	async translate(text: string) {
		const response = await yandexTranslateApi.post<YandexTranslateResponse>(
			'/translate',
			{
				texts: [text]
			}
		)

		return response.data.translations
	}

	isDefinitionsEmpty(defs: Definition[]) {
		return Boolean(defs.filter((def) => def.pos).length)
	}

	convertDefinitionsToString(defs: Definition[]) {
		return defs
			.map(
				(def) =>
					`${def.pos}: ${def.tr
						.slice(0, 3)
						.map((tr) => tr.text)
						.join(', ')}`
			)
			.join('\n')
	}
}
