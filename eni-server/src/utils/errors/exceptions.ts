export class ApiError extends Error {
	constructor(
		public readonly statusCode: number,
		public readonly message: string,
		public readonly field?: string,
	) {
		super(message)
	}
}

export class AuthenticationError extends ApiError {
	constructor(statusCode = 401, message = 'Authentication failed', field = '') {
		super(statusCode, message, field)
	}
}

export class TokenExpiredError extends AuthenticationError {
	constructor(statusCode = 401, message = 'Token expired') {
		super(statusCode, message)
	}
}
