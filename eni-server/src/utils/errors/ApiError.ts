/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BackendError {
	statusCode: number
	message: string
	code: string
	details?: any
}

export class ApiError extends Error implements BackendError {
	constructor(
		public statusCode: number,
		public message: string,
		public code: string,
		public details?: any
	) {
		super(message)
		this.name = 'ApiError'
	}
}

