export interface Uploader {
	uploader_id: number
	name: string
	rank: string
}

export interface FeatureDetail {
	feature_id: number
	feature_type: string
	year: number
	title: string
	movie_name: string
	imdb_id: number
	tmdb_id: number
}

export interface RelatedLink {
	label: string
	url: string
	img_url: string
}

export interface File {
	file_id: number
	cd_number: number
	file_name: string
}

export interface Attribute {
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
	file_hashes: string[]
	ai_translated: boolean
	nb_cd: number
	slug: string
	machine_translated: boolean
	release: string
	comments: string
	legacy_subtitle_id: number
	legacy_uploader_id: number
	uploader: Uploader
	feature_details: FeatureDetail
	url: string
	related_links: RelatedLink[]
	files: File[]
}

export interface Subtitle {
	id: string
	type: string
	attributes: Attribute
}

export interface SearchResult {
	total_pages: number
	total_count: number
	per_page: number
	page: number
	data: Subtitle[]
}
