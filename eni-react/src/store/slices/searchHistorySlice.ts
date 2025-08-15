import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { type RootState } from '@/store'
import type { BaseKinoposikMovie } from '@/types'

export interface SearchHistoryState {
	movies: BaseKinoposikMovie[]
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
	movies: loadHistory()
}

const searchHistorySlice = createSlice({
	name: 'searchHistory',
	initialState,
	reducers: {
		clearMovieHistory: () => initialState,
		addMovieToHistory: (state, action: PayloadAction<BaseKinoposikMovie>) => {
			if (
				!state.movies.find((movie) => movie.filmId === action.payload.filmId)
			) {
				state.movies.push(action.payload)
				localStorage.setItem('searchHistory', JSON.stringify(state.movies))
			}
		},
		removeMovieFromHistory: (state, action: PayloadAction<number>) => {
			state.movies = state.movies.filter(
				(movie) => movie.filmId !== action.payload
			)
			localStorage.setItem('searchHistory', JSON.stringify(state.movies))
		}
	}
})

export const selectMoviesFromHistory = (state: RootState) =>
	state.searchHistoryReducer.movies

export const { clearMovieHistory, addMovieToHistory, removeMovieFromHistory } =
	searchHistorySlice.actions

export const searchHistoryReducer = searchHistorySlice.reducer
