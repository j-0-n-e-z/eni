import { Prisma, PrismaClient } from '../../prisma/generated/client'
import { PrismaClientKnownRequestError } from '../../prisma/generated/runtime/library'

export { PrismaClient, PrismaClientKnownRequestError }

export type User = Prisma.UserGetPayload<{}>
export type Word = Prisma.WordGetPayload<{}>
export type Source = Prisma.SourceGetPayload<{}>
export type UserWord = Prisma.UserWordGetPayload<{}>

export type UserWordWithWord = Prisma.UserWordGetPayload<{
	include: {
		word: true
	}
}>

export type UserWordWithSources = Prisma.UserWordGetPayload<{
	include: {
		word: true
		sources: true
	}
}>
