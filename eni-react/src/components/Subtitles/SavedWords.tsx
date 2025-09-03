import type { FC } from 'react'

import { CancelIcon, TranslateIcon } from '@/icons'
import type { Word } from '@/types'

import styles from './Subtitles.module.scss'

interface SavedWordsProps {
	words: Word[]
	translateWord: (word: Word) => void
	removeWord: (word: Word) => void
}

export const SavedWords: FC<SavedWordsProps> = ({
	words,
	translateWord,
	removeWord
}) => (
	<ul className={styles.savedWordList}>
		{words.map((word) => (
			<li key={word.id} className={styles.savedWord}>
				<div className={styles.wordContainer}>
					<span className={styles.savedWordText}>{word.text}</span>
					{word.translation && <span>{word.translation}</span>}
				</div>
				{!word.translation && (
					<button
						aria-label='translate joined word'
						className={styles.translateWordBtn}
						onClick={() => translateWord(word)}
					>
						<TranslateIcon />
					</button>
				)}
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
