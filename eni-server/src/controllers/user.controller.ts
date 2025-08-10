import { Request, Response } from 'express'
import { UserDto } from '../dtos/userDto'
import { UserService } from '../services/user.service'
import { REFRESH_TOKEN } from '../utils/constants'
import { ApiError } from '../utils/errors/exceptions'

export class UserController {
	constructor(private readonly userService: UserService) {}

	getUserByUsername = async (req: Request, res: Response) => {
		const username = req.params.username

		const user = await this.userService.getUserByUsername(username)

		if (!user) throw new ApiError(404, 'User not found')

		res.json({ ...user })
	}

	getUsers = async (req: Request, res: Response) => {
		const users = await this.userService.getUsers()

		const userDtos = users.map((u) => new UserDto(u))

		res.json({ users: userDtos })
	}

	getMe = async (req: Request, res: Response) => {
		const refreshToken = req.cookies[REFRESH_TOKEN]

		const user = await this.userService.getMe(refreshToken)

		res.json({ ...new UserDto(user) })
	}
}
