import type { FC } from 'react'

import type { Word as IWord, User } from '@/types'

import { Word } from '../Word/Word'

import styles from './Profile.module.scss'

interface WordsSectionProps {
	icon: React.ReactNode
	title: string
	words: IWord[]
	isMyPage: boolean
	isLearned?: boolean
	me?: User
}

export const WordsSection: FC<WordsSectionProps> = ({
	isMyPage,
	me,
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
					myId={me?.id}
					word={word}
				/>
			))}
		</ul>
	</section>
)
