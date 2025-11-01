import cn from 'classnames'
import type { FC } from 'react'
import { Fragment } from 'react'

import type { SubtitleSource } from '@/frontend-types'
import type { PureSubtitle, Word } from '@/types'

import styles from './SubtitleWords.module.scss'

interface SubtitleWordProps {
	myId: string
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
	myId,
	subtitleSource
}) => {
	const words = subtitle.text.split(' ')

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
				const wordId = `${movieId}_${fileId}_${page}_${subtitle.timecode.replace(' --> ', '_')}_${i}`
				const punctuationMatch = wordText.match(PUNCTUATION)
				const before = punctuationMatch ? punctuationMatch[1] : undefined
				const after = punctuationMatch ? punctuationMatch[3] : undefined
				const isSelected = Boolean(selectedWords.find((w) => w.id === wordId))

				const word: Word = {
					id: wordId,
					isFavorite: false,
					isJoined: false,
					isLearned: false,
					text: punctuationMatch ? punctuationMatch[2] : wordText,
					userId: myId,
					userSources: [
						{
							fileId,
							id: wordId,
							movieId,
							movieName,
							page,
							posterUrl,
							sentence,
							subtitleTimecode,
							subtitleWordIndex: i
						}
					]
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
