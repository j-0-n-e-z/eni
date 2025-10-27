import type { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { TYPES } from '@/inversify/types'
import type { ISubtitleService } from '@/services'
import type { MovieSubtitle } from '@/shared-types'

@injectable()
export class SubtitleController {
	constructor(
		@inject(TYPES.ISubtitleService)
		private readonly subtitleService: ISubtitleService
	) {}

	getMovieSubtitles = async (req: Request, res: Response) => {
		const { query } = req.params

		const movieSubtitles = await this.subtitleService.findMovieSubtitles(query)

		const movieSubtitleMap = new Map<number, MovieSubtitle>()

		movieSubtitles.forEach((movie) => {
			if (!movieSubtitleMap.has(movie.subtitles.rating)) {
				movieSubtitleMap.set(movie.subtitles.rating, movie)
			}
		})

		const sortedMovieSubtitles = Array.from(movieSubtitleMap.values()).sort(
			(a, b) => b.subtitles.rating - a.subtitles.rating
		)

		res.status(200).json(sortedMovieSubtitles)
	}

	getSubtitlesByFileId = async (req: Request, res: Response) => {
		const { fileId } = req.params

		const subtitles = await this.subtitleService.getSubtitlesByFileId(+fileId)

		console.log(subtitles)

		res.status(200).json(subtitles)
	}
}
