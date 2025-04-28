import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/app'
import { fetchMovie } from '@/thunks'
import type { Movie, TMDBMovie } from '@/types'

interface MovieState {
	movie: Movie | null
	tmdbMovie: TMDBMovie | null
	status: 'idle' | 'pending' | 'rejected'
	error: string | null
}

const initialState: MovieState = {
	movie: null,
	tmdbMovie: null,
	status: 'idle',
	error: null
}

const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		clearMovie: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMovie.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(fetchMovie.rejected, (state, action) => {
			state.status = 'rejected'
			state.movie = null
			state.tmdbMovie = null

			if (action.payload?.status === 404) {
				state.error = 'No movie found'
			} else if (action.payload?.status === 400) {
				state.error = 'Bad request'
			} else {
				state.error = action.payload?.message || 'Failed to load movie'
			}
		})
		builder.addCase(fetchMovie.fulfilled, (state, action) => {
			state.status = 'idle'
			state.movie = action.payload.movie
			state.tmdbMovie = action.payload.tmdbMovie
			state.error = null
		})
	}
})

export const selectMovie = (state: RootState) => state.movieReducer

export const { clearMovie } = movieSlice.actions

export const movieReducer = movieSlice.reducer
