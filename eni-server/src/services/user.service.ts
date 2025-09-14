import type { Prisma, PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { UserDto } from '@/dtos'
import {
	ApiError,
	AuthenticationError,
	ErrorCodes,
	ValidationError
} from '@/utils'

import type { MailService } from './mail.service'
import type { TokenService } from './token.service'

export class UserService {
	constructor(
		private readonly prisma: PrismaClient,
		private readonly tokenService: TokenService,
		private readonly mailService: MailService
	) {}

	async getUserByUsername(username: string) {
		return this.prisma.user.findFirst({ where: { username } })
	}

	async getUsers() {
		return this.prisma.user.findMany()
	}

	async getMe(refreshToken: string) {
		const user = await this.prisma.user.findFirst({
			where: { token: { refreshToken } }
		})

		if (!user) throw new AuthenticationError(404, 'User not found')

		return user
	}

	private async createUser(
		{
			username,
			email,
			password
		}: Pick<User, 'username' | 'email' | 'password'>,
		tx: Prisma.TransactionClient
	) {
		const client = tx || this.prisma
		const emailConfirmationLink = uuidv4()

		const user = await client.user.create({
			data: {
				username,
				password,
				email,
				emailConfirmationLink
			}
		})

		return user
	}

	async signup(username: string, email: string, hashedPassword: string) {
		await this.prisma.$transaction(async (tx) => {
			const existingUser = await this.findByEmail(email)

			if (existingUser) {
				throw new ValidationError(
					409,
					'User with given email already exists',
					ErrorCodes.RECORD_ALREADY_EXISTS,
					'email'
				)
			}

			const user = await this.createUser(
				{
					username,
					email,
					password: hashedPassword
				},
				tx
			)

			await this.mailService.sendConfirmationEmail(
				email,
				`${process.env.API_URL}/api/activate/${user.emailConfirmationLink}`
			)
		})
	}

	async login(email: string, password: string) {
		const { userDto, accessToken, refreshToken } =
			await this.prisma.$transaction(async (tx) => {
				const user = await this.findByEmail(email)

				if (!user) {
					throw new ValidationError(
						404,
						'User with given email was not found',
						ErrorCodes.NOT_FOUND,
						'email'
					)
				}

				const isPasswordMatch = await bcrypt.compare(password, user.password)

				if (!isPasswordMatch) {
					throw new ValidationError(
						400,
						'Incorrent password',
						ErrorCodes.INVALID_CREDENTIALS,
						'password'
					)
				}

				const userDto = new UserDto(user)

				const { accessToken, refreshToken } =
					this.tokenService.generateTokens(userDto)

				await this.tokenService.saveRefreshToken(userDto.id, refreshToken, tx)

				return { userDto, accessToken, refreshToken }
			})

		return { userDto, accessToken, refreshToken }
	}

	async logout(refreshToken: string) {
		await this.tokenService.invalidateRefreshToken(refreshToken)
	}

	async refresh(refreshToken: string) {
		this.tokenService.verifyRefreshToken(refreshToken)

		const user = await this.prisma.user.findFirst({
			where: { token: { refreshToken } }
		})

		if (!user) {
			throw new ApiError(
				404,
				'User with given refresh token not found',
				ErrorCodes.NOT_FOUND
			)
		}

		const userDto = new UserDto(user)

		const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
			this.tokenService.generateTokens(userDto)

		await this.tokenService.saveRefreshToken(userDto.id, newRefreshToken)

		return {
			userDto,
			newAccessToken,
			newRefreshToken
		}
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				email: {
					equals: email,
					mode: 'insensitive'
				}
			}
		})
	}

	async confirmEmail(emailConfirmationLink: string) {
		const user = await this.prisma.user.findFirst({
			where: { emailConfirmationLink }
		})

		if (!user) {
			throw new ApiError(
				404,
				'User with given email confirmation link was not found',
				ErrorCodes.NOT_FOUND
			)
		}

		await this.prisma.user.update({
			data: { isEmailConfirmed: true, emailConfirmationLink: null },
			where: { emailConfirmationLink }
		})

		await this.mailService.sendEmail(
			user?.email,
			'Account Activated',
			`<div><h1>Аккаунт <b>${user?.username}</b> успешно активирован</h1><div>`
		)
	}

	async deleteUser(userId: string) {
		await this.prisma.user.delete({ where: { id: userId } })
	}
}
