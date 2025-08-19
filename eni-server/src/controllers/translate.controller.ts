import type { Request, Response } from 'express'

import type { TranslateService } from '@/services'
import { ApiError, ErrorCodes } from '@/utils'

export class TranslateController {
	constructor(private readonly translateService: TranslateService) {}

	findDefinition = async (req: Request, res: Response) => {
		const { text } = req.body as { text: string }

		const definitions = await this.translateService.findDefinition(text)

		if (definitions.length === 0) {
			throw new ApiError(404, 'Definition not found', ErrorCodes.NOT_FOUND)
		}

		res.status(200).json(definitions)
	}

	translate = async (req: Request, res: Response) => {
		const { text } = req.body as { text: string }

		const response = await this.translateService.translate(text)

		res.status(200).json(response.translations)
	}
}
