import { type FC } from 'react'

import { Word } from '@/components'
import type { Subtitle as ISubtitle } from '@/types'
import { PUNCTUATION } from '@/utils'

import styles from './Subtitle.module.scss'

interface SubtitleProps {
	subtitle: ISubtitle
}

export const Subtitle: FC<SubtitleProps> = ({ subtitle }) => (
	<li className={styles.subtitle}>
		<span className={styles.timecode}>{subtitle.timecode}</span>
		<ul className={styles.words}>
			{subtitle.text.split(' ').map((word, i) => {
				const id = `${subtitle.timecode}#${i}`

				const punctuationMatch = word.match(PUNCTUATION)

				return (
					<Word
						key={id}
						after={punctuationMatch ? punctuationMatch[3] : undefined}
						before={punctuationMatch ? punctuationMatch[1] : undefined}
						id={id}
						subtitleId={subtitle.id}
						text={punctuationMatch ? punctuationMatch[2] : word}
					/>
				)
			})}
		</ul>
	</li>
)
