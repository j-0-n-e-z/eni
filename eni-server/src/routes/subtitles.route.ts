import express from 'express'
import { SubtitleController } from '../controllers/subtitles.controller'
import { SubtitleService } from '../services/subtitles.service'
import { asyncHandler } from '../utils/errors/asyncHandler'

const subtitlesRouter = express.Router()

const subtitleController = new SubtitleController(new SubtitleService())

subtitlesRouter.post(
	'/subtitles',
	asyncHandler(subtitleController.downloadSubtitle)
)

export { subtitlesRouter }
