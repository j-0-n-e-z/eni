import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { AxiosError } from 'axios'
import axios from 'axios'
import type { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

import {
	ApiError,
	AuthenticationError,
	ErrorCodes,
	TokenExpiredError,
	ValidationError
} from '@/utils'

export class ErrorHandler {
	constructor(private readonly logger: (error: Error) => void) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handle = (error: Error, req: Request, res: Response, next: NextFunction) => {
		this.logger(error)

		const apiError = this.normalizeError(error)

		console.log(apiError)

		res.status(apiError.statusCode).json({
			success: false,
			error: {
				code: apiError.code,
				message: apiError.message,
				details: apiError.details
			}
		})
	}

	normalizeError = (error: unknown): ApiError => {
		if (error instanceof ApiError) return error

		if (error instanceof jwt.TokenExpiredError) return new TokenExpiredError()

		if (error instanceof JsonWebTokenError)
			return new AuthenticationError(401, error.message)

		if (error instanceof PrismaClientKnownRequestError)
			return this.handlePrismaError(error)

		if (axios.isAxiosError(error)) return this.handleAxiosError(error)

		if (error instanceof SyntaxError)
			return new ValidationError(
				400,
				'Invalid JSON',
				ErrorCodes.VALIDATION_ERROR
			)

		if (error instanceof Error)
			return new ApiError(500, error.message, ErrorCodes.INTERNAL_ERROR)

		return new ApiError(500, 'Internal server error', ErrorCodes.INTERNAL_ERROR)
	}

	private handlePrismaError(error: PrismaClientKnownRequestError): ApiError {
		switch (error.code) {
			case 'P2002':
				return new ApiError(
					409,
					'Record already exists',
					ErrorCodes.RECORD_ALREADY_EXISTS
				)

			case 'P2025':
				return new ApiError(404, 'Record not found', ErrorCodes.NOT_FOUND, {
					model: error.meta?.modelName,
					where: error.meta?.cause
				})

			case 'P2003':
				return new ApiError(
					400,
					'Foreign key constraint failed',
					ErrorCodes.DATABASE_ERROR,
					{
						constraint: error.meta?.field_name
					}
				)

			default:
				return new ApiError(500, 'Database error', ErrorCodes.DATABASE_ERROR, {
					code: error.code,
					meta: error.meta
				})
		}
	}

	private handleAxiosError(error: AxiosError): ApiError {
		const apiServiceName = this.getApiServiceName(error)

		if (apiServiceName.includes('opensubtitle')) {
			return new ApiError(
				503,
				'Failed to load subtitles from OpenSubtitles',
				ErrorCodes.SERVICE_UNAVAILABLE,
				{ service: 'OpenSubtitles' }
			)
		}

		return new ApiError(
			error.response?.status || 503,
			`${apiServiceName} service unavailable`,
			ErrorCodes.SERVICE_UNAVAILABLE,
			{
				service: apiServiceName,
				url: error.config?.url
			}
		)
	}

	private getApiServiceName(error: AxiosError) {
		const url = error.config?.baseURL || error.config?.url || ''

		if (url.includes('opensubtitle')) return 'OpenSubtitles'

		return 'External API'
	}
}
