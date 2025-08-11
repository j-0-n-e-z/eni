import { createApi } from '@reduxjs/toolkit/query/react'

import type { LoginRequest, SignupRequest, User } from '@/types'

import { baseQueryWithReauth } from './api'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getMe: build.query<User, null>({
			query: () => ({
				url: 'users/me',
				credentials: 'include'
			})
		}),
		signup: build.mutation<void, SignupRequest>({
			query: (credentials) => ({
				url: 'signup',
				method: 'POST',
				body: credentials
			})
		}),
		login: build.mutation<User, LoginRequest>({
			query: (credentials) => ({
				url: 'login',
				method: 'POST',
				body: credentials,
				credentials: 'include'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					await dispatch(authApi.endpoints.getMe.initiate(null))
				} catch (error) {
					console.log(error)
				}
			}
		}),
		logout: build.mutation<void, void>({
			query: () => ({
				url: 'logout',
				method: 'POST',
				credentials: 'include'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					dispatch(authApi.util.resetApiState())
				} catch (error) {
					console.log(error)
				}
			}
		})
	})
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation, useSignupMutation } =
	authApi
