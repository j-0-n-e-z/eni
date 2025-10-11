import { configureStore } from '@reduxjs/toolkit'

import { searchHistoryMiddleware, searchHistoryReducer } from '@/store'
import {
	authApi,
	movieApi,
	subtitleApi,
	translateApi,
	userApi,
	wordApi
} from '@/store/api'

export const store = configureStore({
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(userApi.middleware)
			.concat(wordApi.middleware)
			.concat(movieApi.middleware)
			.concat(subtitleApi.middleware)
			.concat(translateApi.middleware)
			.concat(searchHistoryMiddleware),
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[wordApi.reducerPath]: wordApi.reducer,
		[movieApi.reducerPath]: movieApi.reducer,
		[subtitleApi.reducerPath]: subtitleApi.reducer,
		[translateApi.reducerPath]: translateApi.reducer,
		searchHistoryReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
