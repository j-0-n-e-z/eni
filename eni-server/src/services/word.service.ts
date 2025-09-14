import type { PrismaClient } from '@prisma/client'

import type { TranslatedWord, Word, WordSource } from '@/shared-types'
import { ApiError, ErrorCodes } from '@/utils'

import type { TranslateService } from './translate.service'

export class WordService {
	constructor(
		private readonly prisma: PrismaClient,
		private readonly translateService: TranslateService
	) {}

	// TODO: remove from source or remove at all
	async deleteWord(userId: string, wordText: string) {
		await this.prisma.userWord.delete({
			where: { userId_text: { userId, text: wordText } }
		})
	}

	async getWordsByUserId(userId: string) {
		const userWords = await this.findWordsByUserId(userId)
		return userWords.map(this.mapUserWordToWord)
	}

	async saveWord(userId: string, word: Word) {
		const translatedWord = await this.translateWord(word)

		await this.saveToWords(translatedWord)

		const userWord = await this.saveToUserWords(userId, translatedWord)

		return userWord
	}

	async translateWord(word: Word): Promise<TranslatedWord> {
		if (!word.translation) {
			const definitions = await this.translateService.findDefinition(word.text)

			if (this.translateService.isDefinitionsEmpty(definitions)) {
				const {
					0: { text: translation }
				} = await this.translateService.translate(word.text)

				word.translation = translation

				return word as TranslatedWord
			}

			word.translation =
				this.translateService.convertDefinitionsToString(definitions)
		}

		return word as TranslatedWord
	}

	async getMoreWordSources(wordText: string) {
		return this.prisma.word.findUnique({ where: { text: wordText } })
	}

	private async saveToUserWords(userId: string, word: TranslatedWord) {
		const existingUserWord = await this.prisma.userWord.findUnique({
			where: { userId_text: { userId, text: word.text } }
		})

		if (existingUserWord) {
			const existingMyWordSources = JSON.parse(
				existingUserWord.mySources as string
			) as WordSource[]

			const newMyWordSources = word.mySources.filter(
				(source) => !existingMyWordSources.find((s) => s.id === source.id)
			)

			if (newMyWordSources.length === 0) {
				throw new ApiError(
					409,
					`All given sources have already been added`,
					ErrorCodes.RECORD_ALREADY_EXISTS
				)
			}

			const updatedUserWord = await this.prisma.userWord.update({
				where: { userId_text: { userId, text: word.text } },
				data: {
					mySources: JSON.stringify([
						...existingMyWordSources,
						...newMyWordSources
					])
				}
			})

			return updatedUserWord
		}

		const userWord = await this.prisma.userWord.create({
			data: {
				userId,
				text: word.text,
				mySources: JSON.stringify(word.mySources),
				isFavorite: false,
				isLearned: false
			}
		})

		return userWord
	}

	private async saveToWords(word: TranslatedWord) {
		const existingWord = await this.prisma.word.findUnique({
			where: { text: word.text }
		})

		if (existingWord) {
			const existingWordSources = JSON.parse(
				existingWord.sources as string
			) as WordSource[]

			const newWordSources = word.mySources.filter(
				(source) => !existingWordSources.find((s) => s.id === source.id)
			)

			if (newWordSources.length === 0) {
				throw new ApiError(
					409,
					`All given sources have already been added`,
					ErrorCodes.RECORD_ALREADY_EXISTS
				)
			}

			const updatedWord = await this.prisma.word.update({
				where: { text: word.text },
				data: {
					sources: JSON.stringify([...existingWordSources, ...newWordSources])
				}
			})

			return updatedWord
		}

		const newWord = await this.prisma.word.create({
			data: {
				translation: word.translation,
				text: word.text,
				id: word.id,
				sources: JSON.stringify(word.mySources)
			}
		})

		return newWord
	}

	private async findWordsByUserId(userId: string) {
		return this.prisma.userWord.findMany({
			where: { userId },
			select: {
				isFavorite: true,
				isLearned: true,
				word: true,
				mySources: true
			}
		})
	}

	private mapUserWordToWord(
		userWord: Awaited<ReturnType<typeof this.findWordsByUserId>>[number]
	): Word {
		return {
			id: userWord.word.id,
			text: userWord.word.text,
			mySources: JSON.parse(userWord.mySources as string) as WordSource[],
			sources: JSON.parse(userWord.word.sources as string) as WordSource[],
			isLearned: userWord.isLearned,
			isFavorite: userWord.isFavorite,
			isJoined: false
		}
	}
}
