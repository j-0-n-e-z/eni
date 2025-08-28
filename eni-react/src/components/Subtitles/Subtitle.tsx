import cn from 'classnames'
import { useEffect, useMemo, useRef, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { SubtitleWord } from '@/components'
import {
	addLearningWord,
	removeLearningWord,
	selectLearningWords
} from '@/store'
import type { PureSubtitle, Word } from '@/types'
import { getUniqueWordsByTimecode } from '@/utils/helpers/getUniqueWords'

import { JoinWordsPanel } from './JoinWordsPanel'
import styles from './Subtitles.module.scss'

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
	const { learningWords } = useAppSelector(selectLearningWords)
	const [searchParams] = useSearchParams()
	const lookupTarget = useRef<HTMLLIElement>(null)
	const [isJoiningWords, setIsJoiningWords] = useState(false)
	const [joinedWords, setJoinedWords] = useState<Word[] | null>(null)

	const timecode = searchParams.get('timecode')
	const isLookedUpSubtitle = subtitle.timecode === timecode
	const words = useMemo(() => subtitle.text.split(' '), [subtitle.text])

	const [selectedWords, setSelectedWords] = useState<Word[]>(() =>
		getUniqueWordsByTimecode(learningWords, subtitle.timecode)
	)

	const selectWord = (word: Word) => {
		dispatch(addLearningWord(word))
		setSelectedWords((prevWords) => {
			if (prevWords.find((w) => w.id === word.id)) return prevWords
			return [...prevWords, word]
		})
	}

	const unselectWord = (wordId: string) => {
		dispatch(removeLearningWord(wordId))
		setSelectedWords((prevWords) => prevWords.filter((w) => w.id !== wordId))
	}

	const toggleWordToJoinedWords = (word: Word) => {
		setJoinedWords((prev) => {
			if (!prev) return [word]

			const existingWord = prev.find((w) => w.id === word.id)
			if (existingWord) return prev.filter((w) => w.id !== existingWord.id)

			return [...prev, word]
		})
	}

	const cancelJoiningWords = () => {
		setIsJoiningWords(false)
		setJoinedWords(null)
	}

	const saveJoinedWord = () => {
		if (joinedWords) {
			dispatch(
				addLearningWord({
					id: `joined_${joinedWords.map((w) => w.id).join('_')}`,
					text: joinedWords.map((w) => w.text).join(' '),
					from: joinedWords[0].from,
					words: joinedWords,
					isJoined: true,
					isLearned: false,
					isFavorite: false
				})
			)
			setJoinedWords(null)
			setIsJoiningWords(false)
		}
	}

	useEffect(() => {
		let timer: NodeJS.Timeout

		if (isLookedUpSubtitle && lookupTarget.current) {
			timer = setTimeout(() => {
				lookupTarget.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				})
			}, 200)
		}

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
			<ul className={styles.words}>
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
							selectWord={() => selectWord(word)}
							unselectWord={() => unselectWord(id)}
							word={word}
						/>
					)
				})}
			</ul>

			{!isJoiningWords && selectedWords.length > 1 && (
				<button onClick={() => setIsJoiningWords(true)}>Join</button>
			)}
			{isJoiningWords && (
				<JoinWordsPanel
					joinedWords={joinedWords}
					selectedWords={selectedWords}
					onAddWord={toggleWordToJoinedWords}
					onCancel={cancelJoiningWords}
					onSave={saveJoinedWord}
				/>
			)}
		</li>
	)
}
