import cn from 'classnames'
import type { FC } from 'react'
import { Fragment, useMemo } from 'react'

import type { PureSubtitle, Word } from '@/types'

import type { SubtitleSource } from '../../types'

import styles from './Subtitles.module.scss'

interface SubtitleWordProps {
	toggleSelectedWord: (word: Word) => void
	subtitleSource: SubtitleSource
	subtitle: PureSubtitle
	selectedWords: Word[]
}

const PUNCTUATION = /([^\w]*)(\w+'?\w+)([^\w]*)/

export const SubtitleWords: FC<SubtitleWordProps> = ({
	subtitle,
	toggleSelectedWord,
	selectedWords,
	subtitleSource
}) => {
	const words = useMemo(() => subtitle.text.split(' '), [subtitle.text])

	return (
		<ul className={styles.subtitleWordList}>
			{words.map((wordText, i) => {
				const {
					fileId,
					movieId,
					movieName,
					page,
					posterUrl,
					subtitleTimecode,
					sentence
				} = subtitleSource
				const wordId = `${i}#${subtitle.timecode}#${fileId}`
				const punctuationMatch = wordText.match(PUNCTUATION)
				const before = punctuationMatch ? punctuationMatch[1] : undefined
				const after = punctuationMatch ? punctuationMatch[3] : undefined
				const isSelected = Boolean(selectedWords.find((w) => w.id === wordId))

				const word: Word = {
					id: wordId,
					isFavorite: false,
					isJoined: false,
					isLearned: false,
					mySources: [
						{
							fileId,
							id: `${movieId}_${fileId}_${page}_${subtitle.timecode.replace(' --> ', '_')}_${i}`,
							movieId,
							movieName,
							page,
							posterUrl,
							sentence,
							subtitleTimecode,
							subtitleWordIndex: i
						}
					],
					text: punctuationMatch ? punctuationMatch[2] : wordText
				}

				return (
					<Fragment key={wordId}>
						{before && <li className={styles.punctuation}>{before}</li>}
						<li>
							<button
								className={cn(styles.word, {
									[styles.selected]: isSelected
								})}
								onClick={() => toggleSelectedWord(word)}
							>
								<span className={styles.text}>{word.text}</span>
							</button>
						</li>
						{after && <li className={styles.punctuation}>{after}</li>}
					</Fragment>
				)
			})}
		</ul>
	)
}
