import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/app'
import { fetchTMDBMovie } from '@/thunks'
import type { TMDBMovie } from '@/types'

interface TMDBMovieState {
	tmdbMovie: TMDBMovie | null
	status: 'idle' | 'pending' | 'rejected'
	error: string | null
}

const initialState: TMDBMovieState = {
	tmdbMovie: null,
	status: 'idle',
	error: null
}

const tmdbMovieSlice = createSlice({
	name: 'tmdbMovie',
	initialState,
	reducers: {
		clearTMDBMovie: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTMDBMovie.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchTMDBMovie.rejected, (state, action) => {
				state.status = 'rejected'
				state.tmdbMovie = null
				// TODO: set good error codes and error messages
				if (action.payload?.status === 404) {
					state.error = 'No movie found'
				} else if (action.payload?.status === 400) {
					state.error = 'Failed to load TMDB data'
				} else {
					state.error = action.payload?.message || 'Failed to load movie'
				}
			})
			.addCase(fetchTMDBMovie.fulfilled, (state, action) => {
				state.status = 'idle'
				state.tmdbMovie = action.payload
				state.error = null
			})
	}
})

export const selectTMDBMovie = (state: RootState) => state.tmdbMovieReducer

export const { clearTMDBMovie } = tmdbMovieSlice.actions

export const tmdbMovieReducer = tmdbMovieSlice.reducer
