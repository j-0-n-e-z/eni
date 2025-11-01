import type { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { TYPES } from '@/inversify/types'
import { IWordService } from '@/services'
import type { Word, WordSource } from '@/shared-types'
import { ApiError, ErrorCodes } from '@/utils'

@injectable()
export class WordController {
	constructor(
		@inject(TYPES.IWordService) private readonly wordService: IWordService
	) {}

	getWordsByUserId = async (req: Request, res: Response) => {
		const { userId } = req.params

		const words = await this.wordService.getWordsByUserId(userId)

		res.json(words)
	}

	getMoreWordSources = async (req: Request, res: Response) => {
		const { wordText } = req.params

		const wordSources = await this.wordService.getMoreWordSources(wordText)

		if (!wordSources)
			throw new ApiError(
				404,
				`No sources for word '${wordText}' were found`,
				ErrorCodes.NOT_FOUND
			)

		res.json(wordSources)
	}

	saveWord = async (req: Request, res: Response) => {
		const { userId } = req.params
		const { word } = req.body as {
			word: Word
		}

		await this.wordService.saveWord(userId, word)

		res.json({
			message: `Word '${word.text}' has been successfully saved`
		})
	}

	deleteUserWord = async (req: Request, res: Response) => {
		const { userId } = req.params
		const { wordText } = req.body as { wordText: string }

		await this.wordService.deleteUserWord(userId, wordText)

		res.json({ message: 'Word was successfully deleted' })
	}

	deleteUserWordSource = async (req: Request, res: Response) => {
		const { userId } = req.params
		const { wordSource, wordText } = req.body as {
			wordSource: WordSource
			wordText: string
		}

		await this.wordService.deleteUserWordSource(userId, wordText, wordSource)

		res.json({ message: 'Word source was successfully deleted' })
	}

	getMostTranslatableWords = async (req: Request, res: Response) => {
		const words = await this.wordService.getMostTranslatableWords()

		res.json(words)
	}
}
