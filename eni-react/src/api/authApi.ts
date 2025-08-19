import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react'
import { createApi } from '@reduxjs/toolkit/query/react'

import type { LoginCredentials } from '@/schemas/login.schemas'
import type { SignupCredentials } from '@/schemas/signup.schemas'
import type { User } from '@/types'

import type { BackendError } from './api'
import { baseQuery } from './api'

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	BackendError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	if (
		result.error &&
		result.error.status === 401 &&
		result.error.data?.error.message === 'Access token expired'
	) {
		const refreshResult = await baseQuery(
			{ url: 'refresh', method: 'POST', credentials: 'include' },
			api,
			extraOptions
		)

		if (refreshResult.data) {
			result = await baseQuery(args, api, extraOptions)
		} else {
			console.log('faild to make a request: ', args)
		}
	}

	return result
}

export const authApi = createApi({
	tagTypes: ['Me'],
	reducerPath: 'authApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getMe: build.query<User, null>({
			query: () => ({
				url: 'user/me',
				credentials: 'include',
				headers: {
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache'
				}
			}),
			providesTags: ['Me']
		}),
		signup: build.mutation<void, Omit<SignupCredentials, 'confirmPassword'>>({
			query: (credentials) => ({
				url: 'signup',
				method: 'POST',
				body: credentials
			})
		}),
		login: build.mutation<User, LoginCredentials>({
			query: (credentials) => ({
				url: 'login',
				method: 'POST',
				body: credentials,
				credentials: 'include'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					dispatch(authApi.endpoints.getMe.initiate(null))
				} catch (e) {
					console.log(e)
				}
			},
			invalidatesTags: ['Me']
		}),
		logout: build.mutation<null, null>({
			query: () => ({
				url: 'logout',
				method: 'POST',
				credentials: 'include'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					dispatch(authApi.util.resetApiState())
					dispatch(authApi.util.invalidateTags(['Me']))
				} catch (error) {
					console.log(error)
				}
			},
			invalidatesTags: ['Me']
		})
	})
})

export const {
	useGetMeQuery,
	useLoginMutation,
	useLogoutMutation,
	useSignupMutation
} = authApi
