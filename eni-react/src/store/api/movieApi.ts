import type { BoxOffice, KinopoiskMovie, KinopoiskSearchMovie } from '@/types'

import { api } from './api'

export const movieApi = api.injectEndpoints({
	endpoints: (build) => ({
		getMovieBoxOfficeByKinopoiskId: build.query<BoxOffice, number>({
			query: (id) => `movie/${id}/box_office`
		}),
		getMovieByKinopoiskId: build.query<KinopoiskMovie, number>({
			query: (id) => `movie/${id}`
		}),
		searchMovies: build.query<KinopoiskSearchMovie[], string>({
			query: (keyword) => ({
				params: { keyword },
				url: 'movies'
			})
		})
	})
})

export const {
	useSearchMoviesQuery,
	useGetMovieByKinopoiskIdQuery,
	useLazySearchMoviesQuery,
	useGetMovieBoxOfficeByKinopoiskIdQuery
} = movieApi
