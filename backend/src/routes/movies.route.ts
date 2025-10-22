import express from 'express'

import type { MovieController } from '@/controllers'
import { container } from '@/inversify/inversify.config'
import { TYPES } from '@/inversify/types'
import { authMiddleware } from '@/middlewares'
import { asyncHandler } from '@/utils'

const movieRouter = express.Router()

const movieController = container.get<MovieController>(TYPES.MovieController)

movieRouter.get(
	'/movies',
	authMiddleware.protectByAccessToken,
	asyncHandler(movieController.searchMovies)
)

movieRouter.get(
	'/movie/:movieId',
	authMiddleware.protectByAccessToken,
	asyncHandler(movieController.findMovieById)
)

movieRouter.get(
	'/movie/:movieId/box_office',
	authMiddleware.protectByAccessToken,
	asyncHandler(movieController.getMovieBoxOfficeById)
)

export { movieRouter }
