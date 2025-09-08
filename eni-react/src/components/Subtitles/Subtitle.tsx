import cn from 'classnames'
import { useEffect, useRef, useState, type FC } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { SavedWords, Skeleton, SubtitleWords, WordsPanel } from '@/components'
import { ErrorIcon, TranslateIcon } from '@/icons'
import {
	addLearningWord,
	removeLearningWord,
	selectLearningJoinedWordsByTimecode,
	selectLearningWordsByTimecode
} from '@/store'
import { useLazyTranslateQuery } from '@/store/api'
import type { PureSubtitle, Word } from '@/types'
import { getErrorMessage } from '@/utils'

import styles from './Subtitles.module.scss'

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
	const [
		triggerSubtitleTranslate,
		{
			data: subtitleTranslation,
			error: subtitleTranslationError,
			isFetching: isSubtitleTranslationFetching
		}
	] = useLazyTranslateQuery()

	const [selectedWords, setSelectedWords] = useState<Word[]>([])
	const [wordsToJoin, setWordsToJoin] = useState<Word[]>([])

	const searchTimecode = searchParams.get('timecode')
	const isLookedUpSubtitle = subtitle.timecode === searchTimecode

	const hasWordsToSave = selectedWords.length > 0 || wordsToJoin.length > 1

	const toggleSelectedWord = (word: Word) => {
		setSelectedWords((prev) => {
			if (prev.find((w) => w.id === word.id))
				return prev.filter((w) => w.id !== word.id)
			return [...prev, word]
		})
	}

	const toggleWordToJoin = (word: Word) => {
		if (selectedWords.length < 2) return

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
				from: wordsToJoin[0].from,
				id: `joined_${wordsToJoin.map((word) => word.id).join('_')}`,
				isFavorite: false,
				isJoined: true,
				isLearned: false,
				text: joinedWordText,
				words: wordsToJoin
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
			await triggerSubtitleTranslate(subtitleText).unwrap()
		} catch (e) {
			toast.error('Произошла ошибка при переводе субтитра', {
				id: 'translateSubtitleError'
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

	const renderSubtitleTranslation = () => {
		if (isSubtitleTranslationFetching) return <Skeleton />

		if (subtitleTranslationError)
			return (
				<p className={cn(styles.subtitleTranslation, styles.error)}>
					<ErrorIcon />
					{getErrorMessage(subtitleTranslationError)}
				</p>
			)

		if (subtitleTranslation)
			return (
				<p className={styles.subtitleTranslation}>
					{subtitleTranslation[0].text}
				</p>
			)

		return null
	}

	return (
		<li
			ref={isLookedUpSubtitle ? lookupTarget : undefined}
			className={cn(styles.subtitle, {
				[styles.highlighted]: isLookedUpSubtitle
			})}
		>
			<span className={styles.timecode}>{subtitle.timecode}</span>

			<div className={styles.subtitleWordsContainer}>
				{renderSubtitleTranslation()}

				<SubtitleWords
					fileId={fileId}
					movieId={movieId}
					page={page}
					selectedWords={selectedWords}
					subtitle={subtitle}
					toggleSelectedWord={toggleSelectedWord}
				/>

				{learningJoinedWords.length > 0 && (
					<SavedWords
						removeWord={removeJoinedWord}
						words={learningJoinedWords}
					/>
				)}

				{learningWords.length > 0 && (
					<SavedWords removeWord={removeWord} words={learningWords} />
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
				aria-label='translate subtitle'
				className={styles.translateBtn}
				onClick={() => translateSubtitle(subtitle.text)}
			>
				<TranslateIcon />
			</button>
		</li>
	)
}
