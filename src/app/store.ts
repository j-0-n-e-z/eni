import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import { movieReducer, moviesReducer, subtitlesReducer } from '@/slices'

export const store = configureStore({
	reducer: {
		moviesReducer,
		subtitlesReducer,
		movieReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
