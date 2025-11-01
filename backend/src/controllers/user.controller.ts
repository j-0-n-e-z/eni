import type { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { TYPES } from '@/inversify/types'
import type { IUserService } from '@/services/services-types'
import {
	ApiError,
	AuthenticationError,
	ErrorCodes,
	REFRESH_TOKEN
} from '@/utils'

@injectable()
export class UserController {
	constructor(
		@inject(TYPES.IUserService)
		private readonly userService: IUserService
	) {}

	getUserByUsername = async (req: Request, res: Response) => {
		const { username } = req.params

		const user = await this.userService.getUserByUsername(username)

		if (!user) throw new ApiError(404, 'User not found', ErrorCodes.NOT_FOUND)

		res.json(user)
	}

	getUsers = async (req: Request, res: Response) => {
		const users = await this.userService.getUsers()

		res.json({ users })
	}

	getMe = async (req: Request, res: Response) => {
		const refreshToken = req.cookies[REFRESH_TOKEN] as string | undefined

		if (!refreshToken) {
			throw new AuthenticationError(401, 'Not authorized')
		}

		const user = await this.userService.getMe(refreshToken)

		res.json(user)
	}
}
