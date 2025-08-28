// JoinWordsPanel.tsx
import type { FC } from 'react'

import type { Word } from '@/types'

import styles from './Subtitles.module.scss'

interface JoinWordsPanelProps {
	selectedWords: Word[]
	joinedWords: Word[] | null
	onAddWord: (word: Word) => void
	onCancel: () => void
	onSave: () => void
}

export const JoinWordsPanel: FC<JoinWordsPanelProps> = ({
	selectedWords,
	joinedWords,
	onAddWord,
	onCancel,
	onSave
}) => {
	const isSaveDisabled = !joinedWords || joinedWords.length === 0

	return (
		<div>
			<h4>Select words to join:</h4>
			<div className={styles.wordsJoinContainer}>
				{selectedWords.map((word) => (
					<button
						key={word.id}
						className={styles.wordToJoin}
						onClick={() => onAddWord(word)}
					>
						{word.text}
					</button>
				))}
			</div>

			<div className={styles.wordsJoinControls}>
				<button onClick={onCancel}>Cancel</button>
				<button disabled={isSaveDisabled} onClick={onSave}>
					Save
				</button>
			</div>

			{joinedWords && joinedWords.length > 0 && (
				<div>Preview: {joinedWords.map((w) => w.text).join(' ')}</div>
			)}
		</div>
	)
}
