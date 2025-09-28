import express from 'express'

import { SubtitleController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { SubtitleService } from '@/services'
import { asyncHandler } from '@/utils'

const subtitlesRouter = express.Router()

const subtitleController = new SubtitleController(new SubtitleService())

subtitlesRouter.get(
	'/movie-subtitles/:query',
	authMiddleware.protectByAccessToken,
	asyncHandler(subtitleController.getMovieSubtitles)
)

subtitlesRouter.post(
	'/subtitles/:fileId',
	authMiddleware.protectByAccessToken,
	asyncHandler(subtitleController.getSubtitlesByFileId)
)

export { subtitlesRouter }
