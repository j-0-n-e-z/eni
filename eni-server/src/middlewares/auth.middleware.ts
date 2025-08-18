import type { NextFunction, Request, Response } from 'express'

import { TokenService } from '@/services/'
import {
	ACCESS_TOKEN,
	AuthenticationError,
	prisma,
	REFRESH_TOKEN
} from '@/utils'

export class AuthMiddleware {
	private static instance: AuthMiddleware

	private constructor(private readonly tokenService: TokenService) {}

	static getInstance(tokenService: TokenService) {
		if (!this.instance) {
			this.instance = new AuthMiddleware(tokenService)
		}

		return this.instance
	}

	protectByRefreshToken = (req: Request, res: Response, next: NextFunction) => {
		const refreshToken = req.cookies[REFRESH_TOKEN] as string | undefined

		if (!refreshToken) {
			throw new AuthenticationError(401, 'Not authorized')
		}

		const decoded = this.tokenService.verifyRefreshToken(refreshToken)
		req.user = decoded
		next()
	}

	protectByAccessToken = (req: Request, res: Response, next: NextFunction) => {
		const accessToken = req.cookies[ACCESS_TOKEN] as string | undefined

		if (!accessToken) {
			throw new AuthenticationError(401, 'Not authorized')
		}

		const decoded = this.tokenService.verifyAccessToken(accessToken)
		req.user = decoded
		next()
	}
}

const authMiddleware = AuthMiddleware.getInstance(new TokenService(prisma))

export { authMiddleware }
