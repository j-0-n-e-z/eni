import cn from 'classnames'
import { useState, type FC } from 'react'
import toast from 'react-hot-toast'

import { Modal } from '@/components'
import { BrainIcon, TrashIcon } from '@/icons'
import { useDeleteWordMutation, useSaveWordMutation } from '@/store/api'
import type { Word as IWord } from '@/types'

import styles from './Word.module.scss'
import { WordSources } from './WordSources'

interface MyWordProps {
	word: IWord
	isMyPage: boolean
	myId?: string
	isLearned: boolean
}

export const Word: FC<MyWordProps> = ({ word, isMyPage, myId, isLearned }) => {
	const [triggerSaveWord] = useSaveWordMutation()
	const [triggerDeleteWord] = useDeleteWordMutation()
	const [isOpenedSourcesModal, setIsOpenedSourcesModal] = useState(false)

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

	const saveWord = async () => {
		try {
			if (!myId) return

			await triggerSaveWord({
				userId: myId,
				word
			}).unwrap()

			toast.success('Слово сохранено', {
				id: 'saveWordSuccess'
			})
		} catch (e) {
			toast.error('Произошла ошибка при сохранении слова', {
				id: 'saveWordError'
			})
		}
	}

	const renderWordTranslation = () => {
		if (
			word.translation &&
			(word.translation.includes('\n') || word.translation.includes(': '))
		) {
			return word.translation.split('\n').map((def) => {
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
			<button onClick={() => setIsOpenedSourcesModal(true)}>
				Go to word ({word.mySources.length})
			</button>
			{isOpenedSourcesModal && (
				<Modal closeModalHandler={() => setIsOpenedSourcesModal(false)}>
					<WordSources myId={myId} mySources={word.mySources} word={word} />
				</Modal>
			)}
			<div className={styles.wordActions}>
				{isMyPage && (
					<>
						{!isLearned && (
							<button
								aria-label='save word'
								className={cn(styles.actionButton, styles.saveButton)}
								onClick={saveWord}
							>
								<BrainIcon />
							</button>
						)}
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
