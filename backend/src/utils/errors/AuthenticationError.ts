/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from './ApiError'
import { ErrorCodes } from './ErrorCodes'

export class AuthenticationError extends ApiError {
	constructor(
		statusCode: number = 401,
		message: string = 'Authentication failed',
		code: string = ErrorCodes.UNAUTHORIZED,
		details?: any
	) {
		super(statusCode, message, code, details)
	}
}
