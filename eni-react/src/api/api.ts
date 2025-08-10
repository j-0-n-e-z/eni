import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_API_URL}/api`,
	credentials: 'include',
	prepareHeaders: (headers) => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			headers.set('Authorization', `Bearer ${accessToken}`)
		}
		return headers
	}
})

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const url = typeof args === 'string' ? args : args.url

	if (url === 'users/me' && !localStorage.getItem('accessToken')) {
		return {
			error: {
				status: 401,
				statusText: 'Unauthorized',
				data: 'Authentication required'
			}
		}
	}

	let result = await baseQuery(args, api, extraOptions)

	const authEndpoints = ['login', 'logout', 'signup', 'refresh']

	const isAuthEndpoint =
		authEndpoints.includes(url) ||
		(url && authEndpoints.some((path) => url.includes(path)))

	if (result.error?.status === 401 && !isAuthEndpoint) {
		const refreshResult = await baseQuery(
			{ url: 'refresh', method: 'POST' },
			api,
			extraOptions
		)

		if (refreshResult.data) {
			const { accessToken } = refreshResult.data as { accessToken: string }
			localStorage.setItem('accessToken', accessToken)

			result = await baseQuery(args, api, extraOptions)
		} else {
			localStorage.removeItem('accessToken')
			// window.location.href = '/login'
		}
	}

	return result
}

export const api = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	tagTypes: ['User', 'Me', 'Movie', 'Subtitle', 'TMDBMovie']
})
