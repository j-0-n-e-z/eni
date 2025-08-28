import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

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
	name: 'learningWords',
	initialState,
	reducers: {
		clearLearningWords: (state) => {
			state.learningWords = []
			updateLocalStorage([])
		},
		addLearningWord: (state, action: PayloadAction<Word>) => {
			const wordToAdd = action.payload
			const isAlreadyAdded = Boolean(
				state.learningWords.find((word) => word.id === wordToAdd.id)
			)

			if (isAlreadyAdded) {
				toast(`Слово "${wordToAdd.text}" уже добавлено`, { icon: '👀' })
				return
			}

			state.learningWords.push(wordToAdd)

			updateLocalStorage(state.learningWords)
		},
		removeLearningWord: (state, action: PayloadAction<string>) => {
			state.learningWords = state.learningWords.filter(
				(word) => word.id !== action.payload
			)
			updateLocalStorage(state.learningWords)
		}
	}
})

export const selectLearningWords = (state: RootState) => state.learningWordsReducer

export const { clearLearningWords, addLearningWord, removeLearningWord } = learningWordsSlice.actions

export const learningWordsReducer = learningWordsSlice.reducer
