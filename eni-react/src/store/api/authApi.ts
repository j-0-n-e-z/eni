import { createApi } from '@reduxjs/toolkit/query/react'

import type { LoginCredentials } from '@/schemas/login.schemas'
import type { SignupCredentials } from '@/schemas/signup.schemas'
import type { User } from '@/types'

import { baseQueryWithReauth } from './baseQueries/baseQueryWithReauth'

export const authApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getMe: build.query<User, void>({
			providesTags: ['Me'],
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
			invalidatesTags: ['Me'],
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
	tagTypes: ['Me']
})

export const {
	useGetMeQuery,
	useLoginMutation,
	useLogoutMutation,
	useSignupMutation
} = authApi
