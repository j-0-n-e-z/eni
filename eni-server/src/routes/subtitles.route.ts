import express from 'express'

import { SubtitleController } from '@/controllers'
import { SubtitleService } from '@/services'
import { asyncHandler } from '@/utils'

const subtitlesRouter = express.Router()

const subtitleController = new SubtitleController(new SubtitleService())

subtitlesRouter.get(
	'/movie-subtitles/:imdbId',
	asyncHandler(subtitleController.getSubtitlesByImdbId)
)
subtitlesRouter.post(
	'/subtitles/:fileId',
	asyncHandler(subtitleController.getSubtitlesByFileId)
)

export { subtitlesRouter }
