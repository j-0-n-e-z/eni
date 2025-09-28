import { configureStore } from '@reduxjs/toolkit'

import { searchHistoryReducer } from '@/store'
import {
	authApi,
	movieApi,
	subtitleApi,
	translateApi,
	userApi,
	wordApi
} from '@/store/api'

export const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(userApi.middleware)
			.concat(wordApi.middleware)
			.concat(movieApi.middleware)
			.concat(subtitleApi.middleware)
			.concat(translateApi.middleware),
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
