import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import { type RootState } from '@/store'
import type { Word, WordSource } from '@/types'

export interface WordsState {
	savedWords: Word[]
}

const loadSavedWords = () => {
	try {
		return JSON.parse(localStorage.getItem('savedWords') || '[]') as Word[]
	} catch (e) {
		return []
	}
}

const updateLocalStorage = (words: Word[]) => {
	localStorage.setItem('savedWords', JSON.stringify(words))
}

const checkIfSourceIsAdded = (sources: WordSource[], source: WordSource) =>
	Boolean(
		sources.find(
			(s) =>
				s.fileId === source.fileId &&
				s.movieId === source.movieId &&
				s.page === source.page &&
				s.subtitleTimecode === source.subtitleTimecode &&
				s.subtitleWordIndex === source.subtitleWordIndex
		)
	)

const initialState: WordsState = {
	savedWords: loadSavedWords()
}

const savedWordsSlice = createSlice({
	initialState,
	name: 'savedWords',
	reducers: {
		addSavedWord: (state, action: PayloadAction<Word>) => {
			const wordToAdd = action.payload

			const alreadyAddedWord = state.savedWords.find(
				(word) => word.text === wordToAdd.text
			)

			if (alreadyAddedWord) {
				for (const source of wordToAdd.mySources) {
					if (!checkIfSourceIsAdded(alreadyAddedWord.mySources, source)) {
						alreadyAddedWord.mySources.push(source)
					}
				}
			} else {
				state.savedWords.push(wordToAdd)
			}

			updateLocalStorage(state.savedWords)
		},
		addWordTranslation: (
			state,
			action: PayloadAction<{ id: string; translation: string }>
		) => {
			const wordToTranslate = state.savedWords.find(
				(word) => word.id === action.payload.id
			)

			if (!wordToTranslate) return

			wordToTranslate.translation = action.payload.translation

			updateLocalStorage(state.savedWords)
		},
		clearSavedWords: (state) => {
			state.savedWords = []
			updateLocalStorage([])
		},
		removeSavedWord: (
			state,
			action: PayloadAction<{ wordText: string; sources: WordSource[] }>
		) => {
			const { wordText, sources } = action.payload
			const sourceIdsToRemove = sources.map((s) => s.id)

			state.savedWords = state.savedWords.flatMap((savedWord) => {
				if (savedWord.text !== wordText) return [savedWord]

				const filteredSources = savedWord.mySources.filter(
					(source) => !sourceIdsToRemove.includes(source.id)
				)

				if (filteredSources.length === 0) return []

				return [{ ...savedWord, mySources: filteredSources }]
			})

			updateLocalStorage(state.savedWords)
		}
	}
})

export const selectSavedWords = (state: RootState) =>
	state.savedWordsReducer.savedWords

export const selectSavedWordsByTimecode = createSelector(
	[
		(state: RootState) => state.savedWordsReducer.savedWords,
		(state: RootState, timecode: string) => timecode,
		(state: RootState, timecode: string, movieId: number) => movieId,
		(
			state: RootState,
			timecode: string,
			movieId: number,
			isJoined: boolean = false
		) => isJoined
	],
	(savedWords, timecode, movieId, isJoined) =>
		savedWords.filter((sw) =>
			sw.mySources.some(
				(s) =>
					s.subtitleTimecode === timecode &&
					s.movieId === movieId &&
					sw.isJoined === isJoined
			)
		)
)

export const {
	clearSavedWords,
	addSavedWord,
	removeSavedWord,
	addWordTranslation
} = savedWordsSlice.actions

export const savedWordsReducer = savedWordsSlice.reducer
