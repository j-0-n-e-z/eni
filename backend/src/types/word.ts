import type { WordSource } from '@/shared-types'

export interface WordDb {
	id: string
	text: string
	translation: string
	translationCount: number
	sources: WordSource[]
	isJoined: boolean
}

export interface UserWordDb {
	userId: string
	text: string
	mySources: WordSource[]
	isLearned: boolean
	isFavorite: boolean
}
