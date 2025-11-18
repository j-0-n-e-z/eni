import type { SavedWord as ISavedWord } from '@/types'
import { Icons } from '@/ui'

import { SavedWord } from '../SavedWord'

import styles from './SavedWords.module.scss'

interface SavedWordsProps {
	savedWords: ISavedWord[]
	isMyProfile: boolean
	myId: string | undefined
}

export const SavedWords = ({
	isMyProfile,
	savedWords,
	myId
}: SavedWordsProps) => (
	<section className={styles.wordsSection}>
		<div className={styles.wordsSectionHeader}>
			<h3 className={styles.wordsSectionTitleWrapper}>
				<Icons.BookIcon />
				Изучено
			</h3>
			<span className={styles.badge}>{savedWords.length}</span>
		</div>

		<ul className={styles.wordsList}>
			{savedWords.map((word) => (
				<SavedWord
					key={word.id}
					isMyProfile={isMyProfile}
					myId={myId}
					word={word}
				/>
			))}
		</ul>
	</section>
)
