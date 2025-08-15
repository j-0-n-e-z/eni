import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { type RootState } from '@/store'
import type { Word } from '@/types'

export interface WordsState {
	words: Word[]
}

const loadWords = () => {
	try {
		return JSON.parse(localStorage.getItem('words') || '[]') as Word[]
	} catch (e) {
		return []
	}
}

const initialState: WordsState = {
	words: loadWords()
}

const wordsSlice = createSlice({
	name: 'words',
	initialState,
	reducers: {
		clearWords: () => initialState,
		addWord: (state, action: PayloadAction<Word>) => {
			if (!state.words.find((word) => word.word.id === action.payload.word.id)) {
				state.words.push({
					...action.payload,
					isFavorite: false,
					isLearned: false,
					isRepeating: false
				})
			}
			localStorage.setItem('words', JSON.stringify(state.words))
		},
		removeWord: (state, action: PayloadAction<string>) => {
			state.words = state.words.filter((word) => word.word.id !== action.payload)
			localStorage.setItem('words', JSON.stringify(state.words))
		}
	}
})

export const selectWords = (state: RootState) => state.wordsReducer
export const isWordSelected = (text: string) => (state: RootState) =>
	state.wordsReducer.words.some((w) => w.word.text === text)

export const { clearWords, addWord, removeWord } = wordsSlice.actions

export const wordsReducer = wordsSlice.reducer
