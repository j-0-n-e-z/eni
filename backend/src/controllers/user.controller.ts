import type { Request, Response } from 'express'

import { UserDto } from '@/dtos'
import type { UserService } from '@/services'
import { ApiError, AuthenticationError, ErrorCodes } from '@/utils'

import { REFRESH_TOKEN } from '../utils/constants'

export class UserController {
	constructor(private readonly userService: UserService) {}

	getUserByUsername = async (req: Request, res: Response) => {
		const { username } = req.params

		const user = await this.userService.getUserByUsername(username)

		if (!user) throw new ApiError(404, 'User not found', ErrorCodes.NOT_FOUND)

		res.json(user)
	}

	getUsers = async (req: Request, res: Response) => {
		const users = await this.userService.getUsers()

		const userDtos = users.map((u) => new UserDto(u))

		res.json({ users: userDtos })
	}

	getMe = async (req: Request, res: Response) => {
		const refreshToken = req.cookies[REFRESH_TOKEN] as string | undefined

		if (!refreshToken) {
			throw new AuthenticationError(401, 'Not authorized')
		}

		const user = await this.userService.getMe(refreshToken)

		res.json(new UserDto(user))
	}
}
