import express from 'express'

import { MovieController } from '@/controllers'
import { MovieService } from '@/services'
import { asyncHandler } from '@/utils'

const movieRouter = express.Router()

const movieController = new MovieController(new MovieService())

movieRouter.get('/movies', asyncHandler(movieController.searchMovies))
movieRouter.get('/movie/:movieId', asyncHandler(movieController.findMovieById))
movieRouter.get(
	'/movie/:movieId/box_office',
	asyncHandler(movieController.getMovieBoxOfficeById)
)

export { movieRouter }
