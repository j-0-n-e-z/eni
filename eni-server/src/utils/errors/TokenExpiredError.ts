import { AuthenticationError } from './AuthenticationError'

export class TokenExpiredError extends AuthenticationError {
	constructor(statusCode = 401, message = 'Token expired') {
		super(statusCode, message)
	}
}
