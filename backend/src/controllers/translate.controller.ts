import type { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { TYPES } from '@/inversify/types'
import type { ITranslateService, IWordService } from '@/services'

@injectable()
export class TranslateController {
	constructor(
		@inject(TYPES.ITranslateService)
		private readonly translateService: ITranslateService,
		@inject(TYPES.IWordService) private readonly wordService: IWordService
	) {}

	findDefinition = async (req: Request, res: Response) => {
		const { text } = req.body as { text: string }

		const definitions = await this.translateService.findDefinition(text)

		this.wordService.tryIncrementTranslateCount(text)

		res.status(200).json(definitions)
	}

	translate = async (req: Request, res: Response) => {
		const { text } = req.body as { text: string }

		const translations = await this.translateService.translate(text)

		this.wordService.tryIncrementTranslateCount(text)

		res.status(200).json(translations)
	}
}
