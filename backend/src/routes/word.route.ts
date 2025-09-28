import express from 'express'

import { WordController } from '@/controllers/words.controller'
import { authMiddleware } from '@/middlewares'
import { TranslateService } from '@/services'
import { WordService } from '@/services/word.service'
import { asyncHandler, prisma } from '@/utils'

export const wordRouter = express.Router()

const wordController = new WordController(
	new WordService(prisma, new TranslateService())
)

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

wordRouter.get('/word/sources/:wordText', asyncHandler(wordController.getMoreWordSources))
