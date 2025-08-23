import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { WordsCombination } from '@/frontend-types'
import { type RootState } from '@/store'

export interface WordsCombinationsState {
	wordsCombinations: WordsCombination[]
}

const loadWordsCombinations = () => {
	try {
		return JSON.parse(
			localStorage.getItem('wordsCombinations') || '[]'
		) as WordsCombination[]
	} catch (e) {
		return []
	}
}

const initialState: WordsCombinationsState = {
	wordsCombinations: loadWordsCombinations()
}

const wordsCombinationsSlice = createSlice({
	name: 'wordsCombinations',
	initialState,
	reducers: {
		clearWordsCombinations: () => initialState,
		addWordsCombination: (state, action: PayloadAction<WordsCombination>) => {
			if (
				!state.wordsCombinations.find((word) => word.id === action.payload.id)
			) {
				state.wordsCombinations.push({
					...action.payload
				})
			}
			localStorage.setItem(
				'wordsCombinations',
				JSON.stringify(state.wordsCombinations)
			)
		},
		removeWordsCombination: (state, action: PayloadAction<string>) => {
			state.wordsCombinations = state.wordsCombinations.filter(
				(word) => word.id !== action.payload
			)
			localStorage.setItem(
				'wordsCombinations',
				JSON.stringify(state.wordsCombinations)
			)
		}
	}
})

export const selectWordsCombinations = (state: RootState) => state.wordsCombinationsReducer

export const {
	clearWordsCombinations,
	addWordsCombination,
	removeWordsCombination
} = wordsCombinationsSlice.actions

export const wordsCombinationsReducer = wordsCombinationsSlice.reducer
