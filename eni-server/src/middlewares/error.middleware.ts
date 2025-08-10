import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import axios, { AxiosError } from 'axios'
import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import {
	ApiError,
	AuthenticationError,
	TokenExpiredError
} from '../utils/errors/exceptions'

export class ErrorHandler {
	constructor(private readonly logger: (error: Error) => void) {}

	handle = (error: Error, req: Request, res: Response, next: NextFunction) => {
		this.logger(error)

		const apiError = this.normalizeError(error)

		res.status(apiError.statusCode).json({
			name: apiError.name,
			message: apiError.message,
			field: apiError.field
		})
	}

	normalizeError = (error: unknown) => {
		if (error instanceof ApiError) return error
		if (error instanceof jwt.TokenExpiredError) return new TokenExpiredError()

		if (error instanceof JsonWebTokenError)
			return new AuthenticationError(401, error.message)

		if (error instanceof PrismaClientKnownRequestError)
			return new ApiError(400, this.getPrismaErrorMessage(error))

		if (axios.isAxiosError(error)) {
			const apiServiceName = this.getApiServiceName(error)

			if (apiServiceName.includes('TMDB'))
				return new ApiError(
					503,
					'Failed to load additional movie data from TMDB'
				)

			if (apiServiceName.includes('opensubtitle'))
				return new ApiError(503, 'Failed to load subtitles from OpenSubtitles')

			return new ApiError(
				error.response?.status || 503,
				apiServiceName + ' ' + (error.response?.data?.message || error.message)
			)
		}

		return new ApiError(500, 'Internal server error')
	}

	private getPrismaErrorMessage(error: PrismaClientKnownRequestError) {
		switch (error.code) {
			case 'P2002':
				return 'Record already exists'
			case 'P2025':
				return 'Record not found'
			default:
				return 'Database error'
		}
	}

	private getApiServiceName(error: AxiosError) {
		const url = error.config?.baseURL || ''
		console.log('ERROR', error)

		if (url.includes('opensubtitle')) return 'OpenSubtitles'
		if (url.includes('themoviedb')) return 'TMDB'

		return 'External API'
	}
}
