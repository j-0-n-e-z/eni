import { createApi } from '@reduxjs/toolkit/query/react'

import type { LoginCredentials, SignupCredentials } from '@/schemas'
import type { User } from '@/types'

import { baseQueryWithReauth } from './baseQueries/baseQueryWithReauth'

const ME_TAG = 'Me'

export const authApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getMe: build.query<User, void>({
			providesTags: [ME_TAG],
			query: () => ({
				credentials: 'include',
				headers: {
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache'
				},
				url: 'user/me'
			})
		}),
		login: build.mutation<User, LoginCredentials>({
			invalidatesTags: [ME_TAG],
			query: (credentials) => ({
				body: credentials,
				credentials: 'include',
				method: 'POST',
				url: 'login'
			})
		}),
		logout: build.mutation<void, void>({
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					dispatch(authApi.util.resetApiState())
				} catch (error) {
					console.log(error)
				}
			},
			query: () => ({
				credentials: 'include',
				method: 'POST',
				url: 'logout'
			})
		}),
		signup: build.mutation<void, Omit<SignupCredentials, 'confirmPassword'>>({
			query: (credentials) => ({
				body: credentials,
				method: 'POST',
				url: 'signup'
			})
		})
	}),
	reducerPath: 'authApi',
	tagTypes: [ME_TAG]
})

export const {
	useGetMeQuery,
	useLoginMutation,
	useLogoutMutation,
	useSignupMutation
} = authApi
