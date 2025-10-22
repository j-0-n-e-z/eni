import { inject, injectable } from 'inversify'

import { TYPES } from '@/inversify/types'
import type { ITokenRepository } from '@/repositories/types'
import { AuthenticationError } from '@/utils'

import type { ITokenService } from './services-types'

@injectable()
export class TokenService implements ITokenService {
	constructor(
		@inject(TYPES.ITokenRepository)
		private readonly tokenRepository: ITokenRepository
	) {}

	async invalidateRefreshToken(refreshToken: string) {
		const existingRefreshToken =
			await this.tokenRepository.findToken(refreshToken)

		if (!existingRefreshToken) {
			throw new AuthenticationError(401, 'Refresh token not found')
		}

		await this.tokenRepository.invalidateToken(existingRefreshToken.userId)
	}

	async saveRefreshToken(userId: string, refreshToken: string) {
		await this.tokenRepository.updateToken(userId, refreshToken)
	}
}
