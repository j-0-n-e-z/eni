export interface MovieSubtitle {
	id: string
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
	fileId: number
	movieId: number
	page: number
}
