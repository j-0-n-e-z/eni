import type {  WordSource } from '@/shared-types'
import type { UserWord, Word } from '@/types'

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

export interface IUserRepository<TUser> {
	findByUsername(username: string): Promise<TUser | null>
	findByEmail(email: string): Promise<TUser | null>
	findById(id: string): Promise<TUser | null>
	findByRefreshToken(refreshToken: string): Promise<TUser | null>
	findByEmailConfirmationLink(link: string): Promise<TUser | null>
	create(userData: CreateUserData): Promise<TUser>
	update(id: string, data: UpdateUserData): Promise<TUser>
	delete(id: string): Promise<void>
	findAll(): Promise<TUser[]>
}

export interface ITokenRepository {
	findToken(refreshToken: string): Promise<{ userId: string } | null>
	invalidateToken(userId: string): Promise<void>
	updateToken(userId: string, refreshToken: string): Promise<void>
}

export interface IWordsRepository {
	findUserWord(userId: string, wordText: string): Promise<UserWord | null>
	createUserWord(
		userId: string,
		wordText: string,
		sources: WordSource[]
	): Promise<UserWord>
	updateWordSources(
		userId: string,
		wordText: string,
		newSources: WordSource[]
	): Promise<UserWord>
	deleteUserWord(userId: string, wordText: string): Promise<void>
	findUserWordsByUserId(userId: string): Promise<
		(UserWord & {
			word: Word
		})[]
	>

	createWord(
		wordText: string,
		wordId: string,
		translation: string,
		isJoined: boolean,
		sources: WordSource[]
	): Promise<Word>
	updateWord(wordText: string, sources: WordSource[]): Promise<Word>
	findWord(wordText: string): Promise<Word | null>
}
