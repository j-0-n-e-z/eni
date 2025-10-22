import { yandexDictionaryApi, yandexTranslateApi } from '@/api'
import type {
	Definition,
	YandexDictionaryResponse,
	YandexTranslateResponse
} from '@/types'
import { ApiError, ErrorCodes } from '@/utils'

import type { ITranslateService } from './services-types'

export class TranslateService implements ITranslateService {
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

		const definitions = response.data.def

		if (this.isDefinitionsEmpty(definitions))
			throw new ApiError(404, 'Definition was not found', ErrorCodes.NOT_FOUND)

		return this.convertDefinitionsToString(definitions)
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

	private isDefinitionsEmpty(defs: Definition[]) {
		return !defs.filter((def) => def.pos).length
	}

	private convertDefinitionsToString(defs: Definition[]) {
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
