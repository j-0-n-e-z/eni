import { useState } from 'react'

import type { Word } from '@/types'

export function useWordSelection() {
	const [selectedWords, setSelectedWords] = useState<Word[]>([])
	const [wordsToJoin, setWordsToJoin] = useState<Word[]>([])

	const toggleSelectedWord = (word: Word) => {
		setSelectedWords((selectedWords) => {
			if (selectedWords.find((w) => w.id === word.id))
				return selectedWords.filter((w) => w.id !== word.id)

			// if (selectedWords.find((w) => w.text === word.text)) return selectedWords

			return [...selectedWords, word]
		})
	}

	const toggleWordToJoin = (word: Word) => {
		if (selectedWords.length < 2) return

		setWordsToJoin((prev) => {
			if (prev.find((w) => w.id === word.id))
				return prev.filter((w) => w.id !== word.id)
			return [...prev, word]
		})
	}

	return {
		clearWordsToJoin: () => setWordsToJoin([]),
		selectedWords,
		toggleSelectedWord,
		toggleWordToJoin,
		wordsToJoin
	}
}
