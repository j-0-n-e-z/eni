import type { FC } from 'react'
import toast from 'react-hot-toast'

import { useAppDispatch } from '@/app/index'
import { Skeleton } from '@/components'
import { CancelIcon, TranslateIcon } from '@/icons'
import { addWordTranslation } from '@/store'
import type { BackendError } from '@/store/api'
import { useLazyGetDifinitionQuery, useLazyTranslateQuery } from '@/store/api'
import type { Word } from '@/types'

import styles from './Subtitles.module.scss'

interface SavedWordsProps {
	words: Word[]
	removeWord: (word: Word) => void
}

export const SavedWords: FC<SavedWordsProps> = ({ words, removeWord }) => {
	const dispatch = useAppDispatch()
	const [triggerWordTranslate, { isLoading: isWordTranslationLoading }] =
		useLazyTranslateQuery()
	const [triggerGetWordDefinition, { isLoading: isWordDefinitionLoading }] =
		useLazyGetDifinitionQuery()

	const translateWord = async (word: Word) => {
		try {
			const {
				0: { text: wordTranslation }
			} = await triggerWordTranslate(word.text).unwrap()

			dispatch(
				addWordTranslation({
					id: word.id,
					translation: wordTranslation
				})
			)
		} catch (e) {
			toast.error(`Произошла ошибка при переводе слова`, {
				id: 'translateWordError'
			})
		}
	}

	const getWordDefinition = async (word: Word) => {
		if (word.translation) return

		try {
			const definition = await triggerGetWordDefinition(word.text).unwrap()
			const translation = definition
				.map((def) => `${def.pos}: ${def.tr}`)
				.join('\n')

			dispatch(addWordTranslation({ id: word.id, translation }))
		} catch (e) {
			const backendError = e as BackendError
			if (backendError.status === 404) {
				translateWord(word)
			} else {
				toast.error('Произошла ошибка при получении определения слова', {
					id: 'getWordDefinitionError'
				})
			}
		}
	}

	const renderWordTranslation = (word: Word) => {
		if (isWordDefinitionLoading || isWordTranslationLoading) return <Skeleton />

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
		<ul className={styles.savedWordList}>
			{words.map((word) => (
				<li key={word.id} className={styles.savedWord}>
					<div className={styles.wordContainer}>
						<span className={styles.savedWordText}>{word.text}</span>
						{renderWordTranslation(word)}
					</div>
					{!word.translation && (
						<button
							aria-label='translate joined word'
							className={styles.translateWordBtn}
							onClick={() => getWordDefinition(word)}
						>
							<TranslateIcon />
						</button>
					)}
					<button
						aria-label='remove joined word'
						className={styles.removeSavedWordBtn}
						onClick={() => removeWord(word)}
					>
						<CancelIcon />
					</button>
				</li>
			))}
		</ul>
	)
}
