import { Container } from 'inversify'
import type nodemailer from 'nodemailer'

import {
	AuthController,
	MovieController,
	SubtitleController,
	TranslateController,
	UserController,
	WordController
} from '@/controllers'
import type {
	ITokenRepository,
	IUserRepository,
	IWordsRepository
} from '@/repositories'
import { PrismaTokenRepository, PrismaUserRepository } from '@/repositories'
import { PrismaWordsRepository } from '@/repositories/prisma-word.repository'
import type {
	IMailService,
	IMovieService,
	ISubtitleService,
	ITokenService,
	ITranslateService,
	IUserService,
	IWordService
} from '@/services'
import {
	KinopoiskMovieService,
	MailService,
	SubtitleService,
	TokenService,
	UserService,
	WordService,
	YandexTranslateService
} from '@/services'
import { JwtService } from '@/services/jwt.service'
import { gmailTransporter } from '@/utils'

import { TYPES } from './types'

const container = new Container()

container.bind<IUserRepository>(TYPES.IUserRepository).to(PrismaUserRepository)
container
	.bind<ITokenRepository>(TYPES.ITokenRepository)
	.to(PrismaTokenRepository)
container
	.bind<IWordsRepository>(TYPES.IWordsRepository)
	.to(PrismaWordsRepository)

container.bind<IMovieService>(TYPES.IMovieService).to(KinopoiskMovieService)
container.bind<IUserService>(TYPES.IUserService).to(UserService)
container.bind<ITokenService>(TYPES.ITokenService).to(TokenService)
container.bind<IMailService>(TYPES.IMailService).to(MailService)
container.bind<IWordService>(TYPES.IWordService).to(WordService)
container.bind<ISubtitleService>(TYPES.ISubtitleService).to(SubtitleService)

container
	.bind<ITranslateService>(TYPES.ITranslateService)
	.to(YandexTranslateService)
container.bind<JwtService>(TYPES.JwtService).to(JwtService)

container
	.bind<nodemailer.Transporter>(TYPES.ITransporter)
	.toConstantValue(gmailTransporter)

container.bind<MovieController>(TYPES.MovieController).to(MovieController)
container.bind<UserController>(TYPES.UserController).to(UserController)
container
	.bind<TranslateController>(TYPES.TranslateController)
	.to(TranslateController)
container.bind<WordController>(TYPES.WordController).to(WordController)
container
	.bind<SubtitleController>(TYPES.SubtitleController)
	.to(SubtitleController)
container.bind<AuthController>(TYPES.AuthController).to(AuthController)

export { container }
