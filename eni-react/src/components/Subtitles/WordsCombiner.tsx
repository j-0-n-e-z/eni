import { useState, type FC } from 'react'

import { useAppDispatch } from '@/app/hooks'
import { addWordsCombination } from '@/store/slices/wordsCombinationsSlice'
import type { Word } from '@/types'

interface WordsCombinerProps {
	words: Word[]
}

export const WordsCombiner: FC<WordsCombinerProps> = ({ words }) => {
	const [wordsCombination, setWordsCombination] = useState<Word[] | null>(null)
	const [isSettingCombination, setIsSettingCombination] = useState(false)
	const dispatch = useAppDispatch()

	function addWordToCombination(word: Word) {
		if (!isSettingCombination) return

		if (wordsCombination?.find((w) => w.id === word.id)) {
			setWordsCombination(wordsCombination.filter((w) => w.id !== word.id))
			return
		}

		setWordsCombination((prevCombination) => {
			if (prevCombination?.find((w) => w.id === word.id)) return prevCombination
			return [...(prevCombination || []), word]
		})
	}

	function addCombinationToLearningWords() {
		if (wordsCombination) {
			dispatch(
				addWordsCombination({
					id: `combo_${wordsCombination.map((w) => w.id).join('_')}`,
					words: wordsCombination,
					text: wordsCombination.map((w) => w.text).join(' ')
				})
			)
			setWordsCombination(null)
			setIsSettingCombination(false)
		}
	}

	return (
		<ul>
			{words.map((word) => (
				<li
					key={word.id}
					style={{
						color: wordsCombination?.find((w) => w.id === word.id)
							? 'lime'
							: 'inherit'
					}}
					onClick={() => addWordToCombination(word)}
				>
					{word.text}
				</li>
			))}
			{words.length > 1 && !isSettingCombination && (
				<button onClick={() => setIsSettingCombination(true)}>
					Make combination
				</button>
			)}
			{isSettingCombination && (
				<>
					<button onClick={() => setIsSettingCombination(false)}>Cancel</button>
					{wordsCombination && wordsCombination.length > 1 && (
						<button onClick={addCombinationToLearningWords}>Save</button>
					)}
				</>
			)}
		</ul>
	)
}
