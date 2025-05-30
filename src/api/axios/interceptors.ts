/* eslint-disable no-console */
import type { AxiosError, AxiosInstance } from "axios"

export interface ApiError {
	message: string
	code?: string
	status?: number
	data?: unknown
}

export function setupInterceptors(instance: AxiosInstance) {
	instance.interceptors.request.use((config) => {
		console.log(`[API] Request: ${config.method?.toUpperCase()} ${config.url}`)
		return config
	})

	instance.interceptors.response.use(
		(response) => response,
		(error: AxiosError) => {
			const apiError: ApiError = {
				message: error.message,
				code: error.code,
				status: error.response?.status,
				data: error.response?.data
			}

			console.error('[API] Error:', apiError)
			return Promise.reject(apiError)
		}
	)
}
