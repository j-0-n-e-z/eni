import type {
	YandexDefinition,
	YandexDictionaryResponse,
	YandexTranslation
} from '@/types'

import { authApi } from './authApi'

export const translateApi = authApi.injectEndpoints({
	endpoints: (build) => ({
		getDifinition: build.query<YandexDefinition[], string>({
			query: (text) => ({
				url: 'definition',
				method: 'POST',
				body: { text },
				credentials: 'include'
			}),
			transformResponse: (response: YandexDictionaryResponse) =>
				response.def
					.reduce((acc, def, i) => {
						if (!def.pos) return acc
						acc[i] = { pos: '', tr: '' }
						acc[i].pos = def.pos
						acc[i].tr = def.tr
							.slice(0, 3)
							.map((tr) => tr.text)
							.join(', ')
						return acc
					}, [] as YandexDefinition[])
					.sort((a, b) => a.pos.localeCompare(b.pos))
		}),
		translate: build.query<YandexTranslation[], string>({
			query: (text) => ({
				url: 'translate',
				method: 'POST',
				body: { text },
				credentials: 'include'
			})
		})
	})
})

export const { useLazyGetDifinitionQuery, useLazyTranslateQuery } = translateApi
