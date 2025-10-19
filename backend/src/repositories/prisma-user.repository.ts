import type { User } from '@prisma/client'

import { prisma } from '@/utils'

import type { CreateUserData, IUserRepository, UpdateUserData } from './types'

export class PrismaUserRepository implements IUserRepository<User> {
	prisma = prisma

	async findByUsername(username: string) {
		return this.prisma.user.findFirst({
			where: { username }
		})
	}

	async findByEmail(email: string) {
		return this.prisma.user.findFirst({
			where: {
				email: {
					equals: email,
					mode: 'insensitive'
				}
			}
		})
	}

	async findById(id: string) {
		return this.prisma.user.findFirst({
			where: { id }
		})
	}

	async findByRefreshToken(refreshToken: string) {
		return this.prisma.user.findFirst({
			where: { token: { refreshToken } }
		})
	}

	async findByEmailConfirmationLink(link: string) {
		return this.prisma.user.findFirst({
			where: { emailConfirmationLink: link }
		})
	}

	async create(userData: CreateUserData) {
		return this.prisma.user.create({
			data: userData
		})
	}

	async update(id: string, data: UpdateUserData) {
		return this.prisma.user.update({
			where: { id },
			data
		})
	}

	async delete(id: string) {
		await this.prisma.user.delete({
			where: { id }
		})
	}

	async findAll() {
		return this.prisma.user.findMany()
	}
}
