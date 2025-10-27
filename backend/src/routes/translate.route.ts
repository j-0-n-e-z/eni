import express from 'express'

import type { TranslateController } from '@/controllers'
import { container } from '@/inversify/inversify.config'
import { TYPES } from '@/inversify/types'
import { authMiddleware } from '@/middlewares'
import { asyncHandler } from '@/utils'

const translateRouter = express.Router()

const translateController = container.get<TranslateController>(
	TYPES.TranslateController
)

translateRouter.post(
	'/definition',
	authMiddleware.protectByAccessToken,
	asyncHandler(translateController.findDefinition)
)

translateRouter.post(
	'/translate',
	authMiddleware.protectByAccessToken,
	asyncHandler(translateController.translate)
)

export { translateRouter }
