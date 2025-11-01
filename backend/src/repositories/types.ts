import type { User, WordSource } from '@/shared-types'
import type { UserWordDb, WordDb } from '@/types'

export type CreateUserData = {
	username: string
	email: string
	password: string
	emailConfirmationLink: string
}

export type UpdateUserData = {
	isEmailConfirmed?: boolean
	emailConfirmationLink?: string | null
}

export interface IUserRepository {
	findByUsername(username: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	findById(id: string): Promise<User | null>
	findByRefreshToken(refreshToken: string): Promise<User | null>
	findByEmailConfirmationLink(link: string): Promise<User | null>
	create(userData: CreateUserData): Promise<User>
	update(id: string, data: UpdateUserData): Promise<User>
	delete(id: string): Promise<void>
	findAll(): Promise<User[]>
}

export interface ITokenRepository {
	findToken(refreshToken: string): Promise<{ userId: string } | null>
	invalidateToken(userId: string): Promise<void>
	updateToken(userId: string, refreshToken: string): Promise<void>
}

export interface IWordsRepository {
	findUserWord(userId: string, wordText: string): Promise<UserWordDb | null>
	createUserWord(
		userId: string,
		wordText: string,
		sources: WordSource[]
	): Promise<UserWordDb>
	updateUserWordSources(
		userId: string,
		wordText: string,
		newSources: WordSource[]
	): Promise<UserWordDb>
	deleteUserWord(userId: string, wordText: string): Promise<void>
	findUserWordsByUserId(userId: string): Promise<
		(UserWordDb & {
			word: WordDb
		})[]
	>

	createWord(
		wordText: string,
		wordId: string,
		translation: string,
		isJoined: boolean,
		sources: WordSource[]
	): Promise<WordDb>
	updateWordSources(wordText: string, sources: WordSource[]): Promise<WordDb>
	findWord(wordText: string): Promise<WordDb | null>

	tryIncrementTranslateCount(wordText: string): Promise<void>
	getMostTranslatableWords(): Promise<WordDb[]>
}
