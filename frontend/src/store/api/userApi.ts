import { createApi } from '@reduxjs/toolkit/query/react'

import type { UserDto } from '@/types'

import { baseQueryWithReauth } from './baseQueries/baseQueryWithReauth'

export const userApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getUserByUsername: build.query<UserDto, string>({
			query: (username) => ({
				url: `user/${username}`
			})
		})
	}),
	reducerPath: 'userApi',
	tagTypes: ['Users']
})

export const { useLazyGetUserByUsernameQuery, useGetUserByUsernameQuery } =
	userApi
