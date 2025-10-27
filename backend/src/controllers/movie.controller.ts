import type { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'

import { TYPES } from '@/inversify/types'
import type { IMovieService } from '@/services/services-types'
import type { SearchMoviesParams } from '@/types'

@injectable()
export class MovieController {
	constructor(
		@inject(TYPES.IMovieService) private readonly movieService: IMovieService
	) {}

	searchMovies = async (req: Request, res: Response) => {
		const query = req.query as unknown as SearchMoviesParams

		const movies = await this.movieService.searchMovies(query)

		res.status(200).json(movies)
	}

	findMovieById = async (req: Request, res: Response) => {
		const { movieId } = req.params

		const movie = await this.movieService.getMovieById(+movieId)

		res.status(200).json(movie)
	}

	getMovieBoxOfficeById = async (req: Request, res: Response) => {
		const { movieId } = req.params

		const movieBoxOffice =
			await this.movieService.getMovieBoxOfficeById(+movieId)

		res.status(200).json(movieBoxOffice)
	}
}
