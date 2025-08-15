import type { DictionaryResponse } from '@/types'

import { authApi } from './authApi'

export const dictionaryApi = authApi.injectEndpoints({
	endpoints: (build) => ({
		translate: build.query<DictionaryResponse, string>({
			query: (text) => ({
				url: 'translate',
				method: 'POST',
				body: { text },
				credentials: 'include'
			})
		})
	})
})

export const { useTranslateQuery, useLazyTranslateQuery } = dictionaryApi
