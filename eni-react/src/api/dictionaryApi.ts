import type { DictionaryResponse } from '@/types'

import { api } from './api'

export const dictionaryApi = api.injectEndpoints({
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
