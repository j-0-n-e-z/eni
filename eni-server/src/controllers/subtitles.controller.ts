import type { Request, Response } from 'express'

import type { MovieService } from '../services/movies.service'
import type { SubtitleService } from '../services/subtitles.service'

export class SubtitleController {
	constructor(
		private readonly subtitleService: SubtitleService,
		private readonly movieService: MovieService
	) {}

	downloadSubtitle = async (req: Request, res: Response) => {
		const { imdbId } = req.body as { imdbId: string }

		console.log('imdbId', imdbId)

		const movies =
			await this.movieService.findOpenSubtitlesMoviesByImdbId(imdbId)

		console.log('movies', movies)

		const subtitles = await this.subtitleService.downloadSubtitle(
			movies[0].subtitles.file_id
		)

		res.status(200).json(subtitles)
	}
}
