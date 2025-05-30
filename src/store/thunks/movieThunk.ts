import { createAsyncThunk } from '@reduxjs/toolkit'

import type { ApiError } from '@/api'
import { movies } from '@/api'
import type { RootState } from '@/app'
import type { Movie } from '@/types'

export const fetchMovie = createAsyncThunk<
	Movie,
	number,
	{ state: RootState; rejectValue: ApiError }
>('movie/fetch', async (id, thunkApi) => {
	try {
		let movie: Movie

		const movieFromStore = thunkApi
			.getState()
			.moviesReducer.movies?.find((movie) => movie.id === id)

		if (movieFromStore) {
			movie = movieFromStore
		} else {
			movie = await movies.fetchMovieById(id)
		}

		return movie
	} catch (e) {
		return thunkApi.rejectWithValue(e as ApiError)
	}
})
