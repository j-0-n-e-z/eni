import { configureStore } from '@reduxjs/toolkit'

import { api, authApi, userApi } from '@/api'
import { wordsReducer } from '@/store'

import { searchHistoryReducer } from './slices/searchHistorySlice'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		wordsReducer,
		searchHistoryReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(api.middleware)
			.concat(authApi.middleware)
			.concat(userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
