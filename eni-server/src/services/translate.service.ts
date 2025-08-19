import { yandexDictionaryApi, yandexTranslateApi } from '@/api'
import type { SimpleYandexDefinition } from '@/shared-types'

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
			.filter((def) => def.pos)
			.map(this.mapYandexDefinitionToSimpleYandexDefinition)
			.sort((a, b) => a.pos.localeCompare(b.pos))
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

	private mapYandexDefinitionToSimpleYandexDefinition(
		def: Definition
	): SimpleYandexDefinition {
		return {
			pos: def.pos,
			tr: def.tr
				.slice(0, 3)
				.map((tr) => tr.text)
				.join(', ')
		}
	}
}
