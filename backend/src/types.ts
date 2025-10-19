import type { KinopoiskSearchMovie } from '@/shared-types'

export interface PureSubtitle {
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

export interface KinopoiskSearchResponse {
	films: KinopoiskSearchMovie[]
	pagesCount: number
	searchFilmsCountResult: number
}

export interface SubtitlesInfo {
	link: string
	file_name: string
}

export interface YandexDictionaryResponse {
	head: Record<string, never>
	def: Definition[]
	nmt_code: number
	code: number
}

export interface Definition {
	text: string
	pos: string // Part of Speech
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

export interface YandexTranslateResponse {
	translations: Translation[]
}

interface Translation {
	text: string
	detectedLanguageCode: string
}

export type ApiServiceName =
	| 'Kinopoisk'
	| 'OpenSubtitles'
	| 'Yandex.Translate'
	| 'Yandex.Dictionary'

export interface SearchMoviesParams {
	keyword: string
}
