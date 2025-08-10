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
	new UserService(
		prisma,
		tokenService,
		new MailService(gmailTransporter)
	)
)

const authMiddleware = AuthMiddleware.getInstance(tokenService)

userRouter.get(
	'/users/me',
	authMiddleware.protectByAccessToken,
	asyncHandler(userController.getMe)
)

userRouter.get(
	'/users/:username',
	asyncHandler(userController.getUserByUsername)
)

userRouter.get(
	'/users',
	asyncHandler(userController.getUsers)
)

export { userRouter }
