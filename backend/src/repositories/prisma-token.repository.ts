import { injectable } from 'inversify'

import { prisma } from '@/utils'

import type { ITokenRepository } from './types'

@injectable()
export class PrismaTokenRepository implements ITokenRepository {
	prisma = prisma

	async updateToken(userId: string, refreshToken: string): Promise<void> {
		await this.prisma.token.upsert({
			where: { userId },
			update: { refreshToken },
			create: { userId, refreshToken }
		})
	}

	async findToken(refreshToken: string) {
		return this.prisma.token.findFirst({
			where: { refreshToken },
			select: { userId: true }
		})
	}

	async invalidateToken(userId: string): Promise<void> {
		await this.prisma.token.update({
			where: { userId },
			data: { refreshToken: null }
		})
	}
}
