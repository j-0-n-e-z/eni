import type { MovieSubtitle, Word } from '@/types'

export interface MovieSubtitlesContext {
	pickMovieSubtitle: (movieSubtitle: MovieSubtitle) => void
	imdbId: string
	lookupWord?: Word
}
