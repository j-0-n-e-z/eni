import type { WordSource } from '@/shared-types'

export interface Word {
	id: string
	text: string
	translation: string
	sources: WordSource[]
	isJoined: boolean
}

export interface UserWord {
	userId: string
	text: string
	mySources: WordSource[]
	isLearned: boolean
	isFavorite: boolean
}
