import express from 'express'

import { UserController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { PrismaTokenRepository } from '@/repositories/prisma-token.repository'
import { PrismaUserRepository } from '@/repositories/prisma-user.repository'
import { MailService, TokenService, UserService } from '@/services'
import { asyncHandler, gmailTransporter } from '@/utils'

const userRouter = express.Router()

const prismaTokenRepository = new PrismaTokenRepository()
const prismaUserRepository = new PrismaUserRepository()

const tokenService = new TokenService(prismaTokenRepository)
const mailService = new MailService(gmailTransporter)
const userService = new UserService(
	prismaUserRepository,
	tokenService,
	mailService
)

const userController = new UserController(userService)

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
