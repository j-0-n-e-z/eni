import type { AxiosRequestConfig } from 'axios'

import type { UserDto } from '@/dtos'
import type {
	MovieSubtitle,
	PureSubtitle,
	SavedWord,
	Word,
	WordSource
} from '@/shared-types'
import type {
	WordDb as DbWord,
	SearchMoviesParams,
	Translation,
	UserWordDb
} from '@/types'

export interface IMovieService {
	searchMovies(
		params: SearchMoviesParams,
		config?: AxiosRequestConfig
	): Promise<unknown>
	getMovieById(id: number): Promise<unknown>
	getMovieBoxOfficeById(id: number): Promise<unknown>
}

export interface IUserService {
	getUserByUsername(username: string): Promise<UserDto>
	getUsers(): Promise<UserDto[]>
	getMe(refreshToken: string): Promise<UserDto>
	deleteUser(userId: string): Promise<void>
	signup(username: string, email: string, hashedPassword: string): Promise<void>
	login(
		email: string,
		password: string
	): Promise<{ user: UserDto; accessToken: string; refreshToken: string }>
	logout(refreshToken: string): Promise<void>
	refresh(
		refreshToken: string
	): Promise<{ user: UserDto; newAccessToken: string; newRefreshToken: string }>
	confirmEmail(emailConfirmationLink: string): Promise<void>
}

export interface IMailService {
	sendConfirmationEmail(to: string, link: string): Promise<unknown>
	sendEmail(to: string, subject: string, html: string): Promise<unknown>
}

export interface ITokenService {
	invalidateRefreshToken(refreshToken: string): Promise<void>
	saveRefreshToken(userId: string, refreshToken: string): Promise<void>
}

export interface ISubtitleService {
	findMovieSubtitles(query: string): Promise<MovieSubtitle[]>
	getSubtitlesByFileId(fileId: number): Promise<PureSubtitle[]>
}

export interface ITranslateService {
	findDefinition(text: string): Promise<string>
	translate(text: string): Promise<Translation[]>
}

export interface IWordService {
	deleteUserWord(userId: string, wordText: string): Promise<void>
	deleteUserWordSource(
		userId: string,
		wordText: string,
		wordSource: WordSource
	): Promise<void>
	translateWord(wordText: string): Promise<string>
	getMoreWordSources(wordText: string): Promise<WordSource[] | null>
	saveWord(userId: string, word: Word): Promise<UserWordDb>
	getWordsByUserId(userId: string): Promise<SavedWord[]>
	tryIncrementTranslateCount(wordText: string): Promise<void>
	getMostTranslatableWords(): Promise<DbWord[]>
}
