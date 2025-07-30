import { type FC } from 'react'

import { Word } from '@/components'
import type { Subtitle as ISubtitle } from '@/types'
import { PUNCTUATION } from '@/utils'

import styles from './Subtitle.module.scss'

interface SubtitleProps {
	subtitle: ISubtitle
}

export const Subtitle: FC<SubtitleProps> = ({ subtitle }) => (
	<li className={styles.subtitleBox}>
		<span className={styles.timecode}>{subtitle.timecode}</span>
		<ul className={styles.words}>
			{subtitle.text.split(' ').map((word, i) => {
				const id = `${subtitle.timecode}#${i}`

				const punctuationMatch = word.match(PUNCTUATION)

				if (!punctuationMatch) {
					return (
						<Word
							key={id}
							id={id}
							movieId={subtitle.movieId}
							subtitleId={subtitle.id}
							text={word}
						/>
					)
				}

				return (
					<Word
						key={id}
						after={punctuationMatch[3]}
						before={punctuationMatch[1]}
						id={id}
						movieId={subtitle.movieId}
						subtitleId={subtitle.id}
						text={punctuationMatch[2]}
					/>
				)
			})}
		</ul>
	</li>
)
