import cn from 'classnames'
import { useEffect, useMemo, useRef, useState, type FC } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { SubtitleWord } from '@/components'
import { CancelIcon, TranslateIcon } from '@/icons'
import {
	addLearningWord,
	addWordTranslation,
	removeLearningWord,
	selectLearningJoinedWordsByTimecode,
	selectLearningWordsByTimecode
} from '@/store'
import { useLazyTranslateQuery } from '@/store/api'
import type { PureSubtitle, Word } from '@/types'

import styles from './Subtitles.module.scss'
import { JoinWordsPanel } from './WordsPanel'

interface SubtitleProps {
	subtitle: PureSubtitle
	page: number
	fileId: number
	movieId: number
}

const PUNCTUATION = /([^\w]*)(\w+'?\w+)([^\w]*)/

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
	const words = useMemo(() => subtitle.text.split(' '), [subtitle.text])
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
				<ul className={styles.subtitleWordList}>
					{words.map((wordText, i) => {
						const id = `${i}#${subtitle.timecode}#${fileId}`

						const punctuationMatch = wordText.match(PUNCTUATION)

						const word: Word = {
							id,
							text: punctuationMatch ? punctuationMatch[2] : wordText,
							from: {
								fileId,
								movieId,
								page,
								subtitleWordIndex: i,
								subtitleTimecode: subtitle.timecode
							},
							isLearned: false,
							isFavorite: false,
							isJoined: false
						}

						return (
							<SubtitleWord
								key={id}
								after={punctuationMatch ? punctuationMatch[3] : undefined}
								before={punctuationMatch ? punctuationMatch[1] : undefined}
								isSelected={Boolean(selectedWords.find((w) => w.id === id))}
								toggleSelectedWord={() => toggleSelectedWord(word)}
								word={word}
							/>
						)
					})}
				</ul>

				{subtitleTranslation && <p>{subtitleTranslation}</p>}

				{learningJoinedWords.length > 0 && (
					<ul className={styles.savedWordList}>
						{learningJoinedWords.map((word) => (
							<li key={word.id} className={styles.savedWord}>
								<div className={styles.wordContainer}>
									<span className={styles.savedWordText}>{word.text}</span>
									{word.translation && <span>{word.translation}</span>}
								</div>
								{!word.translation && (
									<button
										aria-label='translate joined word'
										className={styles.translateWordBtn}
										onClick={() => translateWord(word)}
									>
										<TranslateIcon />
									</button>
								)}
								<button
									aria-label='remove joined word'
									className={styles.removeSavedWordBtn}
									onClick={() => removeJoinedWord(word)}
								>
									<CancelIcon />
								</button>
							</li>
						))}
					</ul>
				)}

				{learningWords.length > 0 && (
					<ul className={styles.savedWordList}>
						{learningWords.map((word) => (
							<li key={word.id} className={styles.savedWord}>
								<div className={styles.wordContainer}>
									<span className={styles.savedWordText}>{word.text}</span>
									{word.translation && <span>{word.translation}</span>}
								</div>
								{!word.translation && (
									<button
										aria-label='translate word'
										className={styles.translateWordBtn}
										onClick={() => translateWord(word)}
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
				)}

				{selectedWords.length > 0 && (
					<JoinWordsPanel
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
