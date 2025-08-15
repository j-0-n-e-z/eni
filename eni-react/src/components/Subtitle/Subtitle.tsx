import { type FC } from 'react'

import { SubtitleWord } from '@/components'
import type { PureSubtitle } from '@/types'
import { PUNCTUATION } from '@/utils'

import styles from './Subtitle.module.scss'

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
}) => (
	<li className={styles.subtitle}>
		<span className={styles.timecode}>{subtitle.timecode}</span>
		<ul className={styles.words}>
			{subtitle.text.split(' ').map((word, i) => {
				const id = `${i}#${subtitle.timecode}#${fileId}`

				const punctuationMatch = word.match(PUNCTUATION)

				return (
					<SubtitleWord
						key={id}
						after={punctuationMatch ? punctuationMatch[3] : undefined}
						before={punctuationMatch ? punctuationMatch[1] : undefined}
						fileId={fileId}
						id={id}
						movieId={movieId}
						page={page}
						subtitleIndex={i}
						subtitleTimecode={subtitle.timecode}
						text={punctuationMatch ? punctuationMatch[2] : word}
					/>
				)
			})}
		</ul>
	</li>
)
