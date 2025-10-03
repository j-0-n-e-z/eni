import { isAnyOf, type Middleware } from '@reduxjs/toolkit'

import type { RootState } from '@/store'
import {
	clearMovieHistory,
	removeMovieFromHistory,
	upsertMovieInHistory
} from '@/store'

export const searchHistoryMiddleware: Middleware =
	(store) => (next) => (action) => {
		const result = next(action)

		if (
			isAnyOf(
				clearMovieHistory,
				removeMovieFromHistory,
				upsertMovieInHistory
			)(action)
		) {
			const state = store.getState() as RootState
			localStorage.setItem(
				'searchHistory',
				JSON.stringify(state.searchHistoryReducer.historyMovies)
			)
		}

		return result
	}
