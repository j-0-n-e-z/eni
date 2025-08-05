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
	let result = await baseQuery(args, api, extraOptions)

	const isAuthEndpoint =
		typeof args === 'object' &&
		['login', 'logout', 'signup', 'refresh', 'users/me'].some((path) =>
			args.url?.includes(path)
		)

	if (result.error?.status === 401 && !isAuthEndpoint) {
		const refreshResult = await baseQuery(
			{ url: '/refresh', method: 'POST' },
			api,
			extraOptions
		)

		if (refreshResult.data) {
			const { accessToken } = refreshResult.data as { accessToken: string }
			localStorage.setItem('accessToken', accessToken)

			result = await baseQuery(args, api, extraOptions)
		} else {
			localStorage.removeItem('accessToken')
			console.log('remove access token')
			// window.location.href = '/login'
		}
	}

	return result
}

export const api = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	tagTypes: ['User', 'Movie', 'Subtitle', 'TMDBMovie']
})
