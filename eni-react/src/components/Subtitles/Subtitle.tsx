import cn from 'classnames'
import { useEffect, useRef, useState, type FC } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { SavedWords, Skeleton, SubtitleWords, WordsPanel } from '@/components'
import { ErrorIcon, TranslateIcon } from '@/icons'
import {
	addSavedWord,
	removeSavedWord,
	selectSavedWordsByTimecode
} from '@/store'
import { useLazyTranslateQuery } from '@/store/api'
import type { PureSubtitle, Word } from '@/types'
import { getErrorMessage } from '@/utils'

import type { SubtitleSource } from '../../types'

import styles from './Subtitles.module.scss'

interface SubtitleProps {
	subtitle: PureSubtitle
	subtitleSource: SubtitleSource
}

export const Subtitle: FC<SubtitleProps> = ({ subtitle, subtitleSource }) => {
	const dispatch = useAppDispatch()
	const savedWords = useAppSelector((state) =>
		selectSavedWordsByTimecode(state, subtitle.timecode, subtitleSource.movieId)
	)
	const savedJoinedWords = useAppSelector((state) =>
		selectSavedWordsByTimecode(
			state,
			subtitle.timecode,
			subtitleSource.movieId,
			true
		)
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
			dispatch(addSavedWord(selectedWord))
			toast.success(`Слово "${selectedWord.text}" сохранено`)
		})
	}

	const saveJoinedWords = () => {
		if (wordsToJoin.length < 2) return

		const joinedWordText = wordsToJoin.map((word) => word.text).join(' ')

		dispatch(
			addSavedWord({
				id: `joined_${wordsToJoin.map((word) => word.id).join('_')}`,
				isFavorite: false,
				isJoined: true,
				isLearned: false,
				mySources: wordsToJoin.flatMap((w) => w.mySources),
				text: joinedWordText
			})
		)

		toast.success(`Слово "${joinedWordText}" сохранено`)
		setWordsToJoin([])
	}

	const removeJoinedWord = (word: Word) => {
		dispatch(removeSavedWord({ sources: word.mySources, wordText: word.text }))
		toast(`Слово "${word.text}" удалено`, {
			icon: '🗑️'
		})
	}

	const removeWord = (word: Word) => {
		dispatch(removeSavedWord({ sources: word.mySources, wordText: word.text }))
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
					selectedWords={selectedWords}
					subtitle={subtitle}
					subtitleSource={subtitleSource}
					toggleSelectedWord={toggleSelectedWord}
				/>

				{savedJoinedWords.length > 0 && (
					<SavedWords removeWord={removeJoinedWord} words={savedJoinedWords} />
				)}

				{savedWords.length > 0 && (
					<SavedWords removeWord={removeWord} words={savedWords} />
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
