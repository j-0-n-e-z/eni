import type { FC } from 'react'

import type { SavedWord } from '@/types'
import { Icons } from '@/ui'

import styles from './SubtitleSavedWords.module.scss'

interface SubtitleSavedWordsProps {
	savedWords: SavedWord[]
	removeWord: (word: SavedWord) => void
}

export const SubtitleSavedWords: FC<SubtitleSavedWordsProps> = ({
	savedWords,
	removeWord
}) => {
	const renderWordTranslation = (word: SavedWord) => {
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
			{savedWords.map((word) => (
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
						<Icons.CancelIcon />
					</button>
				</li>
			))}
		</ul>
	)
}
