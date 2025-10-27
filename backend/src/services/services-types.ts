import type { AxiosRequestConfig } from 'axios'

import type { MovieSubtitle, PureSubtitle, Word, WordSource } from '@/shared-types'
import type { SearchMoviesParams, Translation, UserWord } from '@/types'

export interface IMovieService {
	searchMovies(
		params: SearchMoviesParams,
		config?: AxiosRequestConfig
	): Promise<unknown>
	getMovieById(id: number): Promise<unknown>
	getMovieBoxOfficeById(id: number): Promise<unknown>
}

export interface IUserService<TUser> {
	getUserByUsername(username: string): Promise<TUser>
	getUsers(): Promise<TUser[]>
	getMe(refreshToken: string): Promise<TUser>
	deleteUser(userId: string): Promise<void>
	signup(username: string, email: string, hashedPassword: string): Promise<void>
	login(
		email: string,
		password: string
	): Promise<{ user: TUser; accessToken: string; refreshToken: string }>
	logout(refreshToken: string): Promise<void>
	refresh(
		refreshToken: string
	): Promise<{ user: TUser; newAccessToken: string; newRefreshToken: string }>
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
	saveWord(userId: string, word: Word): Promise<UserWord>
	getWordsByUserId(userId: string): Promise<Word[]>
}
