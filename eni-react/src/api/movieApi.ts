import type { BoxOffice, KinopoiskMovie, KinopoiskSearchMovie } from '@/types'

import { api } from './api'

export const movieApi = api.injectEndpoints({
	endpoints: (build) => ({
		searchMovies: build.query<KinopoiskSearchMovie[], string>({
			query: (keyword) => ({
				url: 'movies',
				params: { keyword }
			}),
			providesTags: ['Movie']
		}),
		getMovieById: build.query<KinopoiskMovie, number>({
			query: (id) => `movies/${id}`,
			providesTags: ['Movie']
		}),
		getMovieBoxOfficeById: build.query<BoxOffice, number>({
			query: (id) => `movies/${id}/box_office`
		})
	})
})

export const {
	useSearchMoviesQuery,
	useGetMovieByIdQuery,
	useLazySearchMoviesQuery,
	useGetMovieBoxOfficeByIdQuery
} = movieApi
