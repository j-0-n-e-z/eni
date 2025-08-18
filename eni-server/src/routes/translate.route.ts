import express from 'express'

import { TranslateController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { TranslateService } from '@/services'
import { asyncHandler } from '@/utils'

const translateRouter = express.Router()

const translateController = new TranslateController(new TranslateService())

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
