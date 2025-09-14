import express from 'express'

import { UserController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { MailService, TokenService, UserService } from '@/services'
import { asyncHandler, gmailTransporter, prisma } from '@/utils'

const userRouter = express.Router()

const tokenService = new TokenService(prisma)
const mailService = new MailService(gmailTransporter)

const userController = new UserController(
	new UserService(prisma, tokenService, mailService)
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

export { userRouter }
