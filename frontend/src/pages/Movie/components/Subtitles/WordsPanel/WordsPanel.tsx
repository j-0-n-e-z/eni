import cn from 'classnames'

import type { Word } from '@/types'

import styles from './WordsPanel.module.scss'

interface WordsPanelProps {
	selectedWords: Word[]
	wordsToJoin: Word[]
	toggleWordToJoin: (word: Word) => void
	saveSingleWords: () => void
	saveJoinedWords: () => void
	hasWordsToSave: boolean
}

export const WordsPanel = ({
	selectedWords,
	wordsToJoin,
	toggleWordToJoin,
	saveSingleWords,
	saveJoinedWords,
	hasWordsToSave
}: WordsPanelProps) => (
	<div className={styles.joinWordsPanel}>
		<div className={styles.wordsJoinContainer}>
			{selectedWords.map((word) => (
				<button
					key={word.id}
					className={cn(styles.wordToJoin, {
						[styles.selected]: Boolean(
							wordsToJoin?.find((w) => w.id === word.id)
						)
					})}
					onClick={() => toggleWordToJoin(word)}
				>
					{word.text}
				</button>
			))}
		</div>

		{hasWordsToSave && (
			<>
				<div className={styles.wordsJoinControls}>
					{wordsToJoin.length > 1 && (
						<button
							className={cn(styles.control, styles.save)}
							onClick={saveJoinedWords}
						>
							Save joined word
						</button>
					)}
					{wordsToJoin.length <= 1 && (
						<button
							className={cn(styles.control, styles.save)}
							onClick={saveSingleWords}
						>
							Save word{selectedWords.length > 1 ? 's' : ''}
						</button>
					)}
				</div>

				{wordsToJoin.length > 1 && (
					<div>Preview: {wordsToJoin.map((w) => w.text).join(' ')}</div>
				)}
			</>
		)}
	</div>
)
