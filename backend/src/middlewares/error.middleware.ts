/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { AxiosError } from 'axios'
import axios from 'axios'
import type { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

import type { ApiServiceName } from '@/types'
import {
	ApiError,
	AuthenticationError,
	ErrorCodes,
	TokenExpiredError,
	ValidationError
} from '@/utils'
import { getErrorCodeByStatusCode } from '@/utils/errors/ErrorCodes'

export class ErrorHandler {
	constructor(private readonly logger: (error: Error) => void) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handle = (error: Error, req: Request, res: Response, next: NextFunction) => {
		this.logger(error)

		const apiError = this.normalizeError(error)

		// console.log(apiError)

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

		if (error.response?.status && apiServiceName) {
			const statusCode = error.response.status

			const apiServiceErrorMessages: Record<
				ApiServiceName,
				Record<number, string>
			> = {
				Kinopoisk: {
					400: 'Bad request to Kinopoisk',
					401: 'Kinopoisk authentication failed',
					402:
						(error.response?.data as Error).message ??
						'You have reached kinopoisk quota',
					404: 'Movie not found',
					429: 'Kinopoisk rate limit exceeded'
				},
				OpenSubtitles: {
					400: 'Bad request to OpenSubtitles',
					401: 'OpenSubtitles authentication failed',
					402: 'You have reached OpenSubtitles quota',
					404: 'Subtitles not found',
					429: 'OpenSubtitles rate limit exceeded',
					503: 'OpenSubtitles are unavailable right now'
				},
				'Yandex.Translate': {
					400: 'Bad request to Yandex.Translate',
					401: 'Yandex.Translate authentication failed',
					402: 'You have reached Yandex.Translate quota',
					404: 'Failed to get Yandex.Translate translation',
					429: 'Too many request to Yandex.Translate',
					503: 'Yandex.Translate is unavailable right now'
				},
				'Yandex.Dictionary': {
					400: 'Bad request to Yandex Dictionary',
					401: 'Yandex Dictionary authentication failed',
					402: 'You have reached Yandex Dictionary quota',
					404: 'Failed to get Yandex Dictionary definition ',
					429: 'Too many request to Yandex Dictionary',
					503: 'Yandex.Dictionary is unavailable right now'
				}
			}

			return new ApiError(
				statusCode,
				apiServiceErrorMessages[apiServiceName][statusCode],
				getErrorCodeByStatusCode(statusCode),
				{ error }
			)
		}

		return new ApiError(503, 'Unknown error', ErrorCodes.INTERNAL_ERROR, {
			error
		})
	}

	private getApiServiceName(error: AxiosError): ApiServiceName | null {
		const url = error.config?.baseURL || error.config?.url || ''

		if (url.includes('opensubtitle')) return 'OpenSubtitles'
		if (url.includes('kinopoisk')) return 'Kinopoisk'
		if (url.includes('translate.api')) return 'Yandex.Translate'
		if (url.includes('dictionary.yandex')) return 'Yandex.Dictionary'

		return null
	}
}
