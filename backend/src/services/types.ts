import type { AxiosRequestConfig } from 'axios'

import type { SearchMoviesParams } from '@/types'

export interface IMovieService {
	searchMovies(params: SearchMoviesParams, config?: AxiosRequestConfig): unknown
	getMovieById(id: number): unknown
	getMovieBoxOfficeById(id: number): unknown
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
	sendConfirmationEmail(to: string, link: string): unknown
	sendEmail(to: string, subject: string, html: string): unknown
}

export interface ITokenService {
	invalidateRefreshToken(refreshToken: string): Promise<void>
	saveRefreshToken(userId: string, refreshToken: string): Promise<void>
}
