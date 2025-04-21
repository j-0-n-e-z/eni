import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import movieReducer from '../store/slices/movieSlice'
import moviesReducer from '../store/slices/moviesSlice'
import subtitlesReducer from '../store/slices/subtitlesSlice'

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
