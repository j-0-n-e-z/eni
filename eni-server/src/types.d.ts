import { JwtPayload } from './types.d';
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

export interface OSMovie {
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

export interface Movie {
	upload_date: string
	id: number
	tmdb_id: number
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

export interface SubtitlesInfo {
	link: string
	file_name: string
}

export interface FullTMDBMovie {
	adult: boolean
	backdrop_path: string
	belongs_to_collection: BelongsToCollection
	budget: number
	genres: Genre[]
	homepage: string
	id: number
	imdb_id: string
	origin_country: string[]
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: ProductionCompany[]
	production_countries: ProcuctionCountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface BelongsToCollection {
	id: number
	name: string
	poster_path: string
	backdrop_path: string
}

export interface Genre {
	id: number
	name: string
}

export interface ProductionCompany {
	id: number
	logo_path?: any
	name: string
	origin_country: string
}

export interface ProcuctionCountry {
	iso_3166_1: string
	name: string
}

export interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
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