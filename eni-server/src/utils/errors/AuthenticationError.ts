import { ApiError } from "./ApiError";

export class AuthenticationError extends ApiError {
	constructor(statusCode = 401, message = 'Authentication failed', field = '') {
		super(statusCode, message, field)
	}
}
