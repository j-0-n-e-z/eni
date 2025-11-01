import bcrypt from 'bcrypt'
import { inject, injectable } from 'inversify'
import { v4 as uuidv4 } from 'uuid'

import { UserDto } from '@/dtos'
import { TYPES } from '@/inversify/types'
import type { IUserRepository } from '@/repositories/types'
import { ApiError, ErrorCodes, ValidationError } from '@/utils'

import { JwtService } from './jwt.service'
import type {
	IMailService,
	ITokenService,
	IUserService
} from './services-types'

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IUserRepository)
		private readonly userRepository: IUserRepository,
		@inject(TYPES.ITokenService) private readonly tokenService: ITokenService,
		@inject(TYPES.IMailService) private readonly mailService: IMailService,
		@inject(TYPES.JwtService)
		private readonly jwtService: JwtService = new JwtService()
	) {}

	async getUserByUsername(username: string) {
		const user = await this.userRepository.findByUsername(username)

		if (!user) throw new ApiError(404, 'User not found', ErrorCodes.NOT_FOUND)

		return new UserDto(user)
	}

	async getUsers() {
		const users = await this.userRepository.findAll()
		return users.map((user) => new UserDto(user))
	}

	async getMe(refreshToken: string) {
		const user = await this.userRepository.findByRefreshToken(refreshToken)

		if (!user) throw new ApiError(404, 'User not found', ErrorCodes.NOT_FOUND)

		return new UserDto(user)
	}

	async signup(username: string, email: string, hashedPassword: string) {
		const existingUser = await this.userRepository.findByEmail(email)

		if (existingUser) {
			throw new ValidationError(
				409,
				'User with given email already exists',
				ErrorCodes.RECORD_ALREADY_EXISTS,
				'email'
			)
		}

		const emailConfirmationLink = uuidv4()

		const user = await this.userRepository.create({
			username,
			email,
			password: hashedPassword,
			emailConfirmationLink
		})

		await this.mailService.sendConfirmationEmail(
			email,
			`${process.env.API_URL}/api/activate/${user.emailConfirmationLink}`
		)
	}

	async login(email: string, password: string) {
		const existingUser = await this.userRepository.findByEmail(email)

		if (!existingUser) {
			throw new ValidationError(
				404,
				'User with given email was not found',
				ErrorCodes.NOT_FOUND,
				'email'
			)
		}

		const isPasswordMatch = await bcrypt.compare(
			password,
			existingUser.password
		)

		if (!isPasswordMatch) {
			throw new ValidationError(
				400,
				'Incorrect password',
				ErrorCodes.INVALID_CREDENTIALS,
				'password'
			)
		}

		const user = new UserDto(existingUser)

		const { accessToken, refreshToken } = this.jwtService.generateTokens(user)

		await this.tokenService.saveRefreshToken(user.id, refreshToken)

		return { user, accessToken, refreshToken }
	}

	async logout(refreshToken: string) {
		await this.tokenService.invalidateRefreshToken(refreshToken)
	}

	async refresh(refreshToken: string) {
		this.jwtService.verifyRefreshToken(refreshToken)

		const user = await this.userRepository.findByRefreshToken(refreshToken)

		if (!user) {
			throw new ApiError(
				401,
				'Could not authorize you. Log in again',
				ErrorCodes.UNAUTHORIZED
			)
		}

		const userDto = new UserDto(user)

		const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
			this.jwtService.generateTokens(userDto)

		await this.tokenService.saveRefreshToken(userDto.id, newRefreshToken)

		return {
			user: userDto,
			newAccessToken,
			newRefreshToken
		}
	}

	async confirmEmail(emailConfirmationLink: string) {
		const user = await this.userRepository.findByEmailConfirmationLink(
			emailConfirmationLink
		)

		if (!user) {
			throw new ApiError(
				404,
				'User with given email confirmation link was not found',
				ErrorCodes.NOT_FOUND
			)
		}

		await this.userRepository.update(user.id, {
			isEmailConfirmed: true,
			emailConfirmationLink: null
		})

		await this.mailService.sendEmail(
			user.email,
			'Account Activated',
			`<div><h1>Аккаунт <b>${user.username}</b> успешно активирован</h1><div>`
		)
	}

	async deleteUser(userId: string) {
		await this.userRepository.delete(userId)
	}
}
