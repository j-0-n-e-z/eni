import express from 'express'

import type { UserController } from '@/controllers'
import { container } from '@/inversify/inversify.config'
import { TYPES } from '@/inversify/types'
import { authMiddleware } from '@/middlewares'
import { asyncHandler } from '@/utils'

const userRouter = express.Router()

const userController = container.get<UserController>(TYPES.UserController)

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
