import express from 'express'

import { MovieController } from '../controllers/movies.controller'
import { MovieService } from '../services/movies.service'
import { asyncHandler } from '../utils/errors/asyncHandler'

const movieRouter = express.Router()

const movieController = new MovieController(new MovieService())

movieRouter.get('/movies', asyncHandler(movieController.searchMovies))
movieRouter.get('/movies/:id', asyncHandler(movieController.findMovieById))
movieRouter.get('/movies/:id/box_office', asyncHandler(movieController.getMovieBoxOfficeById))

export { movieRouter }
