import type { SimpleYandexDefinition, YandexTranslation } from '@/types'

import { authApi } from './authApi'

export const translateApi = authApi.injectEndpoints({
	endpoints: (build) => ({
		getDifinition: build.query<SimpleYandexDefinition[], string>({
			query: (text) => ({
				body: { text },
				credentials: 'include',
				method: 'POST',
				url: 'definition'
			})
		}),
		translate: build.query<YandexTranslation[], string>({
			query: (text) => ({
				body: { text },
				credentials: 'include',
				method: 'POST',
				url: 'translate'
			})
		})
	})
})

export const { useLazyGetDifinitionQuery, useLazyTranslateQuery } = translateApi
