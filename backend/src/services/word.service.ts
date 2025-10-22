import type { PrismaClient } from '@prisma/client'
import type { JsonValue } from '@prisma/client/runtime/library'

import type { Word, WordSource } from '@/shared-types'
import { ApiError, ErrorCodes } from '@/utils'

import type { TranslateService } from './yandexTranslate.service'

export class WordService {
	constructor(
		private readonly prisma: PrismaClient,
		private readonly translateService: TranslateService
	) {}

	private parseWordSources(sources: JsonValue): WordSource[] {
		try {
			return JSON.parse(sources as string) as WordSource[]
		} catch {
			return []
		}
	}

	async deleteUserWord(userId: string, wordText: string) {
		const userWord = await this.prisma.userWord.findUnique({
			where: { userId_text: { userId, text: wordText } }
		})

		if (!userWord)
			throw new ApiError(
				404,
				`User with id "${userId} was not found"`,
				ErrorCodes.NOT_FOUND
			)

		await this.prisma.userWord.delete({
			where: { userId_text: { userId, text: wordText } }
		})
	}

	async deleteUserWordSource(
		userId: string,
		wordText: string,
		wordSource: WordSource
	) {
		const userWord = await this.prisma.userWord.findUnique({
			where: { userId_text: { userId, text: wordText } }
		})

		if (!userWord)
			throw new ApiError(
				404,
				`User with id "${userId}" was not found`,
				ErrorCodes.NOT_FOUND
			)

		const userWordSources = this.parseWordSources(userWord.mySources)

		if (
			userWordSources.length === 1 &&
			userWordSources[0].id === wordSource.id
		) {
			await this.prisma.userWord.delete({
				where: { userId_text: { userId, text: wordText } }
			})
			return
		}

		await this.prisma.userWord.update({
			where: { userId_text: { userId, text: wordText } },
			data: {
				mySources: JSON.stringify(
					userWordSources.filter((s) => s.id !== wordSource.id)
				)
			}
		})
	}

	async translateWord(wordText: string) {
		try {
			const definitions = await this.translateService.findDefinition(wordText)
			return definitions
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 404) {
				const translations = await this.translateService.translate(wordText)

				console.log('TRANSLATIONS', translations)

				return translations[0].text
			}

			throw e
		}
	}

	async getMoreWordSources(wordText: string) {
		return this.prisma.word.findUnique({ where: { text: wordText } })
	}

	private async saveToUserWords(userId: string, word: Word) {
		const userWord = await this.prisma.userWord.findUnique({
			where: { userId_text: { userId, text: word.text } }
		})

		if (userWord) {
			const userWordSources = this.parseWordSources(userWord.mySources)

			const userWordSourceIds = new Set(userWordSources.map((s) => s.id))
			const newWordSources = word.mySources.filter(
				(source) => !userWordSourceIds.has(source.id)
			)

			if (newWordSources.length === 0) {
				throw new ApiError(
					409,
					`All given sources have already been added`,
					ErrorCodes.RECORD_ALREADY_EXISTS
				)
			}

			const updatedUserWord = await this.prisma.userWord.update({
				where: { userId_text: { userId, text: word.text } },
				data: {
					mySources: JSON.stringify([...userWordSources, ...newWordSources])
				}
			})

			return updatedUserWord
		}

		const newUserWord = await this.prisma.userWord.create({
			data: {
				userId,
				text: word.text,
				mySources: JSON.stringify(word.mySources),
				isFavorite: false,
				isLearned: false
			}
		})

		return newUserWord
	}

	private async saveToWords(word: Word) {
		const wordDb = await this.prisma.word.findUnique({
			where: { text: word.text }
		})

		if (wordDb) {
			const wordDbSources = this.parseWordSources(wordDb.sources)

			const wordDbSourceIds = new Set(wordDbSources.map((s) => s.id))
			const newWordSources = word.mySources.filter(
				(source) => !wordDbSourceIds.has(source.id)
			)

			if (newWordSources.length === 0) return

			const updatedWord = await this.prisma.word.update({
				where: { text: word.text },
				data: {
					sources: JSON.stringify([...wordDbSources, ...newWordSources])
				}
			})

			return updatedWord
		}

		const translation = await this.translateWord(word.text)

		const newWord = await this.prisma.word.create({
			data: {
				translation,
				text: word.text,
				id: word.id,
				isJoined: word.isJoined,
				sources: JSON.stringify(word.mySources)
			}
		})

		return newWord
	}

	async saveWord(userId: string, word: Word) {
		await this.saveToWords(word)

		const userWord = await this.saveToUserWords(userId, word)

		return userWord
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
			translation: userWord.word.translation,
			mySources: this.parseWordSources(userWord.mySources),
			sources: this.parseWordSources(userWord.word.sources),
			isLearned: userWord.isLearned,
			isFavorite: userWord.isFavorite,
			isJoined: userWord.word.isJoined
		}
	}

	async getWordsByUserId(userId: string) {
		const userWords = await this.findWordsByUserId(userId)
		return userWords.map(this.mapUserWordToWord.bind(this))
	}
}
