export interface Movie {
	rating: number
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
	subtitles_file_id: number
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
}

export interface Subtitle {
	index: number
	timecode: string
	text: string
}
