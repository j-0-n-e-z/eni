export interface Movie {
	upload_date: string
	id: number
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

export interface TMDBMovie {
	genres: string[]
	production_companies: string[]
	production_countries: string[]
	homepage: string
	budget: number
	original_title: string
	origin_countries: string[]
	overview: string
	runtime: number
	tagline: string
	title: string
	release_date: string
	status: string
	vote_average: number
	imdb_id: string
}

export interface Subtitle {
	id: number
	timecode: string
	text: string
	movieId: number
}

export interface Word {
	id: string
	text: string
	from: {
		movieId: number
		subtitleId: number
	}
	isLearned: boolean
	isRepeating: boolean
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
