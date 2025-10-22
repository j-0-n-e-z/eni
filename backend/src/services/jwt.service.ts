import type { UserJwtPayload } from 'global'
import jwt from 'jsonwebtoken'

import type { UserDto } from '@/shared-types'
import { AuthenticationError, TokenExpiredError } from '@/utils'

export class JwtService {
	constructor(
		private readonly accessTokenExpiresIn: string = '15m',
		private readonly refreshTokenExpiresIn: string = '30d'
	) {}

	generateAccessToken(user: UserDto) {
		return jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_ACCESS_SECRET!,
			{ expiresIn: this.accessTokenExpiresIn } as jwt.SignOptions
		)
	}

	generateRefreshToken(user: UserDto) {
		return jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_REFRESH_SECRET!,
			{ expiresIn: this.refreshTokenExpiresIn } as jwt.SignOptions
		)
	}

	generateTokens(user: UserDto) {
		const accessToken = this.generateAccessToken(user)
		const refreshToken = this.generateRefreshToken(user)

		return { accessToken, refreshToken }
	}

	verifyAccessToken(accessToken: string) {
		try {
			const decoded = jwt.verify(
				accessToken,
				process.env.JWT_ACCESS_SECRET as string
			)
			return decoded as UserJwtPayload
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				throw new TokenExpiredError(401, 'Access token expired')
			}
			throw new AuthenticationError(401, 'Invalid access token')
		}
	}

	verifyRefreshToken(refreshToken: string) {
		try {
			const decoded = jwt.verify(
				refreshToken,
				process.env.JWT_REFRESH_SECRET as string
			)
			return decoded as UserJwtPayload
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				throw new TokenExpiredError(401, 'Refresh token expired')
			}
			throw new AuthenticationError(401, 'Invalid refresh token')
		}
	}
}
