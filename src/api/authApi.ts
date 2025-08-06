import { createApi } from '@reduxjs/toolkit/query/react'

import type { LoginRequest, SignupRequest, SuccessAuthResponse, User } from '@/types'

import { baseQueryWithReauth } from './api'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		signup: build.mutation<SuccessAuthResponse, SignupRequest>({
			query: (credentials) => ({
				url: 'signup',
				method: 'POST',
				body: credentials
			})
		}),
		login: build.mutation<SuccessAuthResponse, LoginRequest>({
			query: (credentials) => ({
				url: 'login',
				method: 'POST',
				body: credentials
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const {
						data: { accessToken }
					} = await queryFulfilled

					if (accessToken) {
						localStorage.setItem('accessToken', accessToken)
					}
				} catch (error) {
					console.log('Login failed:', error)
				}
			},
			// invalidatesTags: [{ type: 'User' }]
		}),
		logout: build.mutation<void, void>({
			query: () => ({
				url: 'logout',
				method: 'POST'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					dispatch(authApi.util.resetApiState())
					localStorage.removeItem('accessToken')
				} catch (error) {
					console.log('Logout failed:', error)
				}
			}
		}),
		refreshToken: build.mutation<{ accessToken: string }, void>({
			query: () => ({
				url: 'refresh',
				method: 'POST'
			})
		}),
		getMe: build.query<User, void>({
			query: () => 'users/me',
			providesTags: ['Me']
		})
	}),
	tagTypes: ['Me']
})

export const {
	useLoginMutation,
	useLogoutMutation,
	useRefreshTokenMutation,
	useGetMeQuery,
	useSignupMutation
} = authApi
