import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { createApi } from '@reduxjs/toolkit/query/react'

import type { LoginRequest, SignupRequest, User } from '@/types'

import { baseQuery } from './api'

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	if (
		result.error?.status === 401 &&
		(result.error?.data as any).message === 'Access token expired'
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
				credentials: 'include'
			}),
			providesTags: ['Me']
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
			})
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
