import type { User, Word, WordResponse } from '@/types'

import { authApi } from './authApi'

export const userApi = authApi.injectEndpoints({
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
				url: `/user/${userId}/word/:${wordId}`,
				method: 'DELETE',
				credentials: 'include'
			})
		}),
		getWordsByUserId: build.query<Word[], string>({
			query: (userId) => ({
				url: `user/${userId}/words`
			}),
			transformResponse: (response: WordResponse[]) =>
				response.map((w) => ({
					id: `${w.subtitleIndex}#${w.subtitleTimecode}#${w.fileId}`,
					text: w.word.text,
					from: {
						subtitleIndex: w.subtitleIndex,
						subtitleTimecode: w.subtitleTimecode,
						page: w.page,
						fileId: w.fileId,
						movieId: w.movieId
					},
					isLearned: w.isLearned,
					isFavorite: w.isFavorite
				})),
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
	useLazyGetWordsByUserIdQuery
} = userApi
