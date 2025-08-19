import { ApiError } from './ApiError'
import { ErrorCodes } from './ErrorCodes'

export class TokenExpiredError extends ApiError {
	constructor(statusCode: number = 401, message: string = 'Token expired') {
		super(statusCode, message, ErrorCodes.TOKEN_EXPIRED)
	}
}
