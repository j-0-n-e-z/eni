import cn from 'classnames'
import type { FC } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLazyTranslateQuery, useSaveWordMutation } from '@/api'
import { useAppDispatch } from '@/app/index'
import { BrainIcon, TranslateIcon, TrashIcon } from '@/icons'
import { removeWord } from '@/store'
import type { Word } from '@/types'

import styles from './MyWord.module.scss'

interface MyWordProps {
	word: Word
	isMe: boolean
	myId: string
}

export const MyWord: FC<MyWordProps> = ({ word, isMe, myId }) => {
	const [translations, setTranslations] = useState<
		{ pos: string; tr: string }[] | null
	>(null)
	const [triggerTranslate] = useLazyTranslateQuery()
	const [triggerSaveWord] = useSaveWordMutation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const translate = async () => {
		if (!translations) {
			const response = await triggerTranslate(word.text).unwrap()
			console.log(response)
			const translations = response.def
				.reduce(
					(acc, def, i) => {
						acc[i] = { pos: '', tr: '' }
						acc[i].pos = def.pos
						acc[i].tr = def.tr
							.slice(0, 3)
							.map((tr) => tr.text)
							.join(', ')
						return acc
					},
					[] as { pos: string; tr: string }[]
				)
				.sort((a, b) => a.pos.localeCompare(b.pos))
			setTranslations(translations)
		}
	}

	const saveWord = async () => {
		try {
			await triggerSaveWord({
				text: word.text,
				userId: myId,
				fileId: word.from.fileId,
				movieId: word.from.movieId,
				page: word.from.page,
				subtitleIndex: word.from.subtitleIndex,
				subtitleTimecode: word.from.subtitleTimecode
			}).unwrap()
			dispatch(removeWord(word.id))
		} catch (e) {
			console.log(e)
		}
	}

	const deleteWord = () => {
		dispatch(removeWord(word.id))
	}

	const goToWord = () => {
		navigate(`/movie/${word.from.movieId}`)
	}

	return (
		<li className={styles.wordItem}>
			<div className={styles.wordInfo}>
				<div className={styles.word}>{word.text}</div>
				{translations && (
					<div className={styles.translations}>
						{translations.map((translation) => (
							<div className={styles.translation}>
								<b>{translation.pos}</b>: {translation.tr}
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
						<button onClick={saveWord}>
							<BrainIcon />
						</button>
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
