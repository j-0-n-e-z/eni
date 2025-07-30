import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/api/baseApi'
import { wordsReducer } from '@/store/slices'

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		'wordsReducer': wordsReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
