import type { FC } from 'react'

import type { Subtitle as ISubtitle } from '@/types'

import styles from './Subtitle.module.scss'
import { Word } from './Word/Word'

interface SubtitleProps {
	subtitle: ISubtitle
}

export const Subtitle: FC<SubtitleProps> = ({ subtitle }) => (
	<li className={styles.subtitleBox}>
		<span className={styles.timecode}>{subtitle.timecode}</span>
		<ul className={styles.words}>
			{subtitle.text.split(' ').map((word, i) => (
				<Word key={subtitle.timecode + i} text={word} />
			))}
		</ul>
	</li>
)
