import cn from 'classnames'
import { useState } from 'react'

import { useDeleteWordMutation } from '@/store/api'
import type { SavedWord as ISavedWord } from '@/types'
import { Icons, Modal } from '@/ui'
import { notifyOnError } from '@/utils'

import { WordSources } from '../WordSources'
import { WordTranslation } from '../WordTranslation'

import styles from './SavedWord.module.scss'

interface SavedWordProps {
	word: ISavedWord
	isMyProfile: boolean
	myId: string | undefined
}

export const SavedWord = ({ word, isMyProfile, myId }: SavedWordProps) => {
	const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false)
	const [triggerDeleteWord] = useDeleteWordMutation()

	const deleteFromSaved = async () => {
		try {
			if (!myId || !isMyProfile) return

			await triggerDeleteWord({
				userId: myId,
				wordText: word.text
			}).unwrap()
		} catch (e) {
			notifyOnError('Произошла ошибка при удалении слова', 'deleteWordError')
		}
	}

	return (
		<li className={styles.wordItem}>
			<div className={styles.wordInfo}>
				<div className={styles.word}>{word.text}</div>
				<WordTranslation translation={word.translation} />
			</div>

			{isSourcesModalOpen && (
				<Modal
					isOpen={isSourcesModalOpen}
					onClose={() => setIsSourcesModalOpen(false)}
				>
					<WordSources
						isMyProfile={isMyProfile}
						myId={myId}
						userSources={word.userSources}
						word={word}
					/>
				</Modal>
			)}
			<div className={styles.wordActions}>
				<button
					aria-label='look appearances'
					className={cn(styles.actionButton, styles.appearanceButton)}
					onClick={() => setIsSourcesModalOpen(true)}
				>
					<Icons.Eye />
				</button>

				{isMyProfile && (
					<button
						aria-label='delete word'
						className={cn(styles.actionButton, styles.deleteButton)}
						onClick={deleteFromSaved}
					>
						<Icons.Trash />
					</button>
				)}
			</div>
		</li>
	)
}
