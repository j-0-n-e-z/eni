import type { Request, Response } from 'express'

import type { TranslateService } from '@/services'
import { ApiError } from '@/utils'

export class TranslateController {
	constructor(private readonly translateService: TranslateService) {}

	findDefinition = async (req: Request, res: Response) => {
		const { text } = req.body as { text: string }

		const definition = await this.translateService.findDefinition(text)

		if (definition.def.length === 0) {
			throw new ApiError(404, 'Definition not found')
		}

		res.status(200).json({ ...definition })
	}

	translate = async (req: Request, res: Response) => {
		const { text } = req.body as { text: string }

		const translation = await this.translateService.translate(text)

		res.status(200).json(translation.translations)
	}
}
