import express from 'express'

import { TranslateController } from '../controllers/translate.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { TranslateService } from '../services/translate.service'
import { asyncHandler } from '../utils/errors/asyncHandler'

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
