import { createApi } from '@reduxjs/toolkit/query/react'

import type { LoginRequest, LoginResponse, User } from '@/types'

import { baseQueryWithReauth } from './api'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: 'login',
				method: 'POST',
				body: credentials
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const {
						data: { user, accessToken }
					} = await queryFulfilled

					if (user) {
						dispatch(authApi.util.upsertQueryData('getMe', undefined, user))
						localStorage.setItem('accessToken', accessToken)
					}
				} catch (error) {
					console.log('Login failed:', error)
				}
			}
		}),
		logout: build.mutation<void, void>({
			query: () => ({
				url: 'logout',
				method: 'POST'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					localStorage.removeItem('accessToken')
					dispatch(authApi.util.resetApiState())
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
			providesTags: ['User']
		})
	}),
	tagTypes: ['User']
})

export const {
	useLoginMutation,
	useLogoutMutation,
	useRefreshTokenMutation,
	useGetMeQuery
} = authApi
