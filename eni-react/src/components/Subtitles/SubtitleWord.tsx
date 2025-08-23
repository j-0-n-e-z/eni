import cn from 'classnames'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { addWord, isWordSelected, removeWord } from '@/store'
import type { Word } from '@/types'

import styles from './Subtitles.module.scss'

interface SubtitleWordProps {
	before?: string
	after?: string
	text: string
	id: string
	from: Word['from']
}

export const SubtitleWord = ({
	text,
	before,
	after,
	id,
	from
}: SubtitleWordProps) => {
	const dispatch = useAppDispatch()
	const isSelected = useAppSelector(isWordSelected(text))

	function selectWord() {
		if (!from.movieId) return

		dispatch(
			addWord({
				id,
				text,
				from,
				isFavorite: false,
				isLearned: false
			})
		)
	}

	function unselectWord() {
		dispatch(removeWord(id))
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
					<span className={styles.text}>{text}</span>
				</button>
			</li>
			{after && <li className={styles.punctuation}>{after}</li>}
		</>
	)
}
