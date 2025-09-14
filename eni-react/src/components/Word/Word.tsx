import cn from 'classnames'
import { useState, type FC } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/index'
import { Modal, Skeleton } from '@/components'
import { BrainIcon, TranslateIcon, TrashIcon } from '@/icons'
import { addWordTranslation, removeSavedWord } from '@/store'
import type { BackendError } from '@/store/api'
import {
	useDeleteWordMutation,
	useLazyGetDifinitionQuery,
	useLazyTranslateQuery,
	useSaveWordMutation
} from '@/store/api'
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
	const [triggerTranslate, { isFetching: isTranslationFetching }] =
		useLazyTranslateQuery()
	const [triggerGetDefinition, { isFetching: isDefinitionFetching }] =
		useLazyGetDifinitionQuery()
	const [triggerSaveWord] = useSaveWordMutation()
	const [triggerDeleteWord] = useDeleteWordMutation()
	const dispatch = useAppDispatch()
	const [isOpenedSourcesModal, setIsOpenedSourcesModal] = useState(false)

	const translateWord = async () => {
		try {
			const {
				0: { text: translation }
			} = await triggerTranslate(word.text).unwrap()
			dispatch(addWordTranslation({ id: word.id, translation }))
		} catch (e) {
			toast.error('Произошла ошибка при переводе слова', {
				id: 'translateWordError'
			})
		}
	}

	const getWordDefinition = async () => {
		if (word.translation) return

		try {
			const definition = await triggerGetDefinition(word.text).unwrap()
			dispatch(addWordTranslation({ id: word.id, translation: definition }))
		} catch (e) {
			const backendError = e as BackendError
			if (backendError.status === 404) {
				translateWord()
			} else {
				toast.error('Произошла ошибка при получении определения слова', {
					id: 'getWordDefinitionError'
				})
			}
		}
	}

	const deleteWordFromLearning = () => {
		dispatch(removeSavedWord({ sources: word.mySources, wordText: word.text }))
	}

	const deleteWordFromLearned = async () => {
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

			deleteWordFromLearning()

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
		if (isTranslationFetching || isDefinitionFetching)
			return <Skeleton width='15rem' />

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
					<WordSources mySources={word.mySources} word={word} myId={myId} />
				</Modal>
			)}
			<div className={styles.wordActions}>
				{!word.translation && (
					<button
						className={cn(styles.actionButton, styles.translateButton)}
						onClick={getWordDefinition}
					>
						<TranslateIcon />
					</button>
				)}
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
							onClick={
								isLearned ? deleteWordFromLearned : deleteWordFromLearning
							}
						>
							<TrashIcon />
						</button>
					</>
				)}
			</div>
		</li>
	)
}
