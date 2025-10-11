import type { FC } from 'react'

import type { Word as IWord } from '@/types'

import { Word } from '../Word'

import styles from './SavedWords.module.scss'

interface WordsSectionProps {
	icon: React.ReactNode
	title: string
	words: IWord[]
	isMyPage: boolean
	isLearned?: boolean
	myId: string | undefined
}

export const SavedWords: FC<WordsSectionProps> = ({
	isMyPage,
	myId,
	words,
	title,
	icon,
	isLearned
}) => (
	<section className={styles.wordsSection}>
		<div className={styles.wordsSectionHeader}>
			<h3 className={styles.wordsSectionTitleWrapper}>
				{icon}
				{title}
			</h3>
			<span className={styles.badge}>{words.length}</span>
		</div>

		<ul className={styles.wordsList}>
			{words.map((word) => (
				<Word
					key={`learn${word.id}`}
					isLearned={Boolean(isLearned)}
					isMyPage={isMyPage}
					myId={myId}
					word={word}
				/>
			))}
		</ul>
	</section>
)
