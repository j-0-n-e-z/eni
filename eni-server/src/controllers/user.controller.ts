import type { Request, Response } from 'express'

import { UserDto } from '../dtos/userDto'
import type { UserService } from '../services/user.service'
import type { Word } from '../types'
import { REFRESH_TOKEN } from '../utils/constants'
import { ApiError, AuthenticationError } from '../utils/errors/exceptions'

export class UserController {
	constructor(private readonly userService: UserService) {}

	getUserByUsername = async (req: Request, res: Response) => {
		const { username } = req.params

		const user = await this.userService.getUserByUsername(username)

		if (!user) throw new ApiError(404, 'User not found')

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

	getWordsByUserId = async (req: Request, res: Response) => {
		const { userId } = req.params

		const words = await this.userService.getWordsByUserId(userId)

		if (!words || words.length === 0) {
			throw new ApiError(404, 'Words not found')
		}

		res.json(words)
	}

	saveWord = async (req: Request, res: Response) => {
		const { userId } = req.params
		const { word } = req.body as {
			word: Word
		}

		const userWord = await this.userService.saveWord(userId, word)

		return res.json(userWord)
	}

	deleteWord = async (req: Request, res: Response) => {
		const { userId, wordId } = req.params

		await this.userService.deleteWord(userId, wordId)

		return res.json({ message: 'Word deleted' })
	}
}
