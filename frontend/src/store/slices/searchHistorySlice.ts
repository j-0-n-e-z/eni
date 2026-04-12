import type { HistoryMovie } from '@eni/shared'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { type RootState } from '@/store'

export interface SearchHistoryState {
	historyMovies: HistoryMovie[]
}

const loadHistory = () => {
	try {
		return JSON.parse(
			localStorage.getItem('searchHistory') || '[]'
		) as HistoryMovie[]
	} catch (e) {
		return []
	}
}

const initialState: SearchHistoryState = {
	historyMovies: loadHistory()
}

const searchHistorySlice = createSlice({
	initialState,
	name: 'searchHistory',
	reducers: {
		clearMoviesHistory: (state) => {
			state.historyMovies = []
		},
		removeMovieFromHistory: (state, action: PayloadAction<number>) => {
			state.historyMovies = state.historyMovies.filter(
				(movie) => movie.filmId !== action.payload
			)
		},
		upsertMovieInHistory: (state, action: PayloadAction<HistoryMovie>) => {
			const movieToSave = action.payload

			if (
				!state.historyMovies.find(
					(movie) => movie.filmId === movieToSave.filmId
				)
			) {
				state.historyMovies = [movieToSave, ...state.historyMovies]
				return
			}

			state.historyMovies = [
				movieToSave,
				...state.historyMovies.filter(
					(movie) => movie.filmId !== movieToSave.filmId
				)
			]
		}
	}
})

export const selectMoviesFromHistory = (state: RootState) =>
	state.searchHistoryReducer.historyMovies

export const {
	clearMoviesHistory,
	upsertMovieInHistory,
	removeMovieFromHistory
} = searchHistorySlice.actions

export const searchHistoryReducer = searchHistorySlice.reducer
