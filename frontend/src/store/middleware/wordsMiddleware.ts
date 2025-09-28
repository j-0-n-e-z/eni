import type { Dispatch, Middleware, PayloadAction } from '@reduxjs/toolkit'

import type { WordsState } from '@/store'
import type { Word } from '@/types'

const isWordAction = (action: unknown): action is PayloadAction<Word> =>
	typeof action === 'object' &&
	action !== null &&
	'type' in action &&
	typeof action.type === 'string' &&
	action.type.startsWith('words/')

export const wordsMiddleware: Middleware<
	Dispatch,
	{ wordsReducer: WordsState }
> = (store) => (next) => (action) => {
	const result = next(action)

	if (isWordAction(action)) {
		localStorage.setItem(
			'words',
			JSON.stringify(store.getState().wordsReducer.words)
		)
	}

	return result
}
