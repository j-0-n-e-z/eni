import type { Request, Response } from 'express'

import type { WordService } from '@/services/word.service'
import type { Word, WordSource } from '@/shared-types'
import { ApiError, ErrorCodes } from '@/utils'

export class WordController {
	constructor(private readonly wordService: WordService) {}

	getWordsByUserId = async (req: Request, res: Response) => {
		const { userId } = req.params

		const words = await this.wordService.getWordsByUserId(userId)

		res.json(words)
	}

	getMoreWordSources = async (req: Request, res: Response) => {
		const { wordText } = req.params

		const word = await this.wordService.getMoreWordSources(wordText)

		if (!word)
			throw new ApiError(
				404,
				`No sources for word '${wordText}' were found`,
				ErrorCodes.NOT_FOUND
			)

		res.json(JSON.parse(word.sources as string))
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
}
