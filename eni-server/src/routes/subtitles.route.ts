import express from 'express'

import { SubtitleController } from '../controllers/subtitles.controller'
import { MovieService } from '../services/movies.service'
import { SubtitleService } from '../services/subtitles.service'
import { asyncHandler } from '../utils/errors/asyncHandler'

const subtitlesRouter = express.Router()

const subtitleController = new SubtitleController(
	new SubtitleService(),
	new MovieService()
)

subtitlesRouter.post(
	'/subtitles',
	asyncHandler(subtitleController.downloadSubtitle)
)

export { subtitlesRouter }
