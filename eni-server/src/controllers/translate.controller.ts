import type { Request, Response } from 'express'

import type { TranslateService } from '../services/translate.service'

export class TranslateController {
	constructor(private readonly translateService: TranslateService) {}

	translate = async (req: Request, res: Response) => {
		const { text } = req.body as { text: string }

		const translation = await this.translateService.translate(text)

		res.status(200).json({ ...translation })
	}
}
