import express from 'express'

import { UserController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { MailService, TokenService, UserService } from '@/services'
import { asyncHandler, gmailTransporter, prisma } from '@/utils'

const userRouter = express.Router()

const tokenService = new TokenService(prisma)

const userController = new UserController(
	new UserService(prisma, tokenService, new MailService(gmailTransporter))
)

userRouter.get(
	'/user/me',
	authMiddleware.protectByAccessToken,
	asyncHandler(userController.getMe)
)

userRouter.get(
	'/user/:username',
	asyncHandler(userController.getUserByUsername)
)

userRouter.get('/users', asyncHandler(userController.getUsers))

userRouter.post(
	'/user/:userId/word',
	authMiddleware.protectByAccessToken,
	asyncHandler(userController.saveWord)
)

userRouter.delete(
	'/user/:userId/word/:wordId',
	authMiddleware.protectByAccessToken,
	asyncHandler(userController.deleteWord)
)

userRouter.get(
	'/user/:userId/words',
	asyncHandler(userController.getWordsByUserId)
)

export { userRouter }
