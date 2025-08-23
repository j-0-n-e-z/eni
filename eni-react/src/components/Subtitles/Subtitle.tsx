import cn from 'classnames'
import { useEffect, useRef, useState, type FC } from 'react'

import { SubtitleWord } from '@/components'
import type { PureSubtitle, Word } from '@/types'
import { PUNCTUATION } from '@/utils'

import styles from './Subtitles.module.scss'
import { WordsCombiner } from './WordsCombiner'

interface SubtitleProps {
	subtitle: PureSubtitle
	page: number
	fileId: number
	movieId: number
	lookupWord?: Word
}

export const Subtitle: FC<SubtitleProps> = ({
	subtitle,
	page,
	fileId,
	movieId,
	lookupWord
}) => {
	const isLookedUpSubtitle =
		subtitle.timecode === lookupWord?.from.subtitleTimecode
	const lookupTarget = useRef<HTMLLIElement>(null)
	const [combinerWords, setCombinerWords] = useState<Word[]>([])

	function addToWordCombiner(word: Word) {
		setCombinerWords((prevWords) => {
			if (prevWords.find((w) => w.id === word.id)) return prevWords
			return [...prevWords, word]
		})
	}

	function removeFromWordCombiner(wordId: string) {
		setCombinerWords((prevWords) => prevWords.filter((w) => w.id !== wordId))
	}

	useEffect(() => {
		if (lookupTarget.current)
			lookupTarget.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			})
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
				{subtitle.text.split(' ').map((wordText, i) => {
					const id = `${i}#${subtitle.timecode}#${fileId}`

					const punctuationMatch = wordText.match(PUNCTUATION)

					const from = {
						fileId,
						movieId,
						page,
						subtitleWordIndex: i,
						subtitleTimecode: subtitle.timecode
					}

					const word = {
						id,
						text: punctuationMatch ? punctuationMatch[2] : wordText,
						from,
						isLearned: false,
						isFavorite: false
					}

					const isSelected = Boolean(combinerWords.find((w) => w.id === id))

					return (
						<SubtitleWord
							key={id}
							addToWordCombiner={() => addToWordCombiner(word)}
							after={punctuationMatch ? punctuationMatch[3] : undefined}
							before={punctuationMatch ? punctuationMatch[1] : undefined}
							isSelected={isSelected}
							removeFromWordCombiner={() => removeFromWordCombiner(id)}
							word={word}
						/>
					)
				})}
			</ul>
			<div>
				<WordsCombiner words={combinerWords} />
			</div>
		</li>
	)
}
