import cn from 'classnames'
import { memo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { addWord, isWordSelected, removeWord } from '@/slices'

import styles from './Word.module.scss'

interface WordProps {
	before?: string
	after?: string
	text: string
	id: string
	subtitleId: number
	movieId: number
}

export const Word = memo(
	({ text, before, after, id, subtitleId, movieId }: WordProps) => {
		const dispatch = useAppDispatch()
		const isSelected = useAppSelector(isWordSelected(text))

		function selectWord() {
			dispatch(
				addWord({
					id,
					text,
					from: { subtitleId, movieId },
					isFavorite: false,
					isLearned: false,
					isRepeating: false
				})
			)
		}

		function unselectWord() {
			dispatch(removeWord(text))
		}

		return (
			<>
				{before && <li className={styles.punctuation}>{before}</li>}
				<li>
					<button
						className={cn(styles.wordContainer, {
							[styles.added]: isSelected
						})}
						onClick={isSelected ? unselectWord : selectWord}
					>
						<span className={styles.text}>{text}</span>
					</button>
				</li>
				{after && <li className={styles.punctuation}>{after}</li>}
			</>
		)
	}
)
