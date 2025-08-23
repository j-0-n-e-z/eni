import { configureStore } from '@reduxjs/toolkit'

import {
	searchHistoryReducer,
	wordsCombinationsReducer,
	wordsReducer
} from '@/store'
import { api, authApi, subtitleApi, userApi } from '@/store/api'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[subtitleApi.reducerPath]: subtitleApi.reducer,
		wordsReducer,
		wordsCombinationsReducer,
		searchHistoryReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(api.middleware)
			.concat(authApi.middleware)
			.concat(userApi.middleware)
			.concat(subtitleApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
