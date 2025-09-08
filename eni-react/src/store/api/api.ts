/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface BackendError {
	data?: {
		error: {
			statusCode: number
			code: string
			message: string
			details?: any
		}
	}
	status: number
}

export const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_API_URL}/api`
}) as BaseQueryFn<string | FetchArgs, unknown, BackendError>

export const api = createApi({
	baseQuery: async (args, api, extraOptions) => {
		const result = await baseQuery(args, api, extraOptions)

		if (result.error) {
			const { error } = result

			if (error.data?.error) {
				const backendError: BackendError = {
					data: {
						error: {
							code: error.data.error.code,
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
	},
	endpoints: () => ({})
})
