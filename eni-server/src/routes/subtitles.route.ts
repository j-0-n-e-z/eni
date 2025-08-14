import express from 'express'

import { SubtitleController } from '../controllers/subtitles.controller'
import { SubtitleService } from '../services/subtitles.service'
import { asyncHandler } from '../utils/errors/asyncHandler'

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
