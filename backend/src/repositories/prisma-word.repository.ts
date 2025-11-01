import type { WordSource } from '@/shared-types'
import { prisma } from '@/utils'

import type { IWordsRepository } from './types'

export class PrismaWordsRepository implements IWordsRepository {
	prisma = prisma

	async findUserWord(userId: string, wordText: string) {
		const userword = await this.prisma.userWord.findUnique({
			where: { userId_text: { userId, text: wordText } }
		})

		if (!userword) return null

		return {
			...userword,
			mySources: JSON.parse(userword.mySources as string) as WordSource[]
		}
	}

	async deleteUserWord(userId: string, wordText: string) {
		await this.prisma.userWord.delete({
			where: { userId_text: { userId, text: wordText } }
		})
	}

	async updateUserWordSources(
		userId: string,
		wordText: string,
		newSources: WordSource[]
	) {
		const updatedUserWord = await this.prisma.userWord.update({
			where: { userId_text: { userId, text: wordText } },
			data: {
				mySources: JSON.stringify(newSources)
			}
		})

		return {
			...updatedUserWord,
			mySources: JSON.parse(updatedUserWord.mySources as string) as WordSource[]
		}
	}

	async createUserWord(
		userId: string,
		wordText: string,
		sources: WordSource[]
	) {
		const newUserWord = await this.prisma.userWord.create({
			data: {
				userId,
				text: wordText,
				mySources: JSON.stringify(sources),
				isFavorite: false,
				isLearned: false
			}
		})

		return {
			...newUserWord,
			mySources: JSON.parse(newUserWord.mySources as string) as WordSource[]
		}
	}

	async findUserWordsByUserId(userId: string) {
		const userWords = await this.prisma.userWord.findMany({
			where: { userId },
			select: {
				userId: true,
				text: true,
				isFavorite: true,
				isLearned: true,
				word: true,
				mySources: true
			}
		})

		return userWords.map((userWord) => ({
			...userWord,
			mySources: JSON.parse(userWord.mySources as string) as WordSource[],
			word: {
				...userWord.word,
				sources: JSON.parse(userWord.word.sources as string) as WordSource[]
			}
		}))
	}

	async findWord(wordText: string) {
		const word = await this.prisma.word.findUnique({
			where: { text: wordText }
		})

		if (!word) return null

		return {
			...word,
			sources: JSON.parse(word.sources as string) as WordSource[]
		}
	}

	async updateWordSources(wordText: string, sources: WordSource[]) {
		const updatedWord = await this.prisma.word.update({
			where: { text: wordText },
			data: {
				sources: JSON.stringify(sources)
			}
		})

		return {
			...updatedWord,
			sources: JSON.parse(updatedWord.sources as string) as WordSource[]
		}
	}

	async createWord(
		wordText: string,
		wordId: string,
		translation: string,
		isJoined: boolean,
		sources: WordSource[]
	) {
		const newWord = await this.prisma.word.create({
			data: {
				translation,
				text: wordText,
				id: wordId,
				isJoined,
				sources: JSON.stringify(sources),
				translationCount: 1
			}
		})

		return {
			...newWord,
			sources: JSON.parse(newWord.sources as string) as WordSource[]
		}
	}

	async tryIncrementTranslateCount(wordText: string) {
		const word = await this.prisma.word.findUnique({
			where: { text: wordText }
		})

		if (word) {
			await this.prisma.word.update({
				where: { text: word.text },
				data: { translationCount: { increment: 1 } }
			})
		}
	}

	async getMostTranslatableWords() {
		const words = await this.prisma.word.findMany({
			orderBy: { translationCount: 'desc' },
			take: 10
		})

		return words.map((word) => ({
			...word,
			sources: JSON.parse(word.sources as string) as WordSource[]
		}))
	}
}
