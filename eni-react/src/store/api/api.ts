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
				return {
					data: {
						error: {
							code: error.data.error.code,
							details: error.data.error.details,
							message: error.data.error.message
						}
					},
					status: error.status
				} as BackendError
			}
		}

		return result
	},
	endpoints: () => ({})
})
