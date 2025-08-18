import cn from 'classnames'
import { useEffect, useRef, type FC } from 'react'

import { SubtitleWord } from '@/components'
import type { PureSubtitle, Word } from '@/types'
import { PUNCTUATION } from '@/utils'

import styles from './Subtitle.module.scss'

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
				{subtitle.text.split(' ').map((word, i) => {
					const id = `${i}#${subtitle.timecode}#${fileId}`

					const punctuationMatch = word.match(PUNCTUATION)

					const from = {
						fileId,
						movieId,
						page,
						subtitleWordIndex: i,
						subtitleTimecode: subtitle.timecode
					}

					return (
						<SubtitleWord
							key={id}
							after={punctuationMatch ? punctuationMatch[3] : undefined}
							before={punctuationMatch ? punctuationMatch[1] : undefined}
							from={from}
							id={id}
							text={punctuationMatch ? punctuationMatch[2] : word}
						/>
					)
				})}
			</ul>
		</li>
	)
}
