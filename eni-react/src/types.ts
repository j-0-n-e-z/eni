import type { MovieSubtitle, Word } from '@/types'

export interface MovieSubtitlesContext {
	pickMovieSubtitle: (movieSubtitle: MovieSubtitle) => void
	imdbId: string | null
	movieName: string | null
}

export interface WordsCombination {
	id: string
	text: string
	words: Word[]
}
