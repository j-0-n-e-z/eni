import cn from 'classnames'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/index'
import { BrainIcon, TranslateIcon, TrashIcon } from '@/icons'
import { addWordTranslation, removeLearningWord } from '@/store'
import type { BackendError } from '@/store/api'
import {
	useDeleteWordMutation,
	useLazyGetDifinitionQuery,
	useLazyTranslateQuery,
	useSaveWordMutation
} from '@/store/api'
import type { Word as IWord } from '@/types'

import styles from './Word.module.scss'

interface MyWordProps {
	word: IWord
	isMyPage: boolean
	myId?: string
	isLearned: boolean
}

export const Word: FC<MyWordProps> = ({ word, isMyPage, myId, isLearned }) => {
	const [triggerTranslate, { isLoading: isTranslationLoading }] =
		useLazyTranslateQuery()
	const [triggerGetDefinition, { isLoading: isDefinitionLoading }] =
		useLazyGetDifinitionQuery()
	const [triggerSaveWord] = useSaveWordMutation()
	const [triggerDeleteWord] = useDeleteWordMutation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

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
			const translation = definition
				.map((def) => `${def.pos}: ${def.tr}`)
				.join('\n')
			dispatch(addWordTranslation({ id: word.id, translation }))
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
		dispatch(removeLearningWord(word.id))
	}

	const deleteWordFromLearned = async () => {
		try {
			if (!myId) return

			await triggerDeleteWord({
				userId: myId,
				wordId: word.id
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

			deleteWordFromLearning()
		} catch (e) {
			toast.error('Произошла ошибка при сохранении слова', {
				id: 'saveWordError'
			})
		}
	}

	const goToWord = () => {
		const { movieId, fileId, page, subtitleTimecode } = word.from

		navigate(
			`/movie/${movieId}/subtitles/${fileId}?page=${page}&timecode=${subtitleTimecode}`,
			{
				state: { lookupWord: word }
			}
		)
	}

	const renderWordTranslation = () => {
		if (!word.translation) return null

		if (isTranslationLoading || isDefinitionLoading) return 'Loading...'

		if (word.translation.includes('\n') || word.translation.includes(': ')) {
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
			<button onClick={goToWord}>Go to word</button>
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
