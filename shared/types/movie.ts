export interface BaseKinoposikMovie {
	filmId: number
	posterUrlPreview: string
	year: string
	nameRu: string | null
	nameEn: string | null
	type: FilmType
	ratingKinopoisk: number | null
	ratingImdb: number | null
}

export interface KinopoiskSearchMovie extends BaseKinoposikMovie {
	description?: string
	filmLength: string
	countries: { country: string }[]
	genres: { genre: string }[]
	rating: string | null
	ratingVoteCount: number
	posterUrl: string
}

type FilmType = 'FILM' | 'VIDEO' | 'MINI_SERIES' | 'TV_SERIES' | 'TV_SHOW'
type ProductionStatus =
	| 'POST_PRODUCTION'
	| 'FILMING'
	| 'PRE_PRODUCTION'
	| 'COMPLETED'
	| 'ANNOUNCED'
type MpaaRating = 'g' | 'pg' | 'pg13' | 'r' | 'nc17'
type AgeLimits = 'age0' | 'age6' | 'age12' | 'age16' | 'age18'

export interface KinopoiskMovie {
	kinopoiskId: number
	kinopoiskHDId: string | null
	imdbId: string | null
	nameRu: string | null
	nameEn: string | null
	nameOriginal: string | null
	posterUrl: string
	posterUrlPreview: string
	coverUrl: string | null
	logoUrl: string | null
	reviewsCount: number
	ratingGoodReview: number | null
	ratingGoodReviewVoteCount: number | null
	ratingKinopoisk: number | null
	ratingKinopoiskVoteCount: number
	ratingImdb: number | null
	ratingImdbVoteCount: number
	ratingFilmCritics: number | null
	ratingFilmCriticsVoteCount: number | null
	ratingAwait: number | null
	ratingAwaitCount: number | null
	ratingRfCritics: number | null
	ratingRfCriticsVoteCount: number | null
	webUrl: string
	year: number
	filmLength: number
	slogan: string | null
	description: string | null
	shortDescription: string | null
	editorAnnotation: string | null
	isTicketsAvailable: boolean
	productionStatus: ProductionStatus | null
	type: FilmType
	ratingMpaa: MpaaRating | null
	ratingAgeLimits: AgeLimits | null
	hasImax: boolean
	has3D: boolean
	lastSync: string
	countries: { country: string }[]
	genres: { genre: string }[]
	startYear: number | null
	endYear: number | null
	serial: boolean
	shortFilm: boolean
	completed: boolean
}

interface Budget {
	type: string
	amount: number
	currencyCode: string
	name: string
	symbol: string
}

export interface BoxOffice {
	total: number
	items: Budget[]
}
