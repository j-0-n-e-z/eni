import { Container } from 'inversify'
import type nodemailer from 'nodemailer'

import { MovieController, UserController } from '@/controllers'
import type { UserDto } from '@/dtos'
import type { ITokenRepository, IUserRepository } from '@/repositories'
import { PrismaTokenRepository, PrismaUserRepository } from '@/repositories'
import type {
	IMailService,
	IMovieService,
	ITokenService,
	IUserService
} from '@/services'
import {
	KinopoiskMovieService,
	MailService,
	TokenService,
	UserService
} from '@/services'
import { JwtService } from '@/services/jwt.service'
import type { User } from '@/shared-types'
import { gmailTransporter } from '@/utils'

import { TYPES } from './types'

const container = new Container()

container
	.bind<IUserRepository<User>>(TYPES.IUserRepository)
	.to(PrismaUserRepository)
container
	.bind<ITokenRepository>(TYPES.ITokenRepository)
	.to(PrismaTokenRepository)
	
container.bind<IMovieService>(TYPES.IMovieService).to(KinopoiskMovieService)
container.bind<IUserService<UserDto>>(TYPES.IUserService).to(UserService)
container.bind<ITokenService>(TYPES.ITokenService).to(TokenService)
container.bind<IMailService>(TYPES.IMailService).to(MailService)
container.bind<JwtService>(TYPES.JwtService).to(JwtService)

container
	.bind<nodemailer.Transporter>(TYPES.ITransporter)
	.toConstantValue(gmailTransporter)

container.bind<MovieController>(TYPES.MovieController).to(MovieController)
container.bind<UserController>(TYPES.UserController).to(UserController)

export { container }
