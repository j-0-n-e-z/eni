import { Movie } from '../../types'

export function getCompactMovieInfo(movie: Movie) {
	return {
		id: movie.attributes.feature_details.feature_id,
		title: movie.attributes.feature_details.title,
		year: movie.attributes.feature_details.year,
		coverImg: movie.attributes.related_links[0].img_url,
		rating: movie.attributes.ratings,
		downloads: movie.attributes.download_count,
		language: movie.attributes.language,
		allSubs: {
			label: movie.attributes.related_links[0].label,
			url: movie.attributes.related_links[0].url
		},
		uploadDate: movie.attributes.upload_date,
		subtitleUrl: movie.attributes.url,
		subtitleFileId: movie.attributes.files[0].file_id
	}
}
