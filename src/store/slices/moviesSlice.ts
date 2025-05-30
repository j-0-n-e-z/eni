import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/app'
import { fetchMovies } from '@/thunks'
import type { Movie } from '@/types'

export interface MoviesState {
	movies: Movie[] | null
	status: 'idle' | 'pending' | 'rejected'
	error: string | null
}

export const initialState: MoviesState = {
	movies: null,
	status: 'idle',
	error: null
}

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		clearMovies: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.status = 'rejected'
				state.movies = null
				if (action.payload?.status === 404) {
					state.error = 'No movies found'
				} else if (action.payload?.status === 400) {
					state.error = 'Bad request'
				} else {
					state.error = action.payload?.message || 'Failed to load movies'
				}
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.status = 'idle'
				state.movies = action.payload
				state.error = null
			})
	}
})

export const selectMovies = (state: RootState) => state.moviesReducer

export const { clearMovies } = moviesSlice.actions

export const moviesReducer = moviesSlice.reducer
