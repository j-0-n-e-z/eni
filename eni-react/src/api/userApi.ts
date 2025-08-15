import type { User, Word } from '@/types'

import { authApi } from './authApi'

export const userApi = authApi.injectEndpoints({
	endpoints: (build) => ({
		getUserByUsername: build.query<User, string>({
			query: (username) => ({
				url: `users/${username}`
			})
		}),
		saveWord: build.mutation<
			void,
			{
				text: string
				userId: string
				fileId: number
				movieId: number
				page: number
				subtitleIndex: number
				subtitleTimecode: string
			}
		>({
			query: (data) => ({
				url: `users/word`,
				method: 'POST',
				body: data,
				credentials: 'include'
			}),
			invalidatesTags: [{ type: 'Words', id: 'LIST' }]
		}),
		getWordsByUserId: build.query<Word[], string>({
			query: (userId) => ({
				url: `users/${userId}/words`
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
	useLazyGetWordsByUserIdQuery
} = userApi
