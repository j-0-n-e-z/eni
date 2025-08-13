import { kinopoiskApiV2_1, kinopoiskApiV2_2 } from '../api/kinopoiskApi'
import { openSubtitlesApi } from '../api/openSubtitlesApi'
import type {
	BoxOffice,
	KinopoiskMovie,
	KinopoiskSearchResponse,
	Movie,
	OSMovie
} from '../types'

const OPENSUBTITLES_PARAMS = {
	type: 'movie',
	languages: 'en',
	order_by: 'points' // no idea what points are, but looks like users' likes on the subs
}

export class MovieService {
	async searchKinopoiskMovies(queryParams: Record<string, string>) {
		const params = { ...queryParams }

		const response = await kinopoiskApiV2_1.get<KinopoiskSearchResponse>(
			`/search-by-keyword`,
			{ params }
		)

		return response.data.films
	}

	async findOpenSubtitlesMoviesByImdbId(imdbId: string) {
		const params = { imdb_id: imdbId, ...OPENSUBTITLES_PARAMS }

		const response = await openSubtitlesApi.get<{ data: OSMovie[] }>(
			`/subtitles`,
			{ params }
		)

		// movies are already sorted by users' likes on the subs
		const uniqueMovies = new Map<string, OSMovie>()
		for (const OSMovie of response.data.data) {
			const { title } = OSMovie.attributes.feature_details
			if (!uniqueMovies.has(title)) {
				uniqueMovies.set(title, OSMovie)
			}
		}

		return [...uniqueMovies.values()]
			.map(this.mapOSMovieToMovie)
			.sort((a, b) => a.release_year - b.release_year)
			.sort((a, b) => b.subtitles.rating - a.subtitles.rating)
	}

	async getKinopoiskMovieById(id: number) {
		const response = await kinopoiskApiV2_2.get<KinopoiskMovie>(`/${id}`)
		return response.data
	}

	async getMovieBoxOfficeById(id: number) {
		const response = await kinopoiskApiV2_2.get<BoxOffice>(`/${id}/box_office`)
		return response.data
	}

	private mapOSMovieToMovie(OSMovie: OSMovie): Movie {
		return {
			upload_date: OSMovie.attributes.upload_date,
			id: OSMovie.attributes.feature_details.feature_id,
			tmdb_id: OSMovie.attributes.feature_details.tmdb_id,
			imdb_id: OSMovie.attributes.feature_details.imdb_id,
			release_year: OSMovie.attributes.feature_details.year,
			title: OSMovie.attributes.feature_details.title,
			opensubtitles: {
				current_url: OSMovie.attributes.url,
				all_url: OSMovie.attributes.related_links[0].url
			},
			img_url: OSMovie.attributes.related_links[0].img_url,
			subtitles: {
				rating: OSMovie.attributes.ratings,
				file_id: OSMovie.attributes.files[0].file_id
			}
		}
	}
}
