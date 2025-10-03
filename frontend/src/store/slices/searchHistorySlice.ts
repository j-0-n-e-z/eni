import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { type RootState } from '@/store'
import type { BaseKinoposikMovie } from '@/types'

export interface SearchHistoryState {
	historyMovies: BaseKinoposikMovie[]
}

const loadHistory = () => {
	try {
		return JSON.parse(
			localStorage.getItem('searchHistory') || '[]'
		) as BaseKinoposikMovie[]
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
		clearMovieHistory: (state) => {
			state.historyMovies = []
		},
		removeMovieFromHistory: (state, action: PayloadAction<number>) => {
			state.historyMovies = state.historyMovies.filter(
				(movie) => movie.filmId !== action.payload
			)
		},
		upsertMovieInHistory: (
			state,
			action: PayloadAction<BaseKinoposikMovie>
		) => {
			if (
				!state.historyMovies.find(
					(movie) => movie.filmId === action.payload.filmId
				)
			) {
				state.historyMovies = [action.payload, ...state.historyMovies]
			} else {
				state.historyMovies = [
					action.payload,
					...state.historyMovies.filter(
						(movie) => movie.filmId !== action.payload.filmId
					)
				]
			}
		}
	}
})

export const selectMoviesFromHistory = (state: RootState) =>
	state.searchHistoryReducer.historyMovies

export const {
	clearMovieHistory,
	upsertMovieInHistory,
	removeMovieFromHistory
} = searchHistorySlice.actions

export const searchHistoryReducer = searchHistorySlice.reducer
