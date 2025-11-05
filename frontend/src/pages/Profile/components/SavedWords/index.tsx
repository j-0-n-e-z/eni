import type { SerializedError } from '@reduxjs/toolkit'
import type { FC } from 'react'

import type { BackendError } from '@/frontend-types'
import type { SavedWord as ISavedWord } from '@/types'
import { EmptyState, Icons } from '@/ui'

import { SavedWord } from '../SavedWord'

import styles from './SavedWords.module.scss'
import { SavedWordsSkeleton } from './SavedWordsSkeleton'

interface SavedWordsProps {
	isSavedWordsFetching: boolean
	savedWordsError: BackendError | SerializedError | undefined
	savedWords: ISavedWord[] | undefined
	descriptionOnEmpty: string
	isMyProfile: boolean
	myId: string | undefined
}

export const SavedWords: FC<SavedWordsProps> = ({
	isMyProfile,
	descriptionOnEmpty,
	savedWords,
	savedWordsError,
	isSavedWordsFetching,
	myId
}) => {
	if (isSavedWordsFetching) return <SavedWordsSkeleton />

	if (savedWordsError) return <div>Не удалось загрузить изученные слова</div>

	if (savedWords?.length)
		return (
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

	return (
		<EmptyState
			description={descriptionOnEmpty}
			header='Пока пусто'
			icon={<Icons.BookIcon />}
		/>
	)
}
