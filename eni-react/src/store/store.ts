import { configureStore } from '@reduxjs/toolkit'

import { searchHistoryReducer } from '@/store'
import { api, authApi, subtitleApi, userApi, wordApi } from '@/store/api'

export const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(api.middleware)
			.concat(authApi.middleware)
			.concat(userApi.middleware)
			.concat(wordApi.middleware)
			.concat(subtitleApi.middleware),
	reducer: {
		[api.reducerPath]: api.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[wordApi.reducerPath]: wordApi.reducer,
		[subtitleApi.reducerPath]: subtitleApi.reducer,
		searchHistoryReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
