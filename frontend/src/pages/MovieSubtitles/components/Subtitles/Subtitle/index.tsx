import cn from 'classnames'
import { useEffect, useRef, type FC } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

import type { SubtitleSource } from '@/frontend-types'
import {
	useDeleteWordSourceMutation,
	useLazyTranslateQuery,
	useSaveWordMutation
} from '@/store/api'
import type { PureSubtitle, SavedWord, Word } from '@/types'
import { Skeleton } from '@/ui'
import { ErrorIcon, TranslateIcon } from '@/ui/icons'
import { getErrorMessage } from '@/utils'

import { SubtitleSavedWords } from '../SubtitleSavedWords'
import { SubtitleWords } from '../SubtitleWords'
import { WordsPanel } from '../WordsPanel'
import { useWordSelection } from '../hooks'

import styles from './Subtitle.module.scss'

interface SubtitleProps {
	myId: string | undefined
	subtitle: PureSubtitle
	subtitleSource: SubtitleSource
	savedWords: SavedWord[] | undefined
}

export const Subtitle: FC<SubtitleProps> = ({
	myId,
	savedWords,
	subtitle,
	subtitleSource
}) => {
	const savedJoinedWords = savedWords?.filter((w) => w.isJoined)
	const savedSingleWords = savedWords?.filter((w) => !w.isJoined)
	const [searchParams] = useSearchParams()
	const [
		triggerSubtitleTranslate,
		{
			data: subtitleTranslation,
			error: subtitleTranslationError,
			isFetching: isSubtitleTranslationFetching
		}
	] = useLazyTranslateQuery()
	const [saveWord] = useSaveWordMutation()
	const [deleteWordSource] = useDeleteWordSourceMutation()

	const {
		selectedWords,
		toggleSelectedWord,
		toggleWordToJoin,
		clearWordsToJoin,
		wordsToJoin
	} = useWordSelection()

	const isLookedUpSubtitle = subtitle.timecode === searchParams.get('timecode')
	const lookupTarget = useRef<HTMLLIElement>(null)

	const hasWordsToSave = selectedWords.length > 0 || wordsToJoin.length > 1

	const saveSingleWords = () => {
		selectedWords.forEach((selectedWord) => {
			saveWord(selectedWord)
			toast.success(`Слово "${selectedWord.text}" сохранено`)
		})
	}

	const saveJoinedWords = () => {
		if (wordsToJoin.length < 2 || !myId) return

		const joinedWordText = wordsToJoin.map((word) => word.text).join(' ')

		const joinedWord: Word = {
			id: `joined_${wordsToJoin.map((word) => word.id).join('_')}`,
			isFavorite: false,
			isJoined: true,
			isLearned: false,
			text: joinedWordText,
			userId: myId,
			userSources: wordsToJoin[0].userSources
		}

		saveWord(joinedWord)

		toast.success(`Слово "${joinedWordText}" сохранено`)
		clearWordsToJoin()
	}

	const removeWord = (word: SavedWord) => {
		if (!myId) return

		const source = word.userSources.find(
			(s) => s.subtitleTimecode === subtitleSource.subtitleTimecode
		)

		if (source) {
			deleteWordSource({
				userId: myId,
				wordSource: {
					...subtitleSource,
					id: source.id,
					subtitleWordIndex: source.subtitleWordIndex
				},
				wordText: word.text
			})
		}

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
	}, [isLookedUpSubtitle])

	const renderSubtitleTranslation = () => {
		if (isSubtitleTranslationFetching) return <Skeleton width='20rem' />

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

			<div className={styles.subtitleControls}>
				<div className={styles.subtitleWordsContainer}>
					{renderSubtitleTranslation()}

					{myId && (
						<SubtitleWords
							myId={myId}
							selectedWords={selectedWords}
							subtitle={subtitle}
							subtitleSource={subtitleSource}
							toggleSelectedWord={toggleSelectedWord}
						/>
					)}

					{savedJoinedWords && savedJoinedWords.length > 0 && (
						<SubtitleSavedWords
							removeWord={removeWord}
							savedWords={savedJoinedWords}
						/>
					)}

					{savedSingleWords && savedSingleWords.length > 0 && (
						<SubtitleSavedWords
							removeWord={removeWord}
							savedWords={savedSingleWords}
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
					aria-label='translate subtitle'
					className={styles.translateBtn}
					onClick={() => translateSubtitle(subtitle.text)}
				>
					<TranslateIcon />
				</button>
			</div>
		</li>
	)
}
