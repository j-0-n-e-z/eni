import { configureStore } from '@reduxjs/toolkit'

import { api, authApi } from '@/api'
import { wordsReducer } from '@/store'

import { searchHistoryReducer } from './slices/searchHistorySlice'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[authApi.reducerPath]: authApi.reducer,
		wordsReducer,
		searchHistoryReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware).concat(authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
