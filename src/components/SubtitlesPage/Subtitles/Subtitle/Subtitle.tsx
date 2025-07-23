import { type FC } from 'react'

import { Word } from '@/components'
import type { Subtitle as ISubtitle } from '@/types'
import { BEFORE_TEXT_AFTER } from '@/utils'

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

				const match = word.match(BEFORE_TEXT_AFTER)

				if (!match) {
					return <Word key={id} id={id} subtitleId={subtitle.id} text={word} />
				}

				return (
					<Word
						key={id}
						after={match[3]}
						before={match[1]}
						id={id}
						subtitleId={subtitle.id}
						text={match[2]}
					/>
				)
			})}
		</ul>
	</li>
)
