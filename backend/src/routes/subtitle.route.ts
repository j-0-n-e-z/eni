import express from 'express'

import type { SubtitleController } from '@/controllers'
import { container } from '@/inversify/inversify.config'
import { TYPES } from '@/inversify/types'
import { authMiddleware } from '@/middlewares'
import { asyncHandler } from '@/utils'

const subtitleRouter = express.Router()

const subtitleController = container.get<SubtitleController>(
	TYPES.SubtitleController
)

subtitleRouter.get(
	'/movie-subtitles/:query',
	authMiddleware.protectByAccessToken,
	asyncHandler(subtitleController.getMovieSubtitles)
)

subtitleRouter.post(
	'/subtitles/:fileId',
	authMiddleware.protectByAccessToken,
	asyncHandler(subtitleController.getSubtitlesByFileId)
)

export { subtitleRouter }
