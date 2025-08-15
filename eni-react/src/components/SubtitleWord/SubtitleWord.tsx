import cn from 'classnames'
import { memo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { addWord, isWordSelected, removeWord } from '@/store'

import styles from './SubtitleWord.module.scss'

interface SubtitleWordProps {
	before?: string
	after?: string
	text: string
	id: string
	subtitleTimecode: string
	subtitleIndex: number
	page: number
	fileId: number
	movieId: number
}

export const SubtitleWord = memo(
	({
		text,
		before,
		after,
		id,
		subtitleTimecode,
		subtitleIndex,
		page,
		fileId,
		movieId
	}: SubtitleWordProps) => {
		const dispatch = useAppDispatch()
		const isSelected = useAppSelector(isWordSelected(text))

		function selectWord() {
			if (!movieId) return

			dispatch(
				addWord({
					id,
					text,
					from: {
						subtitleIndex,
						subtitleTimecode,
						movieId: +movieId,
						page,
						fileId
					},
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
