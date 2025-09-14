import { createApi } from '@reduxjs/toolkit/query/react'

import type { Word, WordSource } from '@/types'

import { baseQueryWithReauth } from './authApi'

export const wordApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		deleteWord: build.mutation<void, { userId: string; wordId: string }>({
			invalidatesTags: [{ id: 'LIST', type: 'Words' }],
			query: ({ userId, wordId }) => ({
				credentials: 'include',
				method: 'DELETE',
				url: `/user/${userId}/word/${encodeURIComponent(wordId)}`
			})
		}),
		getMoreWordSources: build.query<WordSource[], string>({
			query: (wordText) => ({
				credentials: 'include',
				url: `word/sources/${wordText}`
			})
		}),
		getWordsByUserId: build.query<Word[], string>({
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ id, type: 'Words' })),
							{ id: 'LIST', type: 'Words' }
						]
					: [{ id: 'LIST', type: 'Words' }],
			query: (userId) => ({
				url: `user/${userId}/words`
			})
		}),
		saveWord: build.mutation<void, { userId: string; word: Word }>({
			invalidatesTags: [{ id: 'LIST', type: 'Words' }],
			query: ({ userId, word }) => ({
				body: { word },
				credentials: 'include',
				method: 'POST',
				url: `user/${userId}/word`
			})
		})
	}),
	reducerPath: 'wordApi',
	tagTypes: ['Words']
})

export const {
	useSaveWordMutation,
	useGetWordsByUserIdQuery,
	useLazyGetWordsByUserIdQuery,
	useDeleteWordMutation,
	useLazyGetMoreWordSourcesQuery
} = wordApi
