import { NextFunction, Request, Response } from 'express'
import { TokenService } from '../services/token.service'
import { REFRESH_TOKEN } from '../utils/constants'
import { AuthenticationError } from '../utils/errors/exceptions'
import { prisma } from '../utils/prismaClient'

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
		const refreshToken = req.cookies[REFRESH_TOKEN]

		if (!refreshToken) {
			throw new AuthenticationError(401, 'Not authorized')
		}

		const decoded = this.tokenService.verifyRefreshToken(refreshToken)
		req.user = decoded
		next()
	}

	protectByAccessToken = (req: Request, res: Response, next: NextFunction) => {
		const accessToken = req.headers.authorization?.split(' ')[1]

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
