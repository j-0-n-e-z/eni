import cn from 'classnames'

import { useAppDispatch } from '@/app/index'
import type { Word } from '@/types'

import styles from './Subtitles.module.scss'

interface SubtitleWordProps {
	before?: string
	after?: string
	word: Word
	isSelected: boolean
	addToWordCombiner: () => void
	removeFromWordCombiner: () => void
}

export const SubtitleWord = ({
	before,
	after,
	isSelected,
	word,
	addToWordCombiner,
	removeFromWordCombiner
}: SubtitleWordProps) => {
	const dispatch = useAppDispatch()

	function selectWord() {
		addToWordCombiner()
		// dispatch(addWord(word))
	}

	function unselectWord() {
		removeFromWordCombiner()
		// dispatch(removeWord(word.id))
	}

	return (
		<>
			{before && <li className={styles.punctuation}>{before}</li>}
			<li>
				<button
					className={cn(styles.word, {
						[styles.added]: isSelected
					})}
					onClick={isSelected ? unselectWord : selectWord}
				>
					<span className={styles.text}>{word.text}</span>
				</button>
			</li>
			{after && <li className={styles.punctuation}>{after}</li>}
		</>
	)
}
