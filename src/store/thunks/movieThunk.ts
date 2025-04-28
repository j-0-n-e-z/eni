import { createAsyncThunk } from '@reduxjs/toolkit'

import type { ApiError } from '@/api'
import { movies, tmdb } from '@/api'
import type { RootState } from '@/app/store'
import type { Movie, TMDBMovie } from '@/types'

export const fetchMovie = createAsyncThunk<
	{ movie: Movie; tmdbMovie: TMDBMovie | null },
	number,
	{ state: RootState; rejectValue: ApiError }
>('movie/fetch', async (id, thunkApi) => {
	try {
		let movie = thunkApi
			.getState()
			.moviesReducer.movies?.find((m) => m.id === id)
		if (!movie) {
			movie = await movies.fetchMovieById(id)
		}

		let tmdbMovie: TMDBMovie | null = null
		try {
			tmdbMovie = await tmdb.fetchTMDBMovieById(movie.tmdb_id)
		} catch (e) {
			// tmdb movie is not important, ignore
			console.log(e)
		}

		return { movie, tmdbMovie }
	} catch (e) {
		return thunkApi.rejectWithValue(e as ApiError)
	}
})
