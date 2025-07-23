import cn from 'classnames'
import React, { memo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { addWord, isWordSelected, removeWord, selectMovie } from '@/slices'

import styles from './Word.module.scss'

interface WordProps {
	before?: string
	after?: string
	text: string
	id: string
	subtitleId: number
}

export const Word = memo(
	({ text, before, after, id, subtitleId }: WordProps) => {
		const dispatch = useAppDispatch()
		const isSelected = useAppSelector(isWordSelected(text))
		const { movie } = useAppSelector(selectMovie)

		function selectWord() {
			if (movie) {
				dispatch(
					addWord({
						id,
						text,
						from: { subtitleId, movieId: movie.id },
						isFavorite: false,
						isLearned: false,
						isRepeating: false
					})
				)
			}
		}

		function unselectWord() {
			dispatch(removeWord(text))
		}

		return (
			<>
				{before && <div className={styles.punctuation}>{before}</div>}
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
				{after && <div className={styles.punctuation}>{after}</div>}
			</>
		)
	}
)
