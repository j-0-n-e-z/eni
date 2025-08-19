export interface BaseKinoposikMovie {
	filmId: number
	posterUrlPreview: string
	year: string
	nameRu: string | null
	nameEn: string | null
	type: FilmType
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
	currentCode: string
	name: string
	symbol: string
}

export interface BoxOffice {
	total: number
	items: Budget[]
}

export interface MovieSubtitle {
	id: number
	tmdb_id: number
	imdb_id: number
	release_year: number
	download_count: number
	upload_date: string
	uploader: string
	title: string
	opensubtitles: {
		current_url: string
		all_url: string
	}
	img_url: string
	subtitles: {
		rating: number
		file_id: number
	}
}

export interface PureSubtitle {
	timecode: string
	text: string
}

export interface Subtitle extends PureSubtitle {
	fileId: number // to load subtitles
	movieId: number // to load movie info
	page: number // to go to page
}

export interface WordResponse {
	id: string
	fileId: number
	page: number
	subtitleTimecode: string
	subtitleWordIndex: number
	movieId: number
	isLearned: boolean
	isFavorite: boolean
	word: {
		id: number
		text: string
	}
}

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
}

export interface User {
	id: string
	email: string
	isEmailConfirmed: boolean
	username: string
}

export interface LoginRequest {
	email: string
	password: string
}

export interface SignupRequest {
	email: string
	password: string
	username: string
}

export class ApiError extends Error {
	constructor(
		public readonly statusCode: number,
		public readonly message: string,
		public readonly field?: string
	) {
		super(message)
	}
}

export interface YandexDictionaryResponse {
	head: Record<string, never>
	def: Definition[]
	nmt_code: number
	code: number
}

interface Definition {
	text: string
	pos: string
	ts?: string
	tr: Translation[]
}

interface Translation {
	text: string
	pos: string
	gen?: string
	asp?: string
	fr?: number
	syn?: Synonym[]
	mean?: Meaning[]
}

interface Synonym {
	text: string
	pos?: string
	gen?: string
	fr?: number
}

interface Meaning {
	text: string
}

export interface YandexTranslation {
	text: string
	detectedLanguageCode: string
}

export interface YandexDefinition {
	pos: string
	tr: string
}
