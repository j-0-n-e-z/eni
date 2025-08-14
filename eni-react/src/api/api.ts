import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import toast from 'react-hot-toast'

export const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_API_URL}/api`
})

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
			toast.error('Session expired, please log in again')
		}
	}

	return result
}

export const api = createApi({
	baseQuery,
	endpoints: () => ({}),
})
