export interface WordSource {
	id: string
	movieName: string
	posterUrl: string
	sentence: string
	movieId: number
	fileId: number
	page: number
	subtitleTimecode: string
	subtitleWordIndex: number
}

export interface Word {
	userId: string
	id: string
	text: string
	userSources: WordSource[]
	isLearned: boolean
	isFavorite: boolean
	isJoined: boolean
}

export interface SavedWord extends Omit<Word, 'userId'> {
	translation: string
	translationCount: number
}
