import type { BoxOffice, KinopoiskMovie, KinopoiskSearchMovie } from '@/types'

import { api } from './api'

export const movieApi = api.injectEndpoints({
	endpoints: (build) => ({
		searchMovies: build.query<KinopoiskSearchMovie[], string>({
			query: (keyword) => ({
				url: 'movies',
				params: { keyword }
			}),
		}),
		getMovieByKinopoiskId: build.query<KinopoiskMovie, number>({
			query: (id) => `movies/${id}`
		}),
		getMovieBoxOfficeByKinopoiskId: build.query<BoxOffice, number>({
			query: (id) => `movies/${id}/box_office`
		})
	})
})

export const {
	useSearchMoviesQuery,
	useGetMovieByKinopoiskIdQuery,
	useLazySearchMoviesQuery,
	useGetMovieBoxOfficeByKinopoiskIdQuery
} = movieApi
