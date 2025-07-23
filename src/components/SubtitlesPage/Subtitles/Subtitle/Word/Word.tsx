import cn from 'classnames'
import React, { useState } from 'react'

import { store, useAppDispatch, useAppSelector } from '@/app/index'
import { addWord, removeWord, selectWords } from '@/store/slices/wordsSlice'

import styles from './Word.module.scss'

interface WordProps {
	before?: string
	after?: string
	text: string
	id: string
	subtitleId: number
}

export const Word = React.memo(
	({ text, before, after, id, subtitleId }: WordProps) => {
		const dispatch = useAppDispatch()
		const { words } = useAppSelector(selectWords)
		const [isSelected, setIsSelected] = useState(
			Boolean(words.find((w) => w.text === text))
		)

		function selectWord() {
			const movieId = store.getState().movieReducer.movie?.id
			
			if (movieId) {
				setIsSelected(true)
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
		}

		function unselectWord() {
			setIsSelected(false)
			dispatch(removeWord(id))
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
