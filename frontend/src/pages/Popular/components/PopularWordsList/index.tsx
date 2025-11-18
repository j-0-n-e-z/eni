import type { SavedWord } from '@/types'
import { EmptyState, Icons } from '@/ui'

import styles from './PopularWordsList.module.scss'

interface PopularWordsListProps {
	words: SavedWord[] | undefined
}

export const PopularWordsList = ({ words }: PopularWordsListProps) => {
	if (!words)
		return (
			<EmptyState
				description='Нет данных о популярных словах'
				header='Упс...'
				icon={<Icons.EmptyIcon />}
			/>
		)

	return (
		<ul className={styles.wordsList}>
			{words.map((word) => (
				<li key={word.id} className={styles.word}>
					{word.text} {word.translationCount}
				</li>
			))}
		</ul>
	)
}
