import { inject, injectable } from 'inversify'

import { TYPES } from '@/inversify/types'
import type { IWordsRepository } from '@/repositories'
import type { SavedWord, Word, WordSource } from '@/shared-types'
import { ApiError, ErrorCodes } from '@/utils'

import type { ITranslateService, IWordService } from './services-types'

@injectable()
export class WordService implements IWordService {
	constructor(
		@inject(TYPES.IWordsRepository)
		private readonly wordRepository: IWordsRepository,
		@inject(TYPES.ITranslateService)
		private readonly translateService: ITranslateService
	) {}

	async deleteUserWord(userId: string, wordText: string) {
		const userWord = await this.wordRepository.findUserWord(userId, wordText)

		if (!userWord)
			throw new ApiError(
				404,
				`User with id "${userId} was not found"`,
				ErrorCodes.NOT_FOUND
			)

		await this.wordRepository.deleteUserWord(userId, wordText)
	}

	async deleteUserWordSource(
		userId: string,
		wordText: string,
		wordSource: WordSource
	) {
		const userWord = await this.wordRepository.findUserWord(userId, wordText)

		if (!userWord)
			throw new ApiError(
				404,
				`User with id "${userId}" was not found`,
				ErrorCodes.NOT_FOUND
			)

		const userWordSources = userWord.mySources

		if (
			userWordSources.length === 1 &&
			userWordSources[0].id === wordSource.id
		) {
			await this.wordRepository.deleteUserWord(userId, wordText)
			return
		}

		await this.wordRepository.updateUserWordSources(
			userId,
			wordText,
			userWordSources.filter((s) => s.id !== wordSource.id)
		)
	}

	async translateWord(wordText: string) {
		try {
			const definition = await this.translateService.findDefinition(wordText)

			this.tryIncrementTranslateCount(wordText)

			return definition
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 404) {
				const translations = await this.translateService.translate(wordText)

				this.tryIncrementTranslateCount(wordText)

				console.log('TRANSLATIONS', translations)

				return translations[0].text
			}

			throw e
		}
	}

	async getMoreWordSources(wordText: string) {
		const word = await this.wordRepository.findWord(wordText)

		if (!word) return null

		return word.sources
	}

	private async saveToUserWords(userId: string, word: Word) {
		const userWord = await this.wordRepository.findUserWord(userId, word.text)

		if (userWord) {
			const userWordSources = userWord.mySources

			const userWordSourceIds = new Set(userWordSources.map((s) => s.id))
			const newWordSources = word.userSources.filter(
				(source) => !userWordSourceIds.has(source.id)
			)

			if (newWordSources.length === 0) {
				throw new ApiError(
					409,
					`All given sources have already been added`,
					ErrorCodes.RECORD_ALREADY_EXISTS
				)
			}

			const updatedUserWord = await this.wordRepository.updateUserWordSources(
				userId,
				word.text,
				[...userWordSources, ...newWordSources]
			)

			return updatedUserWord
		}

		const newUserWord = await this.wordRepository.createUserWord(
			userId,
			word.text,
			word.userSources
		)

		return newUserWord
	}

	private async saveToWords(word: Word) {
		const wordDb = await this.wordRepository.findWord(word.text)

		if (wordDb) {
			this.tryIncrementTranslateCount(word.text)

			const wordDbSourceIds = new Set(wordDb.sources.map((s) => s.id))
			const newWordSources = word.userSources.filter(
				(source) => !wordDbSourceIds.has(source.id)
			)

			if (newWordSources.length === 0) return

			const updatedWord = await this.wordRepository.updateWordSources(
				word.text,
				[...wordDb.sources, ...newWordSources]
			)

			return updatedWord
		}

		const translation = await this.translateWord(word.text)

		const newWord = await this.wordRepository.createWord(
			word.text,
			word.id,
			translation,
			word.isJoined,
			word.userSources
		)

		return newWord
	}

	async saveWord(userId: string, word: Word) {
		await this.saveToWords(word)

		const userWord = await this.saveToUserWords(userId, word)

		return userWord
	}

	private mapUserWordToWord(
		userWord: Awaited<
			ReturnType<typeof this.wordRepository.findUserWordsByUserId>
		>[number]
	): SavedWord {
		return {
			id: userWord.word.id,
			text: userWord.word.text,
			translation: userWord.word.translation,
			translationCount: userWord.word.translationCount,
			userSources: userWord.mySources,
			isLearned: userWord.isLearned,
			isFavorite: userWord.isFavorite,
			isJoined: userWord.word.isJoined
		}
	}

	async getWordsByUserId(userId: string) {
		const userWords = await this.wordRepository.findUserWordsByUserId(userId)
		return userWords.map(this.mapUserWordToWord.bind(this))
	}

	async tryIncrementTranslateCount(wordText: string) {
		await this.wordRepository.tryIncrementTranslateCount(wordText)
	}

	async getMostTranslatableWords() {
		return this.wordRepository.getMostTranslatableWords()
	}
}
