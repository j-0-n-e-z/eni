import { createApi } from '@reduxjs/toolkit/query/react'

import type { User } from '@/types'

import { baseQueryWithReauth } from './api'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User'],
	endpoints: (build) => ({
		getUserByUsername: build.query<User, string>({
			query: (username) => ({
				url: `users/${username}`
			})
		})
	})
})

export const {
	useGetUserByUsernameQuery,
	useLazyGetUserByUsernameQuery
} = userApi
