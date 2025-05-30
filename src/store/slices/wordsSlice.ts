import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/app'
import type { Word } from '@/types'

interface WordsState {
	words: Word[] | null
}

const initialState: WordsState = {
	words: null
}

const wordsSlice = createSlice({
	initialState,
	name: 'words',
	reducers: {
		clearWords: () => initialState,
		addWord: (state, action: PayloadAction<string>) => {
      if (!state.words) state.words = []
      
			state.words.push({
				value: action.payload,
				isFavorite: false,
				isLearned: false,
				isRepeating: false
			})
		}
	}
})

export const selectWords = (state: RootState) => state.wordsReducer

export const { clearWords, addWord } = wordsSlice.actions

export const wordsReducer = wordsSlice.reducer
