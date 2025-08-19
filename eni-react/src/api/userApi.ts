import { createApi } from '@reduxjs/toolkit/query/react'

import type { User, Word, WordResponse } from '@/types'

import { baseQueryWithReauth } from './authApi'

export const userApi = createApi({
	tagTypes: ['Words'],
	reducerPath: 'userApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getUserByUsername: build.query<User, string>({
			query: (username) => ({
				url: `user/${username}`
			})
		}),
		saveWord: build.mutation<void, { userId: string; word: Word }>({
			query: ({ userId, word }) => ({
				url: `user/${userId}/word`,
				method: 'POST',
				body: { word },
				credentials: 'include'
			}),
			invalidatesTags: [{ type: 'Words', id: 'LIST' }]
		}),
		deleteWord: build.mutation<void, { userId: string; wordId: string }>({
			query: ({ userId, wordId }) => ({
				url: `/user/${userId}/word/${encodeURIComponent(wordId)}`,
				method: 'DELETE',
				credentials: 'include'
			}),
			invalidatesTags: [{ type: 'Words', id: 'LIST' }]
		}),
		getWordsByUserId: build.query<Word[], string>({
			query: (userId) => ({
				url: `user/${userId}/words`
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Words', id })),
							{ type: 'Words', id: 'LIST' }
						]
					: [{ type: 'Words', id: 'LIST' }]
		})
	})
})

export const {
	useGetUserByUsernameQuery,
	useLazyGetUserByUsernameQuery,
	useSaveWordMutation,
	useGetWordsByUserIdQuery,
	useLazyGetWordsByUserIdQuery,
	useDeleteWordMutation
} = userApi
