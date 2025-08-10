import { Request, Response } from 'express'
import { MovieService } from '../services/movies.service'

export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	searchMovies = async (req: Request, res: Response) => {
		const query = req.query as Record<string, string>
		const movies = await this.movieService.searchMovies(query)
		res.status(200).json(movies)
	}

	findMovieById = async (req: Request, res: Response) => {
		const movieId = req.params.id
		const movies = await this.movieService.searchMovies({ id: movieId })
		res.status(200).json(movies[0])
	}

	findTMDBMovieById = async (req: Request, res: Response) => {
		const tmdbId = Number(req.params.id)
		const tmdbMovie = await this.movieService.findTMDBMovieById(tmdbId)
		res.status(200).json(tmdbMovie)
	}
}
