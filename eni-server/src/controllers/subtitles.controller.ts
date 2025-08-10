import { Request, Response } from 'express'
import { SubtitleService } from '../services/subtitles.service'

export class SubtitleController {
	constructor(private readonly subtitleService: SubtitleService) {}

	downloadSubtitle = async (req: Request, res: Response) => {
		const { fileId } = req.body

		const subtitles = await this.subtitleService.downloadSubtitle(fileId)

		res.status(200).json(subtitles)
	}
}
