import { createAsyncThunk } from '@reduxjs/toolkit'

import type { ApiError } from '@/api'
import { movies } from '@/api'
import type { Movie } from '@/types'

export const fetchMovies = createAsyncThunk<
	Movie[],
	string,
	{ rejectValue: ApiError }
>('movies/fetch', async (movieTitle, thunkApi) => {
	try {
		return await movies.searchMovies(movieTitle)
	} catch (e) {
		return thunkApi.rejectWithValue(e as ApiError)
	}
})
