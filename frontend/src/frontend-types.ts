/* eslint-disable @typescript-eslint/no-explicit-any */
import type { WordSource } from '@/types'

export interface MovieContext {
	goToSubtitles: (kinopoiskId: number, subtitlesFileId: number) => void
	imdbId: string | null
	title: string
	kinopoiskId: number
	posterUrl: string
}

export type SubtitleSource = Omit<WordSource, 'subtitleWordIndex' | 'id'>

export interface BackendError {
	data?: {
		error: {
			statusCode: number
			code: string
			message: string
			details?: { field: 'email' | 'password' }
		}
	}
	status: number
}
