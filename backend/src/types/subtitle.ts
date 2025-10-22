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

export interface SubtitlesInfo {
	link: string
	file_name: string
}
