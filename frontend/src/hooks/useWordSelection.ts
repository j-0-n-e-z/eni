import { useState } from 'react'

import type { Word } from '@/types'

export function useWordSelection() {
	const [selectedWords, setSelectedWords] = useState<Word[]>([])
	const [wordsToJoin, setWordsToJoin] = useState<Word[]>([])

	const toggleSelectedWord = (word: Word) => {
		setSelectedWords((prev) => {
			if (prev.find((w) => w.id === word.id))
				return prev.filter((w) => w.id !== word.id)
			if (prev.find((w) => w.text === word.text)) return prev
			return [...prev, word]
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
