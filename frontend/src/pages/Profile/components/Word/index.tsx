import cn from 'classnames'
import { useState, type FC } from 'react'
import toast from 'react-hot-toast'

import { useDeleteWordMutation } from '@/store/api'
import type { SavedWord } from '@/types'
import { Modal } from '@/ui'
import { EyeIcon, TrashIcon } from '@/ui/icons'

import { WordSources } from '../WordSources'

import styles from './Word.module.scss'

interface MyWordProps {
	word: SavedWord
	isMyPage: boolean
	myId?: string
}

export const Word: FC<MyWordProps> = ({ word, isMyPage, myId }) => {
	const [triggerDeleteWord] = useDeleteWordMutation()
	const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false)

	const deleteFromSaved = async () => {
		try {
			if (!myId) return

			await triggerDeleteWord({
				userId: myId,
				wordText: word.text
			}).unwrap()
		} catch (e) {
			toast.error('Произошла ошибка при удалении слова', {
				id: 'deleteWordError'
			})
		}
	}

	const renderWordTranslation = () => {
		const { translation } = word

		if (
			translation &&
			(translation.includes('\n') || translation.includes(': '))
		) {
			return translation.split('\n').map((def) => {
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
		<li className={styles.wordItem}>
			<div className={styles.wordInfo}>
				<div className={styles.word}>{word.text}</div>
				<div className={styles.translationContainer}>
					{renderWordTranslation()}
				</div>
			</div>

			{isSourcesModalOpen && (
				<Modal
					closeModalHandler={() => setIsSourcesModalOpen(false)}
					isOpen={isSourcesModalOpen}
				>
					<WordSources myId={myId} mySources={word.userSources} word={word} />
				</Modal>
			)}
			<div className={styles.wordActions}>
				{isMyPage && (
					<>
						<button
							aria-label='look appearances'
							className={cn(styles.actionButton, styles.appearanceButton)}
							onClick={() => setIsSourcesModalOpen(true)}
						>
							<EyeIcon />
						</button>
						<button
							aria-label='delete word'
							className={cn(styles.actionButton, styles.deleteButton)}
							onClick={deleteFromSaved}
						>
							<TrashIcon />
						</button>
					</>
				)}
			</div>
		</li>
	)
}
