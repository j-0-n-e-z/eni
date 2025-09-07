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
			{ credentials: 'include', method: 'POST', url: 'refresh' },
			api,
			extraOptions
		)

		if (refreshResult.data) {
			result = await baseQuery(args, api, extraOptions)
		} else {
			console.log('Faild to make a request: ', args)
		}
	}

	return result
}

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
