import { createApi } from '@reduxjs/toolkit/query/react'

import type { BoxOffice, KinopoiskMovie, KinopoiskSearchMovie } from '@/types'

import { baseQueryWithReauth } from './baseQueries/baseQueryWithReauth'

export const movieApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getMovieBoxOfficeByKinopoiskId: build.query<BoxOffice, number>({
			query: (id) => ({ credentials: 'include', url: `movie/${id}/box_office` })
		}),
		getMovieByKinopoiskId: build.query<KinopoiskMovie, number>({
			query: (id) => ({ credentials: 'include', url: `movie/${id}` })
		}),
		searchMovies: build.query<KinopoiskSearchMovie[], string>({
			query: (keyword) => ({
				credentials: 'include',
				params: { keyword },
				url: 'movies'
			})
		})
	}),
	reducerPath: 'movieApi'
})

export const {
	useSearchMoviesQuery,
	useGetMovieByKinopoiskIdQuery,
	useLazySearchMoviesQuery,
	useGetMovieBoxOfficeByKinopoiskIdQuery
} = movieApi
