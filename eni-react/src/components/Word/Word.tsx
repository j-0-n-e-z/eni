import cn from 'classnames'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import {
	useDeleteWordMutation,
	useLazyGetDifinitionQuery,
	useLazyTranslateQuery,
	useSaveWordMutation
} from '@/api'
import { useAppDispatch } from '@/app/index'
import { BrainIcon, TranslateIcon, TrashIcon } from '@/icons'
import { removeWord } from '@/store'
import type { Word as IWord } from '@/types'

import styles from './Word.module.scss'

interface MyWordProps {
	word: IWord
	isMe: boolean
	myId?: string
	isLearned: boolean
}

export const Word: FC<MyWordProps> = ({ word, isMe, myId, isLearned }) => {
	const [triggerTranslate, { data: translations }] = useLazyTranslateQuery()
	const [triggerGetDefinition, { data: definitions }] =
		useLazyGetDifinitionQuery()
	const [triggerSaveWord] = useSaveWordMutation()
	const [triggerDeleteWord] = useDeleteWordMutation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const translate = async () => {
		if (!definitions && !translations) {
			try {
				await triggerGetDefinition(word.text).unwrap()
			} catch (error) {
				console.error(error)
				if ('status' in error) {
					if (error.status === 401) {
						toast.error('Для перевода слов нужно авторизоваться')
					} else if (error.status === 404) {
						triggerTranslate(word.text)
					}
				}
			}
		}
	}

	const saveWord = async () => {
		try {
			if (!myId) return

			await triggerSaveWord({
				userId: myId,
				word
			}).unwrap()

			dispatch(removeWord(word.id))
		} catch (e) {
			console.log(e)
		}
	}

	const deleteWordFromLearning = () => {
		dispatch(removeWord(word.id))
	}

	const deleteWordFromLearned = async () => {
		try {
			if (!myId) return

			await triggerDeleteWord({
				userId: myId,
				wordId: word.id
			}).unwrap()
		} catch (e) {
			console.log(e)
		}
	}

	const goToWord = () => {
		navigate(`/movie/${word.from.movieId}`, { state: { lookupWord: word } })
	}

	return (
		<li className={styles.wordItem}>
			<div className={styles.wordInfo}>
				<div className={styles.word}>{word.text}</div>
				{definitions && (
					<div className={styles.translations}>
						{definitions.map((def, i) => (
							<div key={i} className={styles.translation}>
								<b>{def.pos}</b>: {def.tr}
							</div>
						))}
					</div>
				)}
				{translations && (
					<div className={styles.translations}>
						{translations.map((tr, i) => (
							<div key={i} className={styles.translation}>
								{tr.text}
							</div>
						))}
					</div>
				)}
			</div>
			<button onClick={goToWord}>Go to word</button>
			<div className={styles.wordActions}>
				<button
					className={cn(styles.actionButton, styles.translateButton)}
					onClick={translate}
				>
					<TranslateIcon />
				</button>
				{isMe && (
					<>
						{!isLearned && (
							<button
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
