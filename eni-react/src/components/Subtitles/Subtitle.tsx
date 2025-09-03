import cn from 'classnames'
import { useEffect, useRef, useState, type FC } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { TranslateIcon } from '@/icons'
import {
	addLearningWord,
	addWordTranslation,
	removeLearningWord,
	selectLearningJoinedWordsByTimecode,
	selectLearningWordsByTimecode
} from '@/store'
import { useLazyTranslateQuery } from '@/store/api'
import type { PureSubtitle, Word } from '@/types'

import { SavedWords } from './SavedWords'
import { SubtitleWords } from './SubtitleWords'
import styles from './Subtitles.module.scss'
import { WordsPanel } from './WordsPanel'

interface SubtitleProps {
	subtitle: PureSubtitle
	page: number
	fileId: number
	movieId: number
}

export const Subtitle: FC<SubtitleProps> = ({
	subtitle,
	page,
	fileId,
	movieId
}) => {
	const dispatch = useAppDispatch()
	const learningWords = useAppSelector((state) =>
		selectLearningWordsByTimecode(state, subtitle.timecode)
	)
	const learningJoinedWords = useAppSelector((state) =>
		selectLearningJoinedWordsByTimecode(state, subtitle.timecode)
	)
	const [searchParams] = useSearchParams()
	const lookupTarget = useRef<HTMLLIElement>(null)
	const [wordsToJoin, setWordsToJoin] = useState<Word[]>([])
	const [triggerTranslate, { error, isLoading }] = useLazyTranslateQuery()
	const [selectedWords, setSelectedWords] = useState<Word[]>([])
	const [subtitleTranslation, setSubtitleTranslation] = useState('')

	const timecode = searchParams.get('timecode')
	const isLookedUpSubtitle = subtitle.timecode === timecode

	const hasWordsToSave =
		selectedWords.length > 0 || Boolean(wordsToJoin && wordsToJoin.length > 1)

	const toggleSelectedWord = (word: Word) => {
		setSelectedWords((prev) => {
			if (prev.find((w) => w.id === word.id))
				return prev.filter((w) => w.id !== word.id)
			return [...prev, word]
		})
	}

	const toggleWordToJoin = (word: Word) => {
		setWordsToJoin((prev) => {
			if (prev.find((w) => w.id === word.id))
				return prev.filter((w) => w.id !== word.id)
			return [...prev, word]
		})
	}

	const saveSingleWords = () => {
		selectedWords.forEach((selectedWord) => {
			if (!learningWords.find((w) => w.id === selectedWord.id)) {
				dispatch(addLearningWord(selectedWord))
				toast.success(`Слово "${selectedWord.text}" сохранено`)
			} else {
				toast(`Слово "${selectedWord.text}" уже добавлено`, { icon: '👀' })
			}
		})
	}

	const saveJoinedWords = () => {
		if (wordsToJoin.length < 2) return

		const joinedWordText = wordsToJoin.map((word) => word.text).join(' ')
		const existingJoinedWord = learningJoinedWords.find(
			(word) => word.text === joinedWordText
		)

		if (existingJoinedWord) {
			toast(`Слово "${joinedWordText}" уже добавлено`, { icon: '👀' })
			return
		}

		dispatch(
			addLearningWord({
				id: `joined_${wordsToJoin.map((word) => word.id).join('_')}`,
				text: joinedWordText,
				from: wordsToJoin[0].from,
				words: wordsToJoin,
				isJoined: true,
				isLearned: false,
				isFavorite: false
			})
		)

		toast.success(`Слово "${joinedWordText}" сохранено`)
		setWordsToJoin([])
	}

	const removeJoinedWord = (word: Word) => {
		dispatch(removeLearningWord(word.id))
		toast(`Слово "${word.text}" удалено`, {
			icon: '🗑️'
		})
	}

	const removeWord = (word: Word) => {
		dispatch(removeLearningWord(word.id))
		toast(`Слово "${word.text}" удалено`, {
			icon: '🗑️'
		})
	}

	const translateSubtitle = async (subtitleText: string) => {
		try {
			const subtitleTranslation = await triggerTranslate(subtitleText).unwrap()
			setSubtitleTranslation(subtitleTranslation[0].text)
		} catch (e) {
			toast.error('Произошла ошибка при переводе субтитра', {
				id: 'translateSubtitleError'
			})
		}
	}

	const translateWord = async (word: Word) => {
		try {
			const wordTranslation = await triggerTranslate(word.text).unwrap()
			dispatch(
				addWordTranslation({
					id: word.id,
					translation: wordTranslation[0].text
				})
			)
		} catch (e) {
			toast.error('Произошла ошибка при переводе слова', {
				id: 'translateWordError'
			})
		}
	}

	useEffect(() => {
		if (!isLookedUpSubtitle || !lookupTarget.current) return

		const timer = setTimeout(() => {
			lookupTarget.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			})
		}, 200)

		return () => clearTimeout(timer)
	}, [])

	return (
		<li
			ref={isLookedUpSubtitle ? lookupTarget : undefined}
			className={cn(styles.subtitle, {
				[styles.highlighted]: isLookedUpSubtitle
			})}
		>
			<span className={styles.timecode}>{subtitle.timecode}</span>

			<div className={styles.subtitleWordsContainer}>
				<SubtitleWords
					fileId={fileId}
					movieId={movieId}
					page={page}
					selectedWords={selectedWords}
					subtitle={subtitle}
					toggleSelectedWord={toggleSelectedWord}
				/>

				{subtitleTranslation && <p>{subtitleTranslation}</p>}

				{learningJoinedWords.length > 0 && (
					<SavedWords
						removeWord={removeJoinedWord}
						translateWord={translateWord}
						words={learningJoinedWords}
					/>
				)}

				{learningWords.length > 0 && (
					<SavedWords
						removeWord={removeWord}
						translateWord={translateWord}
						words={learningWords}
					/>
				)}

				{selectedWords.length > 0 && (
					<WordsPanel
						hasWordsToSave={hasWordsToSave}
						saveJoinedWords={saveJoinedWords}
						saveSingleWords={saveSingleWords}
						selectedWords={selectedWords}
						toggleWordToJoin={toggleWordToJoin}
						wordsToJoin={wordsToJoin}
					/>
				)}
			</div>

			<button
				aria-label='translate'
				className={styles.translateBtn}
				onClick={() => translateSubtitle(subtitle.text)}
			>
				<TranslateIcon />
			</button>
		</li>
	)
}
