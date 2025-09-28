import { createApi } from '@reduxjs/toolkit/query/react'

import { type YandexTranslation } from '@/types'

import { baseQueryWithReauth } from './baseQueries/baseQueryWithReauth'

export const translateApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getDifinition: build.query<string, string>({
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
	}),
	reducerPath: 'translateApi'
})

export const { useLazyGetDifinitionQuery, useLazyTranslateQuery } = translateApi
