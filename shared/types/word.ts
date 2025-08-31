export interface Word {
	id: string
	text: string
	from: {
		movieId: number
		fileId: number
		page: number
		subtitleTimecode: string
		subtitleWordIndex: number
	}
	isLearned: boolean
	isFavorite: boolean
	isJoined: boolean
	words?: Word[]
	translation?: string
}
