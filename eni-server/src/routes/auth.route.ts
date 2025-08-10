import express from 'express'

import { AuthController } from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { MailService } from '../services/mail.service'
import { TokenService } from '../services/token.service'
import { UserService } from '../services/user.service'
import { asyncHandler } from '../utils/errors/asyncHandler'
import { gmailTransporter } from '../utils/gmailTransporter'
import { prisma } from '../utils/prismaClient'

const authRouter = express.Router()

const authController = new AuthController(
	new UserService(
		prisma,
		new TokenService(prisma),
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
authRouter.post('/refresh', asyncHandler(authController.refresh))

export { authRouter }
