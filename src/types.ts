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

export interface Subtitle {
	id: number
	timecode: string
	text: string
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
