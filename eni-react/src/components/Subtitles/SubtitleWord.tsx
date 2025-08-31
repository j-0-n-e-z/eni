import cn from 'classnames'

import type { Word } from '@/types'

import styles from './Subtitles.module.scss'

interface SubtitleWordProps {
	before?: string
	after?: string
	word: Word
	isSelected: boolean
	toggleSelectedWord: () => void
}

export const SubtitleWord = ({
	before,
	after,
	isSelected,
	word,
	toggleSelectedWord
}: SubtitleWordProps) => (
	<>
		{before && <li className={styles.punctuation}>{before}</li>}
		<li>
			<button
				className={cn(styles.word, {
					[styles.selected]: isSelected
				})}
				onClick={toggleSelectedWord}
			>
				<span className={styles.text}>{word.text}</span>
			</button>
		</li>
		{after && <li className={styles.punctuation}>{after}</li>}
	</>
)
