export interface Word {
	id: string
	text: string
	mySources: WordSource[]
	sources?: WordSource[]
	isLearned: boolean
	isFavorite: boolean
	isJoined: boolean
	translation?: string
}

export interface WordSource {
	id: string
	movieName: string
	posterUrl: string
	movieId: number
	fileId: number
	page: number
	subtitleTimecode: string
	subtitleWordIndex: number
}

export type TranslatedWord = Word & Required<Pick<Word, 'translation'>>
