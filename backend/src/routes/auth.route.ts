import express from 'express'

import type { AuthController } from '@/controllers'
import { container } from '@/inversify/inversify.config'
import { TYPES } from '@/inversify/types'
import { authMiddleware } from '@/middlewares'
import { asyncHandler } from '@/utils'

const authRouter = express.Router()

const authController = container.get<AuthController>(TYPES.AuthController)

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
