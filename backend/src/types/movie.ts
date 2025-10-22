import type { KinopoiskSearchMovie } from '@/shared-types'

export interface KinopoiskSearchResponse {
	films: KinopoiskSearchMovie[]
	pagesCount: number
	searchFilmsCountResult: number
}

export interface SearchMoviesParams {
	keyword: string
}
