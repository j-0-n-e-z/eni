declare module 'express' {
	interface Request {
		user?: JwtPayload
	}
}

export interface JwtPayload extends jwt.JwtPayload {
	id: string
	email: string
}

export interface Subtitle {
	id: number
	timecode: string
	text: string
}

export interface OSSubtitle {
	link: string
	file_name: string
}

export interface OSMovieSubtitle {
	id: string
	type: string
	attributes: {
		subtitle_id: string
		language: string
		download_count: number
		new_download_count: number
		hearing_impaired: boolean
		hd: boolean
		fps: number
		votes: number
		ratings: number
		from_trusted: boolean
		foreign_parts_only: boolean
		upload_date: string
		ai_translated: boolean
		nb_cd: number
		slug: string
		machine_translated: boolean
		release: string
		comments: string
		legacy_subtitle_id: number
		legacy_uploader_id: number
		uploader: {
			uploader_id: number
			name: string
			rank: string
		}
		feature_details: {
			feature_id: number
			feature_type: string
			year: number
			title: string
			movie_name: string
			imdb_id: number
			tmdb_id: number
		}
		url: string
		related_links: {
			label: string
			url: string
			img_url: string
		}[]
		files: {
			file_id: number
			cd_number: number
			file_name: string
		}[]
	}
}

export interface MovieSubtitle {
	upload_date: string
	id: string
	tmdb_id: number
	imdb_id: number
	release_year: number
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

export interface KinopoiskSearchResponse {
	films: KinopoiskSearchMovie[]
	pagesCount: number
	searchFilmsCountResult: number
}

export interface KinopoiskSearchMovie {
	filmId: number
	nameRu: string | null
	nameEn: string | null
	type: FilmType
	year: string
	description?: string
	filmLength: string
	countries: { country: string }[]
	genres: { genre: string }[]
	rating: string | null
	ratingVoteCount: number
	posterUrl: string
	posterUrlPreview: string
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

export interface SubtitlesInfo {
	link: string
	file_name: string
}

export interface DictionaryResponse {
	head: Record<string, never>
	def: Definition[]
	nmt_code: number
	code: number
}

interface Definition {
	text: string
	pos: string // Part of Speech (можно уточнить как union тип)
	ts?: string // Транскрипция (может отсутствовать)
	tr: Translation[]
}

interface Translation {
	text: string
	pos: string
	gen?: string // Род (для существительных)
	asp?: string // Вид глагола (совершенный/несовершенный)
	fr?: number // Частота использования
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
