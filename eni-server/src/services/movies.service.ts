import { openSubtitlesApi } from '../api/openSubtitlesApi'
import { tmdbApi } from '../api/tmdbApi'
import type { FullTMDBMovie, Movie, OSMovie, TMDBMovie } from '../types'

const OPENSUBTITLES_PARAMS = {
	type: 'movie',
	languages: 'en',
	order_by: 'points' // no idea what points are, but looks like users' likes on the subs
}

export class MovieService {
	async searchMovies(queryParams: Record<string, string>) {
		const params = { ...queryParams, ...OPENSUBTITLES_PARAMS }
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

	async findTMDBMovieById(tmdbId: number) {
		const response = await tmdbApi.get<FullTMDBMovie>(`/${tmdbId}`)
		return this.mapFullTMDBMovieToTMDBMovie(response.data)
	}

	mapFullTMDBMovieToTMDBMovie(fullTMDBMovie: FullTMDBMovie): TMDBMovie {
		return {
			genres: fullTMDBMovie.genres.map((genre) => genre.name),
			production_companies: fullTMDBMovie.production_companies.map(
				(company) => company.name
			),
			production_countries: fullTMDBMovie.production_countries.map(
				(country) => country.name
			),
			homepage: fullTMDBMovie.homepage,
			budget: fullTMDBMovie.budget,
			original_title: fullTMDBMovie.original_title,
			origin_countries: fullTMDBMovie.origin_country,
			overview: fullTMDBMovie.overview,
			runtime: fullTMDBMovie.runtime,
			tagline: fullTMDBMovie.tagline,
			title: fullTMDBMovie.title,
			release_date: fullTMDBMovie.release_date,
			status: fullTMDBMovie.status,
			vote_average: fullTMDBMovie.vote_average,
			imdb_id: fullTMDBMovie.imdb_id
		}
	}

	mapOSMovieToMovie(OSMovie: OSMovie): Movie {
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
