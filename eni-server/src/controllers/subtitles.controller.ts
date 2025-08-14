import type { Request, Response } from 'express'

import type { SubtitleService } from '../services/subtitles.service'
import type { MovieSubtitle } from '../types'

export class SubtitleController {
	constructor(private readonly subtitleService: SubtitleService) {}

	getSubtitlesByImdbId = async (req: Request, res: Response) => {
		const { imdbId } = req.params

		const movieSubtitles =
			await this.subtitleService.findMovieSubtitlesByImdbId(imdbId)

		const movieSubtitleMap = new Map<number, MovieSubtitle>()

		movieSubtitles.forEach((m) => {
			if (!movieSubtitleMap.has(m.subtitles.rating)) {
				movieSubtitleMap.set(m.subtitles.rating, m)
			}
		})

		res
			.status(200)
			.json(
				Array.from(movieSubtitleMap.values()).sort(
					(a, b) => b.subtitles.rating - a.subtitles.rating
				)
			)
	}

	getSubtitlesByFileId = async (req: Request, res: Response) => {
		const { fileId } = req.params

		const subtitles = await this.subtitleService.getSubtitlesByFileId(+fileId)

		res.status(200).json(subtitles)
	}
}
