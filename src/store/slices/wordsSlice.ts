import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { type RootState } from '@/app'
import type { Word } from '@/types'

interface WordsState {
	words: Word[]
}

const initialState: WordsState = {
	words: []
}

const wordsSlice = createSlice({
	initialState,
	name: 'words',
	reducers: {
		clearWords: () => initialState,
		addWord: (state, action: PayloadAction<Word>) => {
			if (!state.words.find((word) => word.id === action.payload.id)) {
				state.words.push({
					id: action.payload.id,
					text: action.payload.text,
					from: action.payload.from,
					isFavorite: false,
					isLearned: false,
					isRepeating: false
				})
			}
		},
		removeWord: (state, action: PayloadAction<string>) => {
			state.words = state.words.filter((word) => word.text !== action.payload)
		}
	}
})

export const selectWords = (state: RootState) => state.wordsReducer
export const isWordSelected = (text: string) => (state: RootState) =>
	state.wordsReducer.words.some((w) => w.text === text)

export const { clearWords, addWord, removeWord } = wordsSlice.actions

export const wordsReducer = wordsSlice.reducer
