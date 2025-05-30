import { createAsyncThunk } from '@reduxjs/toolkit'

import type { ApiError } from '@/api'
import { movies } from '@/api'
import type { TMDBMovie } from '@/types'

export const fetchTMDBMovie = createAsyncThunk<
	TMDBMovie,
	number,
	{ rejectValue: ApiError }
>('tmdbMovie/fetch', async (tmdbId, thunkApi) => {
	try {
		return await movies.fetchTMDBMovieById(tmdbId)
	} catch (e) {
		return thunkApi.rejectWithValue(e as ApiError)
	}
})
