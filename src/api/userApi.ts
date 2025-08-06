import type { User } from '@/types'

import { api } from './api'

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserByUsername: build.query<User, string>({
			query: (username) => ({
				url: `users/${username}`
			}),
			providesTags: ['User']
		})
  })
})

export const { useGetUserByUsernameQuery, useLazyGetUserByUsernameQuery } = userApi
