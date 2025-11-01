import { createApi } from '@reduxjs/toolkit/query/react'

import type { Word, SavedWord, WordSource } from '@/types'

import { baseQueryWithReauth } from './baseQueries/baseQueryWithReauth'

const WORDS_TAG = 'WORDS' as const

export const wordApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		deleteWord: build.mutation<void, { userId: string; wordText: string }>({
			invalidatesTags: [{ id: 'LIST', type: WORDS_TAG }],
			query: ({ userId, wordText }) => ({
				body: { wordText },
				credentials: 'include',
				method: 'DELETE',
				url: `/user/${userId}/word`
			})
		}),
		deleteWordSource: build.mutation<
			void,
			{ userId: string; wordText: string; wordSource: WordSource }
		>({
			invalidatesTags: [{ id: 'LIST', type: WORDS_TAG }],
			query: ({ userId, wordText, wordSource }) => ({
				body: { wordSource, wordText },
				credentials: 'include',
				method: 'DELETE',
				url: `/user/${userId}/wordSource`
			})
		}),
		getMoreWordSources: build.query<WordSource[], string>({
			query: (wordText) => ({
				credentials: 'include',
				url: `word/sources/${wordText}`
			})
		}),
		getPopularWords: build.query<SavedWord[], void>({
			query: () => ({
				url: `word/popular`
			})
		}),
		getWordsByUserId: build.query<SavedWord[], string>({
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ id, type: WORDS_TAG })),
							{ id: 'LIST', type: WORDS_TAG }
						]
					: [{ id: 'LIST', type: WORDS_TAG }],
			query: (userId) => ({
				url: `user/${userId}/words`
			})
		}),
		saveWord: build.mutation<void, Word>({
			invalidatesTags: [{ id: 'LIST', type: WORDS_TAG }],
			query: (wordRequest) => ({
				body: { word: wordRequest },
				credentials: 'include',
				method: 'POST',
				url: `user/${wordRequest.userId}/word`
			})
		}),
		translateWord: build.mutation<SavedWord, { userId: string; wordText: string }>({
			query: ({ userId, wordText }) => ({
				body: { userId, wordText },
				credentials: 'include',
				method: 'POST',
				url: `/user/${userId}/word/translate`
			})
		})
	}),
	reducerPath: 'wordApi',
	tagTypes: [WORDS_TAG]
})

export const {
	useSaveWordMutation,
	useGetWordsByUserIdQuery,
	useLazyGetWordsByUserIdQuery,
	useDeleteWordMutation,
	useDeleteWordSourceMutation,
	useLazyGetMoreWordSourcesQuery,
	useTranslateWordMutation,
	useGetPopularWordsQuery
} = wordApi
