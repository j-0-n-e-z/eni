import express from 'express'

import type { WordController } from '@/controllers/word.controller'
import { container } from '@/inversify/inversify.config'
import { TYPES } from '@/inversify/types'
import { authMiddleware } from '@/middlewares'
import { asyncHandler } from '@/utils'

export const wordRouter = express.Router()

const wordController = container.get<WordController>(TYPES.WordController)

wordRouter.post(
	'/user/:userId/word',
	authMiddleware.protectByAccessToken,
	asyncHandler(wordController.saveWord)
)

wordRouter.delete(
	'/user/:userId/wordSource',
	authMiddleware.protectByAccessToken,
	asyncHandler(wordController.deleteUserWordSource)
)

wordRouter.delete(
	'/user/:userId/word',
	authMiddleware.protectByAccessToken,
	asyncHandler(wordController.deleteUserWord)
)

wordRouter.get(
	'/user/:userId/words',
	asyncHandler(wordController.getWordsByUserId)
)

wordRouter.get(
	'/word/sources/:wordText',
	asyncHandler(wordController.getMoreWordSources)
)

wordRouter.get(
	'/word/popular',
	asyncHandler(wordController.getMostTranslatableWords)
)
