import type { RootState } from '@/app'
import type { Movie, TMDBMovie } from '@/types'

import { api } from './api'

export const movieApi = api.injectEndpoints({
	endpoints: (build) => ({
		searchMovies: build.query<Movie[], string>({
			query: (query) => ({
				url: '/movies',
				params: { query }
			}),
			providesTags: ['Movie']
		}),
		getMovieById: build.query<Movie, number>({
			query: (id) => `/movies/${id}`,
			providesTags: ['Movie'],
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
			query: (tmdbId) => `/movies/tmdb/${tmdbId}`,
			providesTags: ['TMDBMovie']
		})
	})
})

export const {
	useSearchMoviesQuery,
	useGetMovieByIdQuery,
	useGetTMDBMovieByIdQuery,
	useLazySearchMoviesQuery
} = movieApi
