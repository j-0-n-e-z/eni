import type { YandexDictionaryResponse, YandexTranslateResponse } from '@/types'

import { authApi } from './authApi'

export const translateApi = authApi.injectEndpoints({
	endpoints: (build) => ({
		getDifinition: build.query<YandexDictionaryResponse, string>({
			query: (text) => ({
				url: 'definition',
				method: 'POST',
				body: { text },
				credentials: 'include'
			})
		}),
		translate: build.query<YandexTranslateResponse, string>({
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
