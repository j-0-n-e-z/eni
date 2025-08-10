import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import type { UserService } from '../services/user.service'
import { REFRESH_TOKEN } from '../utils/constants'
import { AuthenticationError } from '../utils/errors/exceptions'

export class AuthController {
	constructor(private readonly userService: UserService) {}

	signup = async (req: Request, res: Response) => {
		const { username, password, email } = req.body

		// TODO: validate username, email and password
		// validation error - code 422

		const hashedPassword = await bcrypt.hash(password, 5)

		const { userDto, accessToken, refreshToken } =
			await this.userService.signup(username, email, hashedPassword)

		return res
			.cookie(REFRESH_TOKEN, refreshToken, {
				maxAge: 2592000000,
				httpOnly: true
			})
			.status(201)
			.json({
				accessToken,
				user: userDto
			})
	}

	login = async (req: Request, res: Response) => {
		const { email, password } = req.body

		console.log(email, password)

		// TODO: validate email and password
		// validation error - code 422

		const { userDto, accessToken, refreshToken } = await this.userService.login(
			email,
			password
		)

		return res
			.cookie(REFRESH_TOKEN, refreshToken, {
				maxAge: 2592000000,
				httpOnly: true
			})
			.status(200)
			.json({
				accessToken,
				user: userDto
			})
	}

	logout = async (req: Request, res: Response) => {
		const refreshToken = req.cookies[REFRESH_TOKEN]

		await this.userService.logout(refreshToken)
		res.clearCookie(REFRESH_TOKEN)

		return res.status(200).json({ message: 'Logged out successfully' })
	}

	refresh = async (req: Request, res: Response) => {
		const refreshToken = req.cookies[REFRESH_TOKEN]

		if (!refreshToken) {
			throw new AuthenticationError(401, 'Refresh token required')
		}

		const { userDto, newAccessToken, newRefreshToken } =
			await this.userService.refresh(refreshToken)

		res
			.cookie(REFRESH_TOKEN, newRefreshToken, {
				maxAge: 2592000000,
				httpOnly: true
			})
			.status(200)
			.json({
				accessToken: newAccessToken,
				user: userDto
			})
	}

	activate = async (req: Request, res: Response) => {
		const emailConfirmationLink = req.params.link
		await this.userService.confirmEmail(emailConfirmationLink)
		res.redirect(process.env.CLIENT_URL as string)
	}
}
