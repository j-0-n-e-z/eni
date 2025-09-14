import type { MovieSubtitle, WordSource } from '@/types'

export interface MovieSubtitlesContext {
	pickMovieSubtitle: (movieSubtitle: MovieSubtitle) => void
	imdbId: string | null
	movieName: string
	posterUrl: string 
}

export type SubtitleSource = Omit<WordSource, 'subtitleWordIndex' | 'id'>