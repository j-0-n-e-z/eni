import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react'

import type { BackendError } from '@/frontend-types'
import { notifyOnError } from '@/utils'

import { baseQueryWithErrorHandling } from './baseQueryWithErrorHandling'

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	BackendError
> = async (args, api, extraOptions) => {
	let result = await baseQueryWithErrorHandling(args, api, extraOptions)

	if (
		result.error &&
		result.error.status === 401 &&
		result.error.data?.error.message === 'Access token expired'
	) {
		const refreshResult = await baseQueryWithErrorHandling(
			{ credentials: 'include', method: 'POST', url: 'refresh' },
			api,
			extraOptions
		)

		if (refreshResult.error) {
			notifyOnError(
				refreshResult.error.data?.error.message || 'Something went wrong',
				'refresh'
			)

			return refreshResult
		}

		if (refreshResult.data) {
			result = await baseQueryWithErrorHandling(args, api, extraOptions)
		} else {
			console.error('Faild to make a request: ', args)
		}
	}

	return result
}
