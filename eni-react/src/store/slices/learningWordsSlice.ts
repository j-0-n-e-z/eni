import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import { type RootState } from '@/store'
import type { Word } from '@/types'

export interface WordsState {
	learningWords: Word[]
}

const loadLearningWords = () => {
	try {
		return JSON.parse(localStorage.getItem('learningWords') || '[]') as Word[]
	} catch (e) {
		return []
	}
}

const updateLocalStorage = (words: Word[]) => {
	localStorage.setItem('learningWords', JSON.stringify(words))
}

const initialState: WordsState = {
	learningWords: loadLearningWords()
}

const learningWordsSlice = createSlice({
	initialState,
	name: 'learningWords',
	reducers: {
		addLearningWord: (state, action: PayloadAction<Word>) => {
			const wordToAdd = action.payload
			const isAlreadyAdded = Boolean(
				state.learningWords.find((word) => word.id === wordToAdd.id)
			)

			if (isAlreadyAdded) return

			state.learningWords.push(wordToAdd)

			updateLocalStorage(state.learningWords)
		},
		addWordTranslation: (
			state,
			action: PayloadAction<{ id: string; translation: string }>
		) => {
			const wordToTranslate = state.learningWords.find(
				(word) => word.id === action.payload.id
			)

			if (!wordToTranslate) return

			wordToTranslate.translation = action.payload.translation

			updateLocalStorage(state.learningWords)
		},
		clearLearningWords: (state) => {
			state.learningWords = []
			updateLocalStorage([])
		},
		removeLearningWord: (state, action: PayloadAction<string>) => {
			state.learningWords = state.learningWords.filter(
				(word) => word.id !== action.payload
			)
			updateLocalStorage(state.learningWords)
		}
	}
})

export const selectLearningWords = (state: RootState) =>
	state.learningWordsReducer.learningWords

export const selectLearningWordsByTimecode = createSelector(
	[
		(state: RootState) => state.learningWordsReducer.learningWords,
		(state: RootState, timecode: string) => timecode
	],
	(learningWords, timecode) =>
		learningWords.filter(
			(word) => word.from.subtitleTimecode === timecode && !word.isJoined
		)
)

export const selectLearningJoinedWordsByTimecode = createSelector(
	[
		(state: RootState) => state.learningWordsReducer.learningWords,
		(state: RootState, timecode: string) => timecode
	],
	(learningWords, timecode) =>
		learningWords.filter(
			(word) => word.from.subtitleTimecode === timecode && word.isJoined
		)
)

export const {
	clearLearningWords,
	addLearningWord,
	removeLearningWord,
	addWordTranslation
} = learningWordsSlice.actions

export const learningWordsReducer = learningWordsSlice.reducer
