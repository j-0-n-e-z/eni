/* eslint-disable @typescript-eslint/no-explicit-any */
import type { WordSource } from '@/types'

export interface MovieSubtitlesContext {
	goToMovieSubtitles: (kinopoiskId: number, subtitlesFileId: number) => void
	imdbId: string | null
	movieName: string
	movieKinopoiskId: number
	posterUrl: string
}

export type SubtitleSource = Omit<WordSource, 'subtitleWordIndex' | 'id'>

export interface BackendError {
	data?: {
		error: {
			statusCode: number
			code: string
			message: string
			details?: any
		}
	}
	status: number
}
