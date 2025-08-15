import cn from 'classnames'
import type { FC } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import {
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
	const [definitions, setDefinitions] = useState<
		{ pos: string; tr: string }[] | null
	>(null)
	const [triggerTranslate, { data: translateResult }] = useLazyTranslateQuery()
	const [triggerGetDefinition] = useLazyGetDifinitionQuery()
	const [triggerSaveWord] = useSaveWordMutation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const translate = async () => {
		if (!definitions) {
			try {
				const response = await triggerGetDefinition(word.word.text).unwrap()

				const translations = response.def.reduce(
					(acc, def, i) => {
						if (!def.pos) return acc
						acc[i] = { pos: '', tr: '' }
						acc[i].pos = def.pos
						acc[i].tr = def.tr
							.slice(0, 3)
							.map((tr) => tr.text)
							.join(', ')
						return acc
					},
					[] as { pos: string; tr: string }[]
				) as { pos: string; tr: string }[]

				if (!translations.length) {
					toast.error('Не удалось перевести слово')
					return
				}

				translations.sort((a, b) => a.pos.localeCompare(b.pos))
				setDefinitions(translations)
			} catch (error) {
				console.error(error)
				if ('status' in error) {
					if (error.status === 401) {
						toast.error('Для перевода слов нужно авторизоваться')
					} else if (error.status === 404) {
						triggerTranslate(word.word.text)
					}
				}
			}
		}
	}

	const saveWord = async () => {
		try {
			if (!myId) return

			await triggerSaveWord({
				text: word.word.text,
				userId: myId,
				...word
			}).unwrap()

			dispatch(removeWord(word.word.id))
		} catch (e) {
			console.log(e)
		}
	}

	const deleteWord = () => {
		dispatch(removeWord(word.word.id))
	}

	const goToWord = () => {
		navigate(`/movie/${word.movieId}`)
	}

	return (
		<li className={styles.wordItem}>
			<div className={styles.wordInfo}>
				<div className={styles.word}>{word.word.text}</div>
				{definitions && (
					<div className={styles.translations}>
						{definitions.map((def, i) => (
							<div key={i} className={styles.translation}>
								<b>{def.pos}</b>: {def.tr}
							</div>
						))}
					</div>
				)}
				{translateResult && (
					<div className={styles.translations}>
						{translateResult.translations.map((tr, i) => (
							<div key={i} className={styles.translation}>
								{tr.text}
							</div>
						))}
					</div>
				)}
			</div>
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
							<button onClick={saveWord}>
								<BrainIcon />
							</button>
						)}
						<button
							aria-label='delete word'
							className={cn(styles.actionButton, styles.deleteButton)}
							onClick={deleteWord}
						>
							<TrashIcon />
						</button>
					</>
				)}
			</div>
		</li>
	)
}
