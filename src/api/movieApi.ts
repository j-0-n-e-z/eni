import type { RootState } from '@/app'
import type { Movie, TMDBMovie } from '@/types'

import { api } from './api'

export const movieApi = api.injectEndpoints({
	endpoints: (build) => ({
		searchMovies: build.query<Movie[], string>({
			query: (query) => ({
				url: '/api/movies',
				params: { query }
			}),
			providesTags: () => ['Movie']
		}),
		getMovieById: build.query<Movie, number>({
			query: (id) => `/api/movies/${id}`,
			providesTags: (result, error, id) => [{ type: 'Movie', id }],
			onQueryStarted(id, { getState, dispatch }) {
				const cachedMovie = movieApi.endpoints.getMovieById.select(id)(
					getState() as RootState
				)

				if (cachedMovie.data) {
					dispatch(
						movieApi.util.updateQueryData(
							'getMovieById',
							id,
							() => cachedMovie.data
						)
					)
				}
			}
		}),
		getTMDBMovieById: build.query<TMDBMovie, number>({
			query: (tmdbId) => `/api/movies/tmdb/${tmdbId}`,
			providesTags: (result, error, tmdbId) => [{ type: 'TMDBMovie', tmdbId }]
		})
	})
})

export const {
	useSearchMoviesQuery,
	useGetMovieByIdQuery,
	useGetTMDBMovieByIdQuery,
	useLazySearchMoviesQuery
} = movieApi
