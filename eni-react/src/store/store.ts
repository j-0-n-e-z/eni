import { configureStore } from '@reduxjs/toolkit'

import { api, authApi, userApi } from '@/api'
import { userReducer, wordsMiddleware, wordsReducer } from '@/store'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		wordsReducer,
		userReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(api.middleware)
			.concat(authApi.middleware)
			.concat(userApi.middleware)
			.concat(wordsMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
