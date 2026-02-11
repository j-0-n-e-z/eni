import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'

import type { BackendError } from '@/frontend-types'

import { notifyOnError } from '@/utils'
import { baseQuery } from './baseQuery'

export const baseQueryWithErrorHandling: BaseQueryFn<
	string | FetchArgs,
	unknown,
	BackendError
> = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions)

	if (result.error) {
		const { error } = result

		if (error.status.toString() === 'FETCH_ERROR') {
			console.log(error)
			notifyOnError('Не удалось подключиться к серверу', 'failedToFetch')

			return {
				error: {
					data: {
						error: {
							code: 'FETCH_ERROR',
							message: 'Не удалось подключиться к серверу',
							statusCode: 400
						}
					},
					status: error.status
				} as BackendError
			}
		}

		if (error.data?.error) {
			const backendError: BackendError = {
				data: {
					error: error.data.error
				},
				status: error.status
			}

			return { error: backendError }
		}

		const backendError: BackendError = {
			data: error.data
				? {
						error: {
							code: 'UNKNOWN_ERROR',
							details: error.data,
							message:
								typeof error.data === 'string' ? error.data : 'Unknown error',
							statusCode: error.status
						}
					}
				: undefined,
			status: error.status
		}

		return { error: backendError }
	}

	return result
}
