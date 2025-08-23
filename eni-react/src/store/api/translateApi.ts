import type { SimpleYandexDefinition, YandexTranslation } from '@/types'

import { authApi } from './authApi'

export const translateApi = authApi.injectEndpoints({
	endpoints: (build) => ({
		getDifinition: build.query<SimpleYandexDefinition[], string>({
			query: (text) => ({
				url: 'definition',
				method: 'POST',
				body: { text },
				credentials: 'include'
			})
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
