import type { NextFunction, Request, Response } from 'express'

import { JwtService } from '@/services/jwt.service'
import { ACCESS_TOKEN, AuthenticationError, REFRESH_TOKEN } from '@/utils'

export class AuthMiddleware {
	private static instance: AuthMiddleware

	private constructor(
		private readonly jwtService: JwtService = new JwtService()
	) {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new AuthMiddleware()
		}

		return this.instance
	}

	protectByRefreshToken = (req: Request, res: Response, next: NextFunction) => {
		const refreshToken = req.cookies[REFRESH_TOKEN] as string | undefined

		if (!refreshToken) {
			throw new AuthenticationError(401, 'Not authorized')
		}

		const decoded = this.jwtService.verifyRefreshToken(refreshToken)
		req.user = decoded
		next()
	}

	protectByAccessToken = (req: Request, res: Response, next: NextFunction) => {
		const accessToken = req.cookies[ACCESS_TOKEN] as string | undefined

		if (!accessToken) {
			throw new AuthenticationError(401, 'Not authorized')
		}

		const decoded = this.jwtService.verifyAccessToken(accessToken)
		req.user = decoded
		next()
	}
}

const authMiddleware = AuthMiddleware.getInstance()

export { authMiddleware }
