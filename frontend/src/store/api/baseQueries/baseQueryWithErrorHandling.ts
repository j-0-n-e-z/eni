import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'
import toast from 'react-hot-toast'

import type { BackendError } from '../../../frontend-types'

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
			console.log(error);
			toast.error('Не удалось подключиться к серверу', { id: 'failedToFetch' })
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
					error: {
						code: error.data.error.code,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						details: error.data.error.details,
						message: error.data.error.message,
						statusCode: error.status
					}
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
