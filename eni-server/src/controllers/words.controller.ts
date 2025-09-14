import type { Request, Response } from 'express'

import type { WordService } from '@/services/word.service'
import type { Word } from '@/shared-types'
import { ApiError, ErrorCodes } from '@/utils'

export class WordController {
	constructor(private readonly wordService: WordService) {}

	getWordsByUserId = async (req: Request, res: Response) => {
		const { userId } = req.params

		const words = await this.wordService.getWordsByUserId(userId)

		if (!words || !words.length) {
			throw new ApiError(404, 'Words were not found', ErrorCodes.NOT_FOUND)
		}

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

		return res.json({
			message: `Word '${word.text}' has been successfully saved`
		})
	}

	deleteWord = async (req: Request, res: Response) => {
		const { userId, wordId } = req.params

		await this.wordService.deleteWord(userId, wordId)

		return res.json({ message: 'Word deleted' })
	}
}
