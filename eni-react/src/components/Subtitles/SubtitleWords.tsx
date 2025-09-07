import cn from 'classnames'
import type { FC } from 'react'
import { Fragment, useMemo } from 'react'

import type { PureSubtitle, Word } from '@/types'

import styles from './Subtitles.module.scss'

interface SubtitleWordProps {
	toggleSelectedWord: (word: Word) => void
	fileId: number
	movieId: number
	page: number
	subtitle: PureSubtitle
	selectedWords: Word[]
}

const PUNCTUATION = /([^\w]*)(\w+'?\w+)([^\w]*)/

export const SubtitleWords: FC<SubtitleWordProps> = ({
	subtitle,
	toggleSelectedWord,
	fileId,
	page,
	selectedWords,
	movieId
}) => {
	const words = useMemo(() => subtitle.text.split(' '), [subtitle.text])

	return (
		<ul className={styles.subtitleWordList}>
			{words.map((wordText, i) => {
				const id = `${i}#${subtitle.timecode}#${fileId}`
				const punctuationMatch = wordText.match(PUNCTUATION)
				const before = punctuationMatch ? punctuationMatch[1] : undefined
				const after = punctuationMatch ? punctuationMatch[3] : undefined
				const isSelected = Boolean(selectedWords.find((w) => w.id === id))

				const word: Word = {
					from: {
						fileId,
						movieId,
						page,
						subtitleTimecode: subtitle.timecode,
						subtitleWordIndex: i
					},
					id,
					isFavorite: false,
					isJoined: false,
					isLearned: false,
					text: punctuationMatch ? punctuationMatch[2] : wordText
				}

				return (
					<Fragment key={id}>
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
