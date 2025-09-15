import type { FC } from 'react'

import { CancelIcon } from '@/icons'
import type { Word } from '@/types'

import styles from './Subtitles.module.scss'

interface SavedWordsProps {
	words: Word[]
	removeWord: (word: Word) => void
}

export const SavedWords: FC<SavedWordsProps> = ({ words, removeWord }) => {
	const renderWordTranslation = (word: Word) => {
		if (
			word.translation &&
			(word.translation.includes('\n') || word.translation.includes(': '))
		) {
			return word.translation.split('\n').map((def) => {
				const [pos, tr] = def.split(': ')
				return (
					<div key={pos} className={styles.translation}>
						<span className={styles.translationPos}>{pos}</span>: {tr}
					</div>
				)
			})
		}

		return <div className={styles.translation}>{word.translation}</div>
	}

	return (
		<ul className={styles.savedWordList}>
			{words.map((word) => (
				<li key={word.id} className={styles.savedWord}>
					<div className={styles.wordContainer}>
						<span className={styles.savedWordText}>{word.text}</span>
						{renderWordTranslation(word)}
					</div>
					<button
						aria-label='remove joined word'
						className={styles.removeSavedWordBtn}
						onClick={() => removeWord(word)}
					>
						<CancelIcon />
					</button>
				</li>
			))}
		</ul>
	)
}
