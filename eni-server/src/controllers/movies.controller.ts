import type { Request, Response } from 'express'

import type { MovieService } from '@/services'
import type { SearchMoviesParams } from '@/types'

export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	searchMovies = async (req: Request, res: Response) => {
		const query = req.query as unknown as SearchMoviesParams

		const movies = await this.movieService.searchKinopoiskMovies(query)

		res.status(200).json(movies)
	}

	findMovieById = async (req: Request, res: Response) => {
		const { movieId } = req.params

		const movie = await this.movieService.getKinopoiskMovieById(+movieId)

		res.status(200).json(movie)
	}

	getMovieBoxOfficeById = async (req: Request, res: Response) => {
		const { movieId } = req.params

		const movieBoxOffice =
			await this.movieService.getMovieBoxOfficeById(+movieId)

		res.status(200).json(movieBoxOffice)
	}
}
