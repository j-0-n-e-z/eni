import express from 'express'

import { MovieController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { MovieService } from '@/services'
import { asyncHandler } from '@/utils'

const movieRouter = express.Router()

const movieController = new MovieController(new MovieService())

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
