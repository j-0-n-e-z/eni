import express from 'express'

import { UserController } from '../controllers/user.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { MailService } from '../services/mail.service'
import { TokenService } from '../services/token.service'
import { UserService } from '../services/user.service'
import { asyncHandler } from '../utils/errors/asyncHandler'
import { gmailTransporter } from '../utils/gmailTransporter'
import { prisma } from '../utils/prismaClient'

const userRouter = express.Router()

const tokenService = new TokenService(prisma)

const userController = new UserController(
	new UserService(prisma, tokenService, new MailService(gmailTransporter))
)

const authMiddleware = AuthMiddleware.getInstance(tokenService)

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
