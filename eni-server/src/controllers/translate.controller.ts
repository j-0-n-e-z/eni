import type { Request, Response } from 'express'

import type { TranslateService } from '@/services'
import { ApiError, ErrorCodes } from '@/utils'

export class TranslateController {
	constructor(private readonly translateService: TranslateService) {}

	findDefinition = async (req: Request, res: Response) => {
		const { text } = req.body as { text: string }

		const definitions = await this.translateService.findDefinition(text)

		if (this.translateService.isDefinitionsEmpty(definitions)) {
			throw new ApiError(404, 'Definition was not found', ErrorCodes.NOT_FOUND)
		}

		const definitionsAsString =
			this.translateService.convertDefinitionsToString(definitions)

		res.status(200).json(definitionsAsString)
	}

	translate = async (req: Request, res: Response) => {
		const { text } = req.body as { text: string }

		const translations = await this.translateService.translate(text)

		res.status(200).json(translations)
	}
}
