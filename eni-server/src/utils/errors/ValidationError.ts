import { ApiError } from './ApiError'
import { ErrorCodes } from './ErrorCodes'

export class ValidationError extends ApiError {
	constructor(
		statusCode: number,
		message: string,
		code: string = ErrorCodes.VALIDATION_ERROR,
		field?: string
	) {
		super(statusCode, message, code, { field })
	}
}
