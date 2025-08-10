import { Prisma, PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { UserDto } from '../dtos/userDto'
import { JwtPayload } from '../types'
import {
	AuthenticationError,
	TokenExpiredError
} from '../utils/errors/exceptions'

export class TokenService {
	constructor(private readonly prisma: PrismaClient) {}

	generateAccessToken(user: UserDto) {
		return jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_ACCESS_SECRET as string,
			{ expiresIn: '15m' }
		)
	}

	generateRefreshToken(user: UserDto) {
		return jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_REFRESH_SECRET!,
			{
				expiresIn: '30d'
			}
		)
	}

	generateTokens(user: UserDto) {
		const accessToken = this.generateAccessToken(user)
		const refreshToken = this.generateRefreshToken(user)

		return { accessToken, refreshToken }
	}

	async invalidateRefreshToken(refreshToken: string) {
		const existingRefreshToken = await this.prisma.token.findFirst({
			where: { refreshToken }
		})

		if (!existingRefreshToken) {
			throw new AuthenticationError(401, 'Refresh token not found')
		}

		await this.prisma.token.update({
			data: {
				refreshToken: null
			},
			where: {
				userId: existingRefreshToken.userId
			}
		})
	}

	verifyAccessToken(accessToken: string) {
		try {
			const decoded = jwt.verify(
				accessToken,
				process.env.JWT_ACCESS_SECRET as string
			)
			return decoded as JwtPayload
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
			return decoded as JwtPayload
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				throw new TokenExpiredError(401, 'Refresh token expired')
			}
			throw new AuthenticationError(401, 'Invalid refresh token')
		}
	}

	async saveRefreshToken(
		userId: string,
		refreshToken: string,
		tx?: Prisma.TransactionClient
	) {
		const client = tx || this.prisma

		await client.token.upsert({
			where: { userId },
			update: { refreshToken },
			create: { userId, refreshToken }
		})
	}
}
