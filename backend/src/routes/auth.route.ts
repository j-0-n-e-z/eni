import express from 'express'

import { AuthController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { PrismaTokenRepository } from '@/repositories/prisma-token.repository'
import { PrismaUserRepository } from '@/repositories/prisma-user.repository'
import { MailService, TokenService, UserService } from '@/services'
import { asyncHandler, gmailTransporter } from '@/utils'

const authRouter = express.Router()

const authController = new AuthController(
	new UserService(
		new PrismaUserRepository(),
		new TokenService(new PrismaTokenRepository()),
		new MailService(gmailTransporter)
	)
)

authRouter.post('/signup', asyncHandler(authController.signup))
authRouter.post('/login', asyncHandler(authController.login))
authRouter.post(
	'/logout',
	authMiddleware.protectByRefreshToken,
	asyncHandler(authController.logout)
)
authRouter.get('/activate/:link', asyncHandler(authController.activate))
authRouter.post(
	'/refresh',
	authMiddleware.protectByRefreshToken,
	asyncHandler(authController.refresh)
)

export { authRouter }
